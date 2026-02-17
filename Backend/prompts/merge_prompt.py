MERGE_PROMPT = """
You are an expert meeting and lecture analyst.

Combine these summaries into one final structured JSON output:

Return JSON:

{
 "executive_summary": "",
 "key_points": [],
 "action_items": [],
 "topics": []
}

Summaries:
{summaries}
"""