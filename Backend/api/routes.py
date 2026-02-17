from fastapi import APIRouter
from services.SummaryService import SummaryService 
from services.TranscriptsService import TranscriptsService
from pydantic import BaseModel

router = APIRouter()

summaryService = SummaryService()
transcriptsService = TranscriptsService()

# Define request body schema
class SummarizeRequest(BaseModel):
    url: str

@router.post("/summarize")
def summarize_video(request: SummarizeRequest) -> dict:
    try:
        url = request.url
        video_id = transcriptsService.extract_video_id(url)
        transcript = transcriptsService.get_transcript(url)

        if not transcript:
            return {"error": "Could not get transcript"}

        summary = summaryService.generate_summary(transcript, video_id)

        if isinstance(summary, dict):
            summary = summary.get("summary", summary)
        

        return {"summary": summary}

    except Exception as e:
        return {"error": str(e)}
