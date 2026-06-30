from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "API running"}


@app.get("/dashboard")
def dashboard():
    return {
        "servers": 12,
        "docker": 28,
        "kubernetes": 6,
        "jenkins": 14,
        "disk": "72%"
    }
