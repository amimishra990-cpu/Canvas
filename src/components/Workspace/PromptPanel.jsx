import React, { useRef, useEffect } from 'react';
import { Wand2 } from 'lucide-react';

const SURPRISE_PROMPTS = [
  "A cybernetic zen garden at midnight, neon blue moss, photorealistic",
  "A minimalist cozy reading nook with warm sunlight, polaroid aesthetic",
  "A bustling alien marketplace on a terracotta planet, vibrant colors",
  "Macro photography of a dewdroplet reflecting a dense futuristic city",
];

export default function PromptPanel({ prompt, setPrompt, handleGenerate, isLoading }) {
  const MAX_CHARS = 500;
  
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && prompt.trim()) {
        handleGenerate();
      }
    }
  };

  const surpriseMe = () => {
    const random = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    setPrompt(random);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <section className="panel">
      <h2 className="panel-title">What would you like to create?</h2>
      
      <div className="textarea-wrapper">
        <textarea
          id="prompt"
          className="prompt-textarea"
          placeholder="Describe your vision in detail..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.substring(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        
        <button className="surprise-btn" onClick={surpriseMe} disabled={isLoading} title="Surprise me">
          <Wand2 size={14} /> Surprise me
        </button>
        
        <div className="char-counter">
          {prompt.length}/{MAX_CHARS}
        </div>
      </div>
      
      <button 
        className="primary-btn"
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Image (Cmd ↵)'}
      </button>

      {!prompt && (
        <div className="suggestions">
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("A serene minimalist living room")}>Minimalist living room</button>
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("A cinematic shot of a rainy neon city")}>Rainy neon city</button>
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("Watercolor painting of a fox in autumn")}>Watercolor fox</button>
        </div>
      )}
    </section>
  );
}
