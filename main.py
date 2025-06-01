from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],   # Allow all methods including OPTIONS
    allow_headers=["*"],
)


# Replace with your actual API key
genai.configure(api_key="AIzaSyBflqoYeiigqMKWvDctvzarsXLgVtPLTO0")

# Init model
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

# FastAPI setup

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"message": "Ask me anything!"}

@app.post("/generate")
async def generate_text(req: PromptRequest):
    try:
        response = model.generate_content(req.prompt)
        return {"response": response.text.strip().replace("**", "")}

    except Exception as e:
        return {"error": str(e)}

