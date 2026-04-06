export default function PreviewArea({ imageUrl, isLoading, loadingMessage, error }) {
  return (
    <section className="preview-section">
      <div className="preview-card">
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{loadingMessage || 'Crafting your image...'}</p>
          </div>
        )}
        
        {!isLoading && error && (
          <div className="error-state">
            <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && imageUrl && (
          <img src={imageUrl} alt="Generated result" className="preview-image" />
        )}

        {!isLoading && !error && !imageUrl && (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Your creation will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
