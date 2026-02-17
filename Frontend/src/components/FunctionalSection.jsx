import React, { useState } from 'react';
import CharacterDisplay from './CharacterDisplay';
import VideoInputForm from './VideoInputForm';
import SummaryDisplay from './SummaryDisplay';
import { summarizeVideo, isValidYouTubeUrl } from '../services/api';

const FunctionalSection = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (videoUrl) => {
    // Validate YouTube URL
    if (!isValidYouTubeUrl(videoUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    setSummary('');
    setError('');

    try {
      // Make API call using the service
      const data = await summarizeVideo(videoUrl);
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError(error.message || 'Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
      <CharacterDisplay />
      
      <div className="lg:w-1/2 w-full space-y-8 z-20">
        <VideoInputForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        <SummaryDisplay summary={summary} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default FunctionalSection;