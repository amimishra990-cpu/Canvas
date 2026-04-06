export default function ImageGenerator({ prompt, setPrompt, handleGenerate, isLoading }) {
  return (
    <section className="generator-section">
      <div className="input-container">
        <label htmlFor="prompt" className="input-label">Describe your vision</label>
        <textarea
          id="prompt"
          className="prompt-textarea"
          placeholder="A serene minimalist living room with natural light..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button 
        className="generate-button"
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
    </section>
  );
}
