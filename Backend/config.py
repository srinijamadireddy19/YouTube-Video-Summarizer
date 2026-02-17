import os
import dotenv

dotenv.load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

model = "llama-3.1-8b-instant"

CHUNK_SIZE = 2000