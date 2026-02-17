from config import GROQ_API_KEY
from services.ChunkingService import ChunkingService
from groq import Groq
from prompts.summary_prompt import SUMMARY_PROMPT
from prompts.merge_prompt import MERGE_PROMPT
from utils.cache import SummaryCache

class SummaryService:
    def __init__(self, model_name: str = "llama-3.1-8b-instant"):
        self.groq_api_key = GROQ_API_KEY
        self.model_name = model_name
        self.model = None 
        self.chunks = []
        self._create_client()

    def _create_client(self):
        self.model = Groq(
            api_key=self.groq_api_key
        )

    def generate_summary(self, text, video_id=None):
        if text is None:
            return "Error: Could not retrieve transcript"
            
        if "transcript from cache" in text:
            extracted_video_id = text.split("video_id=")[1]
            cached = SummaryCache().get(extracted_video_id)
            return cached['summary']

        chunking_service = ChunkingService(text)
        type_of_summary = chunking_service.decide_summary_way()

        

        if type_of_summary == "single_pass":
            summary = self.single_pass_summary(text)
            if video_id:
                cache = SummaryCache()
                cache.set(video_id, text, summary)
        else:
            self.chunks = chunking_service.chunk_text(text)
            partial_summaries = []
            for chunk in self.chunks:
                summary = self.single_pass_summary(chunk["text"])
                partial_summaries.append(summary)
            summary = self.merge_summaries(partial_summaries)
            if video_id:
                cache = SummaryCache()
                cache.set(video_id, text, summary)

        return summary

    def create_chunks(self,texts):
        chunking_service = ChunkingService()
        chunks = chunking_service.chunk_text(texts)
        return chunks

    def single_pass_summary(self, text):
        prompt = SUMMARY_PROMPT.format(transcript=text)
        response = self.model.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7,
            top_p=0.9,
            frequency_penalty=0.5,
            presence_penalty=0.5,
            stop=["\n\n"]
        )
        return response.choices[0].message.content

    def merge_summaries(self, summaries):
        prompt = MERGE_PROMPT.format(summaries=summaries)
        response = self.model.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7,
            top_p=0.9,
            frequency_penalty=0.5,
            presence_penalty=0.5,
            stop=["\n\n"]
        )
        return response.choices[0].message.content

            
        

    