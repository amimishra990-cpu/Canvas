import { useState, useRef } from 'react'
import Header from './components/Header'
import ImageGenerator from './components/ImageGenerator'
import PreviewArea from './components/PreviewArea'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [error, setError] = useState(null)
  const loadingTimerRef = useRef(null)

  const generateImage = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)
    setLoadingMessage('Initializing request...')

    // If Hugging Face is waking up a cold model, it can take a long time.
    // Let's inform the user so they don't think it's broken.
    loadingTimerRef.current = setTimeout(() => {
      setLoadingMessage('Model is warming up. This can take 30-60 seconds on the free tier...')
    }, 8000)

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_HF_API_TOKEN}`
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      )

      if (!response.ok) {
        let errorMsg = "Failed to generate image. Please check your API token or try again."
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch (e) {
            // Ignore parsing error, stick to default message
        }
        throw new Error(errorMsg)
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unexpected JSON response instead of image");
      }

      setLoadingMessage('Finalizing image...')
      const blob = await response.blob()
      
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }

      const url = URL.createObjectURL(blob)
      setImageUrl(url)
    } catch (err) {
      console.error(err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      clearTimeout(loadingTimerRef.current)
      setIsLoading(false)
      setLoadingMessage('')
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ImageGenerator 
          prompt={prompt} 
          setPrompt={setPrompt} 
          handleGenerate={generateImage} 
          isLoading={isLoading} 
        />
        <PreviewArea 
          imageUrl={imageUrl} 
          isLoading={isLoading} 
          loadingMessage={loadingMessage}
          error={error} 
        />
      </main>
      <footer className="footer">
        <p>Powered by Stable Diffusion XL</p>
      </footer>
    </div>
  )
}

export default App

