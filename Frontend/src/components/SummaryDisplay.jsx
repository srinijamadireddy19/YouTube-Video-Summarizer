import React, { useMemo } from 'react';

const SummaryDisplay = ({ summary, isLoading }) => {
  const parsedSummary = useMemo(() => {
    if (!summary) return null;
    if (typeof summary === 'object') return summary;

    try {
      // Clean up markdown code blocks if present
      const cleanJson = summary.replace(/```json\n?|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse summary:", e);
      // Fallback for plain text summaries
      return { executive_summary: summary };
    }
  }, [summary]);

  return (
    <div
      className={`bg-steel-blue/10 border border-steel-blue/20 rounded-2xl p-8 backdrop-blur-md min-h-[200px] transition-all ${summary ? 'opacity-100' : 'opacity-50'
        }`}
      id="summary-section"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-primary rounded-full"></div>
        <h3 className="text-xl font-bold text-white">Video Essence</h3>
      </div>

      <div className="space-y-6" id="summary-content">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 bg-steel-blue/20 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-steel-blue/20 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-steel-blue/20 rounded w-2/3 animate-pulse"></div>
            <p className="text-papaya-whip/60 italic text-sm mt-4">
              Processing your video...
            </p>
          </div>
        ) : parsedSummary ? (
          <div className="text-papaya-whip space-y-6">
            {parsedSummary.executive_summary && (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{parsedSummary.executive_summary}</p>
              </div>
            )}

            {parsedSummary.key_points && parsedSummary.key_points.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-primary"></span> Key Points
                </h4>
                <ul className="space-y-2">
                  {parsedSummary.key_points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-3 ">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parsedSummary.action_items && parsedSummary.action_items.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-primary"></span> Action Items
                </h4>
                <ul className="space-y-2">
                  {parsedSummary.action_items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parsedSummary.topics && parsedSummary.topics.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {parsedSummary.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-steel-blue/20 text-steel-blue rounded-full text-sm border border-steel-blue/30 hover:bg-steel-blue/30 transition-colors cursor-default"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-4 bg-steel-blue/20 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-steel-blue/20 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-steel-blue/20 rounded w-2/3 animate-pulse"></div>
            <p className="text-papaya-whip/60 italic text-sm mt-4">
              Waiting for your URL input...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;