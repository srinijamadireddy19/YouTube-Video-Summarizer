from services.TranscriptsService import TranscriptsService
from services.ChunkingService import ChunkingService


service = TranscriptsService()
text = service.get_transcript("https://www.youtube.com/watch?v=TV-xsNjbx_g")

chunking_service = ChunkingService(text)

print(chunking_service.decide_summary_way())


from services.SummaryService import SummaryService

service = SummaryService()
summary = service.generate_summary(text)
print(summary)

