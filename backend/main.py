from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import base64
import io

##importing sample model
import numpy as np
import torch
from PIL import Image
from torchvision import transforms
from torchvision.models import ResNet18_Weights, resnet18

##importing heatmap
from explainability.gradcam import generate_heatmap
from explainability.overlay import overlay_heatmap


## Need to get the model weights to use it here. Hopefully soon
## Importing sample model (assesses dogs)
## PLACEHOLDER MODEL — stand-in until the real trained weights exist.
## Swap this whole block out once Role A hands off a checkpoint: load their
## model, their class labels, and point TARGET_LAYERS at their last conv
## layer. Everything below this block (the /predict logic) should not need
## to change when that swap happens.
WEIGHTS = ResNet18_Weights.DEFAULT
model = resnet18(weights=WEIGHTS)
model.eval()

CATEGORIES = WEIGHTS.meta["categories"]      # replace with real class labels
TARGET_LAYERS = [model.layer4[-1]]           # confirm against real model's architecture

PREPROCESS = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
## B end
app = FastAPI()

## Allows react localhost:5173 to send requests to FastAPI localhost 8000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Check connection
@app.get("/")
def home():
    return {"message": "HemaVision backend is running!"}
## visit localhost:8000 t0 see message to backend

def image_to_base64_png(img_array: np.ndarray) -> str:
    """Convert a uint8 RGB numpy array into a base64 PNG data URL the browser can render directly."""
    pil_img = Image.fromarray(img_array)
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    encoded = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{encoded}"

## Throw an image into the website

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Check the uploaded file type
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG or PNG image."
        )

    # Read the uploaded image
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = PREPROCESS(img).unsqueeze(0)
    rgb_img = np.array(img.resize((224, 224))) / 255.0

    # Run the model
    with torch.no_grad():
        output = model(input_tensor)
    probs = torch.nn.functional.softmax(output, dim=1)[0]

    # Top-5 classes, since CATEGORIES has 1000 entries right now (ImageNet
    # placeholder) — once real class labels are in, this can just be all of them
    top5_prob, top5_idx = torch.topk(probs, 5)
    pred_class = int(top5_idx[0].item())

    probabilities = {
        CATEGORIES[int(idx)]: round(float(p), 4)
        for p, idx in zip(top5_prob, top5_idx)
    }

    # Generate the Grad-CAM heatmap for the predicted class
    grayscale_cam = generate_heatmap(model, input_tensor, TARGET_LAYERS, target_class=pred_class)
    heatmap_overlay = overlay_heatmap(rgb_img, grayscale_cam)


    # Temporary mock results
    return {
        #"prediction": "Neutrophil",
        #"probabilities": {
        #    "Neutrophil": 0.92,
        #    "Eosinophil": 0.04,
        #    "Monocyte": 0.02,
        #    "Lymphocyte": 0.02
        #},
        #"heatmap": None,
        #"model_version": "mock-v1"
        "prediction": CATEGORIES[pred_class],
        "probabilities": probabilities,
        "heatmap": image_to_base64_png(heatmap_overlay),
        "model_version": "placeholder-resnet18-imagenet"
    }


    ## check image tyoe we allow jpg and png only