from fastapi import FastAPI
from api.routes import router
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://6996ad145455c6c34d929a6d--vidbrief.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



