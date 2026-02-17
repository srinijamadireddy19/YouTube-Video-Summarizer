import os
import json
from datetime import datetime

class SummaryCache:
    def __init__(self):
        self.cache = {}
        self.cache_dir = "cache"

    def __init__(self):
        self.cache = {}
        self.cache_dir = "cache"
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)

    def get_cache_key(self, video_id):
        return f"{video_id}.json"

    def get(self, video_id):
        cache_file = os.path.join(self.cache_dir, self.get_cache_key(video_id))
        if os.path.exists(cache_file):
            with open(cache_file, "r") as f:
                return json.load(f)
        return None

    def set(self, video_id,transcript, summary, metadata = None):
        cache_file = os.path.join(self.cache_dir, self.get_cache_key(video_id))
        cache_data = {
            "video_id":video_id,
            "summary":summary,
            "transcript":transcript,
            "metadata": metadata or {},
            "cached_at": datetime.now().isoformat()
        }
        with open(cache_file, "w") as f:
            json.dump(cache_data, f, indent=4)
        return cache_data

    def clean(self):
        for file in os.listdir(self.cache_dir):
            if file.endswith(".json"):
                os.remove(os.path.join(self.cache_dir, file))
        return True