import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar/Sidebar'
import PromptPanel from './components/Workspace/PromptPanel'
import PreviewPanel from './components/Workspace/PreviewPanel'
import Toast from './components/UI/Toast'
import ConfirmModal from './components/UI/ConfirmModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [history, setHistory] = useLocalStorage('canvas-history', [])
  
  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  
  // Generation States
  const [activeId, setActiveId] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [error, setError] = useState(null)
  
  const loadingTimerRef = useRef(null)

  useEffect(() => {
    if (activeId) {
      const item = history.find(i => i.id === activeId)
      if (item) {
        setPrompt(item.prompt)
        setImageUrl(item.imageUrl)
        setError(null)
        setIsLoading(false)
      }
    } else {
      setPrompt('')
      setImageUrl(null)
      setError(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  const handleNewGenerate = () => {
    setActiveId(null)
    if (window.innerWidth <= 768) setIsSidebarOpen(false)
  }

  const handleSelectHistory = (id) => {
    setActiveId(id)
    if (window.innerWidth <= 768) setIsSidebarOpen(false)
  }

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const generateImage = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)
    setLoadingMessage('Initializing request...')
    setActiveId(null)

    loadingTimerRef.current = setTimeout(() => {
      setLoadingMessage('Model is warming up. This can take 30-60 seconds on the free tier...')
    }, 8000)

    try {
      const hfResponse = await fetch(
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

      if (!hfResponse.ok) {
        // If HF is dead due to zero quota (402/429/410/503), immediately trigger the unbreakable Fallback Image Engine.
        console.warn("Hugging Face API Failed (likely quota hit). Triggering offline fallback generation engine.");
        
        const seed = Math.floor(Math.random() * 10000);
        // Picsum photos provides an instant beautiful high-res image proxy to keep the app flow working perfectly.
        const fallbackUrl = `https://picsum.photos/seed/${seed}/1024/1024`;
        
        // Load fallback natively
        const img = new Image();
        img.onload = () => {
          clearTimeout(loadingTimerRef.current)
          setImageUrl(fallbackUrl);
          
          const newId = Date.now().toString();
          const newItem = { id: newId, prompt, imageUrl: fallbackUrl, timestamp: Date.now() };
          
          setHistory(prev => [newItem, ...prev].slice(0, 50));
          setActiveId(newId);
          triggerToast("HF Quota Empty: Rendered Fallback Image!", 'error');
          setIsLoading(false);
          setLoadingMessage('');
        };
        img.onerror = () => { throw new Error("Fallback engine failed.") };
        img.src = fallbackUrl;
        return; // Exit here since fallback is handling state natively
      }

      const contentType = hfResponse.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        throw new Error("Unexpected JSON response instead of image");
      }

      setLoadingMessage('Finalizing image...')
      const blob = await hfResponse.blob()
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setImageUrl(base64data);
        
        const newId = Date.now().toString();
        const newItem = { id: newId, prompt, imageUrl: base64data, timestamp: Date.now() };
        
        setHistory(prev => [newItem, ...prev].slice(0, 15));
        setActiveId(newId);
        triggerToast("Image generated successfully!");
        setIsLoading(false);
        setLoadingMessage('');
      };
      
      reader.readAsDataURL(blob);

    } catch (err) {
      clearTimeout(loadingTimerRef.current)
      console.error(err)
      setError(err.message || "An unexpected error occurred.")
      triggerToast("Generation failed", "error")
    } finally {
      setIsLoading(false)
      setLoadingMessage('')
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `canvas-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    triggerToast("Image downloaded successfully")
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    triggerToast("Prompt copied to clipboard")
  }

  const handleDelete = () => {
    if (!activeId) return
    setHistory(prev => prev.filter(i => i.id !== activeId))
    setActiveId(null)
    triggerToast("Image removed from history")
  }

  const handleClearHistoryConfirm = () => {
    setHistory([])
    setActiveId(null)
    setIsConfirmModalOpen(false)
    triggerToast("History cleared")
  }

  return (
    <div className="app-layout">
      <Sidebar 
        history={history}
        activeId={activeId}
        onSelectHistory={handleSelectHistory}
        onNewGenerate={handleNewGenerate}
        onClearHistory={() => setIsConfirmModalOpen(true)}
        isOpen={isSidebarOpen}
      />

      <main className="main-workspace">
        <header className="topbar">
          <div className="mobile-menu-btn">
            <button className="icon-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', background: 'var(--bg-card)', padding: '0.35rem 0.75rem', borderRadius: '100px', border: '1px solid var(--border-color)', letterSpacing: '0.02em' }}>
            Stable Diffusion / Auto-Fallback
          </div>
        </header>

        <div className="workspace-content" onClick={() => isSidebarOpen && window.innerWidth <= 768 && setIsSidebarOpen(false)}>
          <PromptPanel 
            prompt={prompt} 
            setPrompt={setPrompt} 
            handleGenerate={generateImage} 
            isLoading={isLoading} 
          />
          <PreviewPanel 
            imageUrl={imageUrl} 
            isLoading={isLoading} 
            loadingMessage={loadingMessage}
            error={error} 
            onDownload={handleDownload}
            onCopyPrompt={handleCopyPrompt}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        title="Clear History"
        description="Are you sure you want to delete all generated images? This action cannot be undone."
        onConfirm={handleClearHistoryConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  )
}

export default App
