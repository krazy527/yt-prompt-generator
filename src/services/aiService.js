// OpenRouter AI API Service

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';

export const generateAIContent = async (apiKey, model, prompt) => {
  if (!apiKey || !model) {
    throw new Error('API key and model are required');
  }

  const response = await fetch(OPENROUTER_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://localhost',
      'X-Title': 'Thumbnail Prompt Generator'
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'API Error');
  }

  const raw = data.choices?.[0]?.message?.content || '';
  return raw.replace(/```json|```/g, '').trim();
};

export const getAISettings = () => {
  try {
    const apiKey = localStorage.getItem('tgen_ai_key') || '';
    const model = localStorage.getItem('tgen_ai_model') || 'nvidia/nemotron-3-super-120b-a12b:free';
    return { apiKey, model };
  } catch {
    return { apiKey: '', model: 'nvidia/nemotron-3-super-120b-a12b:free' };
  }
};

export const saveAISettings = (apiKey, model) => {
  localStorage.setItem('tgen_ai_key', apiKey);
  localStorage.setItem('tgen_ai_model', model);
};

export const AI_MODELS = [
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', name: 'NVIDIA: Nemotron 3 Super 120B — 1M ctx ★ Recommended' },
  { id: 'openai/gpt-oss-120b:free', name: 'OpenAI: gpt-oss-120b — 131K ctx' },
  { id: 'deepseek/deepseek-v4-flash:free', name: 'DeepSeek: V4 Flash — 1M ctx' },
  { id: 'poolside/laguna-m.1:free', name: 'Poolside: Laguna M.1 — 131K ctx' },
  { id: 'poolside/laguna-xs.2:free', name: 'Poolside: Laguna XS.2 — 131K ctx' },
  { id: 'z-ai/glm-4.5-air:free', name: 'Z.ai: GLM 4.5 Air — 131K ctx' },
  { id: 'arcee-ai/trinity-large-thinking:free', name: 'Arcee AI: Trinity Large Thinking — 262K ctx' },
  { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: 'NVIDIA: Nemotron Nano 30B A3B — 256K ctx' },
  { id: 'openai/gpt-oss-20b:free', name: 'OpenAI: gpt-oss-20b — 131K ctx' },
  { id: 'baidu/cobuddy:free', name: 'Baidu: CoBuddy — 131K ctx' },
  { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', name: 'NVIDIA: Nemotron Nano Omni 30B — 256K ctx' },
  { id: 'google/gemma-4-31b-it:free', name: 'Google: Gemma 4 31B — 262K ctx' },
  { id: 'minimax/minimax-m2.5:free', name: 'MiniMax: M2.5 — 204K ctx' },
  { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'NVIDIA: Nemotron Nano 9B V2 — 128K ctx' },
  { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'NVIDIA: Nemotron Nano 12B VL — 128K ctx' },
  { id: 'google/gemma-4-26b-a4b-it:free', name: 'Google: Gemma 4 26B A4B — 262K ctx' },
  { id: 'liquid/lfm-2.5-1.2b-thinking:free', name: 'LiquidAI: LFM2.5-1.2B Thinking — 32K ctx' },
  { id: 'qwen/qwen3-next-80b-a3b-instruct:free', name: 'Qwen: Qwen3 Next 80B A3B — 262K ctx' },
  { id: 'liquid/lfm-2.5-1.2b-instruct:free', name: 'LiquidAI: LFM2.5-1.2B Instruct — 32K ctx' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Meta: Llama 3.3 70B — 131K ctx' },
  { id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Venice: Uncensored 24B — 32K ctx' },
  { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Meta: Llama 3.2 3B — 131K ctx (Fastest)' },
  { id: 'nousresearch/hermes-3-llama-3.1-405b:free', name: 'Nous: Hermes 3 405B — 131K ctx' },
  { id: 'qwen/qwen3-coder:free', name: 'Qwen: Qwen3 Coder 480B A35B — 1M ctx' }
];
