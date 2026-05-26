import React, { useState, useEffect } from 'react';
import { getAISettings, saveAISettings, AI_MODELS } from '../services/aiService';

export default function AISettingsModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('nvidia/nemotron-3-super-120b-a12b:free');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const settings = getAISettings();
      setApiKey(settings.apiKey);
      setModel(settings.model);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('Please enter your OpenRouter API key');
      return;
    }
    saveAISettings(apiKey, model);
    onSave?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: 'var(--card)',
        borderRadius: 12,
        padding: 24,
        maxWidth: 600,
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '1px solid var(--border)'
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>AI Settings</div>

        <div className="field" style={{ marginBottom: 16 }}>
          <label>OpenRouter API Key</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              style={{ flex: 1 }}
            />
            <button className="btn btn-ghost" onClick={() => setShowKey(!showKey)}>
              {showKey ? '🙈' : '👁️'}
            </button>
            <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="btn" style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
              Get key ↗
            </a>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
            Get your free API key from OpenRouter. All models listed are free tier.
          </div>
        </div>

        <div className="field" style={{ marginBottom: 20 }}>
          <label>AI Model <span style={{ fontSize: 11, color: 'var(--muted)' }}>25+ Free Models</span></label>
          <select value={model} onChange={e => setModel(e.target.value)} style={{ width: '100%' }}>
            {AI_MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
