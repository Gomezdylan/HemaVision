from fastapi import APIRouter,FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routers import predict, runs
from backend.app.database.connection import initialize_database


app = FastAPI()
app.include_router(predict.router, prefix="/predict", tags=["predict"])
app.include_router(runs.router, prefix="/runs", tags=["runs"])

initialize_database()

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