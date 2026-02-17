from youtube_transcript_api import YouTubeTranscriptApi
import re
from utils.cache import SummaryCache

class TranscriptsService:
    def __init__(self):
        pass
    
    def extract_video_id(self, url):
        try:
            regex = r"(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})"
            match = re.search(regex, url)
            if match:
                return match.group(1)
            else:
                raise ValueError("Could not extract video ID")
        except Exception as e:
            print(e)
            return None

    def get_transcript(self, video_url):
        try:
            video_id = self.extract_video_id(video_url)
            if not video_id:
                return None

            cached = SummaryCache().get(video_id)
            if cached:
                return cached['transcript']

            api = YouTubeTranscriptApi()
            transcript_list = api.fetch(video_id)

            transcript = " ".join([segment.text for segment in transcript_list])

            if transcript == "":
                print("No transcript available for the video")

            return transcript

        except Exception as e:
            print(f"Error getting transcript: {e}")
            return None
