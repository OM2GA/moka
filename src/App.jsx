import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <main className="hero-container">
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="Rechercher sur Google ou saisir une URL" 
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </main>
  )
}

export default App
