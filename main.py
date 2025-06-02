from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

# Request model
class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"message": "Ask me anything!"}

@app.post("/generate")
async def generate_text(req: PromptRequest):
    try:
        response = model.generate_content(req.prompt)

        # Access Gemini response content properly
        text = (
            response.text.strip().replace("**", "")
            if hasattr(response, "text")
            else response.candidates[0].content.parts[0].text.strip()
        )

        return {"response": text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
