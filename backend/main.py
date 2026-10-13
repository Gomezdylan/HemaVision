from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware


## Need to get the model weights to use it here. Hopefully soon
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

    # Temporary mock results
    return {
        "prediction": "Neutrophil",
        "probabilities": {
            "Neutrophil": 0.92,
            "Eosinophil": 0.04,
            "Monocyte": 0.02,
            "Lymphocyte": 0.02
        },
        "heatmap": None,
        "model_version": "mock-v1"
    }


    ## check image tyoe we allow jpg and png only