import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [linkHistory, setLinkHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const wrapperRef = useRef(null)

  // Load history from localStorage
  useEffect(() => {
    const savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    const savedLinkHistory = JSON.parse(localStorage.getItem('linkHistory') || '[]')
    setSearchHistory(savedSearchHistory)
    setLinkHistory(savedLinkHistory)

    // Click outside handler
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowHistory(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const saveSearch = (term) => {
    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 8)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  const saveLink = (title, url) => {
    const newLink = { title, url, timestamp: new Date().getTime() }
    const newHistory = [newLink, ...linkHistory.filter(item => item.url !== url)].slice(0, 8)
    setLinkHistory(newHistory)
    localStorage.setItem('linkHistory', JSON.stringify(newHistory))
  }

  const deleteSearch = (e, term) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter(item => item !== term)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  const deleteLink = (e, url) => {
    e.stopPropagation()
    e.preventDefault()
    const newHistory = linkHistory.filter(item => item.url !== url)
    setLinkHistory(newHistory)
    localStorage.setItem('linkHistory', JSON.stringify(newHistory))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      const trimmedQuery = query.trim()
      saveSearch(trimmedQuery)
      
      // Check if it's a URL
      const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/
      if (urlPattern.test(trimmedQuery)) {
        let url = trimmedQuery
        if (!url.startsWith('http')) url = 'https://' + url
        saveLink(trimmedQuery, url)
        window.location.href = url
      } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(trimmedQuery)}`
      }
    }
  }

  return (
    <main className="hero-container">
      <div className="search-wrapper" ref={wrapperRef}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Rechercher sur Google ou saisir une URL" 
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowHistory(true)}
          />
        </div>

        {showHistory && (searchHistory.length > 0 || linkHistory.length > 0) && (
          <div className="history-dropdown">
            <div className="history-section">
              <h3>Recherches récentes</h3>
              <div className="history-items">
                {searchHistory.map((item, i) => (
                  <div key={i} className="history-item" onClick={() => {
                    setQuery(item)
                    saveSearch(item)
                    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(item)}`
                  }}>
                    <span className="material-symbols-rounded icon">search</span>
                    <span className="text">{item}</span>
                    <button className="delete-btn" onClick={(e) => deleteSearch(e, item)}>
                      <span className="material-symbols-rounded">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="history-section">
              <h3>Liens visités</h3>
              <div className="history-items">
                {linkHistory.map((item, i) => (
                  <a key={i} href={item.url} className="history-item" onClick={() => saveLink(item.title, item.url)}>
                    <span className="material-symbols-rounded icon">link</span>
                    <span className="text">{item.title}</span>
                    <button className="delete-btn" onClick={(e) => deleteLink(e, item.url)}>
                      <span className="material-symbols-rounded">close</span>
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
