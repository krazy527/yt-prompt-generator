import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { generateAIContent, getAISettings } from '../services/aiService';

export function AIGenerateButton({ 
  prompt, 
  onGenerate, 
  label = 'Generate with AI',
  loading: externalLoading = false,
  showToast
}) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const settings = getAISettings();
    if (!settings.apiKey) {
      showToast?.('❌ Configure AI settings first (check sidebar settings)');
      return;
    }

    try {
      setLoading(true);
      const result = await generateAIContent(settings.apiKey, settings.model, prompt);
      onGenerate?.(result);
      showToast?.('✅ AI Generated Successfully!');
    } catch (error) {
      showToast?.(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleGenerate}
      disabled={externalLoading || loading}
      style={{ opacity: externalLoading || loading ? 0.6 : 1 }}
    >
      <Sparkles size={16} />
      {externalLoading || loading ? 'Generating...' : label}
    </button>
  );
}

export function useAIGeneration() {
  const [isLoading, setIsLoading] = useState(false);

  const generate = async (prompt) => {
    const settings = getAISettings();
    if (!settings.apiKey) {
      throw new Error('AI settings not configured');
    }

    setIsLoading(true);
    try {
      const result = await generateAIContent(settings.apiKey, settings.model, prompt);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading };
}
