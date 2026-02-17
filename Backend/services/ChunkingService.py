import tiktoken
from langchain_text_splitters import RecursiveCharacterTextSplitter

class ChunkingService:
    def __init__(self,text, chunk_size=2000):
        self.chunk_size = chunk_size
        self.chunks = []
        self.text = text
        self.tokens_count = 0

    def _tokens_count(self):
        if not self.text:
            self.tokens_count = 0
            return 0
        encoding = tiktoken.get_encoding("cl100k_base")
        self.tokens_count = len(encoding.encode(self.text))
        return self.tokens_count

    def decide_summary_way(self):
        self._tokens_count()
        if self.tokens_count < 15000:
            return "single_pass"
        else:
            return "chunk_pass"

    def chunk_text(self, text):
        text_splitter = RecursiveCharacterTextSplitter(
            separators=["\n\n", "\n", ".", " "],
            chunk_size=self.chunk_size,
            chunk_overlap=200,
            length_function=self._tokens_count
        )

        chunks = text_splitter.split_text(text)

        for index, chunk_text in enumerate(chunks):
            start = text.find(chunk_text)
            end = start + len(chunk_text)
            chunk_data = {
                "chunk_index": index,
                "start_char": start,
                "end_char": end,
                "char_length": len(chunk_text),
                "word_count": len(chunk_text.split()),
                "text": chunk_text
            }

            self.chunks.append(chunk_data)

        return self.chunks

    def display_chunks(self, chunks):
        for chunk in chunks:
            print("Chunk Index:", chunk['chunk_index'])
            print("Start Character:", chunk['start_char'])
            print("End Character:", chunk['end_char'])
            print("Character Length:", chunk['char_length'])
            print("Word Count:", chunk['word_count'])
            print("Text:", chunk['text'])
            print("\n")