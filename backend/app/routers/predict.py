import io
import hashlib

from fastapi import APIRouter,FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.image_upload import validate_image, image_to_base64_png

##importing sample model
import numpy as np
import torch
from PIL import Image
from torchvision import transforms

##importing heatmap
from explainability.gradcam import generate_heatmap
from explainability.overlay import overlay_heatmap

#importing database
from backend.app.database.queries import save_run

# Initialize the prediction router
router = APIRouter()

# Prepare uplaoded images for model
PREPROCESS = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


@router.post("",)
async def predict(request: Request, file: UploadFile = File(...)):

    # Read the uploaded image
    image_bytes = await file.read()

    # Check the uploaded file type
    validate_image(image_bytes, file.content_type)

    # Decode Image into RGB PIL Image
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = PREPROCESS(img).unsqueeze(0)
    rgb_img = np.array(img.resize((224, 224))) / 255.0

    # Access trained model and class names loaded during FastAPI startup
    model=request.app.state.model
    CATEGORIES = request.app.state.class_names

    # Select final convolution block of ResNet18 for Grad-Cam
    TARGET_LAYERS = [model.layer4[-1]]

    # Run the model
    with torch.no_grad():
        output = model(input_tensor)
    probs = torch.nn.functional.softmax(output, dim=1)[0]

    # Select top 5 most likely classes from the model
    # Adjust automatically if the model has fewer than 5 classes
    top_k = min(5, len(CATEGORIES))
    top5_prob, top5_idx = torch.topk(probs, top_k)

    # Get class with the highest prob
    pred_class = int(top5_idx[0].item())

    probabilities = {
        CATEGORIES[int(idx)]: round(float(p), 4)
        for p, idx in zip(top5_prob, top5_idx)
    }

    # Generate the Grad-CAM heatmap for the predicted class
    grayscale_cam = generate_heatmap(model, input_tensor, TARGET_LAYERS, target_class=pred_class)
    heatmap_overlay = overlay_heatmap(rgb_img, grayscale_cam)

    model_version = "hemavision_resnet18_v1_best"
    run_id = save_run(
        image_hash = hashlib.sha256(image_bytes).hexdigest(),
        model_version = model_version,
        prediction = CATEGORIES[pred_class],
        probabilities=probabilities
    )
    
    return {
        "run_id": run_id,
        "prediction": CATEGORIES[pred_class],
        "probabilities": probabilities,
        "heatmap": image_to_base64_png(heatmap_overlay),
        "model_version": model_version
    }