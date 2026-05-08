import { useState, useEffect, useRef } from 'react'
import './App.css'
import gmailLogo from './assets/logos/gmail.svg'
import calendarLogo from './assets/logos/calendar.svg'
import chatLogo from './assets/logos/chat.svg'
import docsLogo from './assets/logos/docs.svg'
import driveLogo from './assets/logos/drive.svg'
import formsLogo from './assets/logos/forms.svg'
import keepLogo from './assets/logos/keep.svg'
import meetLogo from './assets/logos/meet.svg'
import sheetsLogo from './assets/logos/sheets.svg'
import sitesLogo from './assets/logos/sites.svg'
import slidesLogo from './assets/logos/slides.svg'
import tasksLogo from './assets/logos/tasks.svg'
import googleLogo from './assets/logos/google.svg'

function App() {
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState(() => JSON.parse(localStorage.getItem('searchHistory') || '[]'))
  const [linkHistory, setLinkHistory] = useState(() => JSON.parse(localStorage.getItem('linkHistory') || '[]'))
  const [suggestions, setSuggestions] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isAppsOpen, setIsAppsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const googleApps = [
    {
      category: 'Essentiels',
      apps: [
        { name: 'Recherche', logo: googleLogo, url: 'https://www.google.com' },
        { name: 'Maps', logo: 'https://www.gstatic.com/images/branding/product/1x/maps_48dp.png', url: 'https://maps.google.com' },
        { name: 'Traduction', logo: 'https://www.gstatic.com/images/branding/product/1x/translate_48dp.png', url: 'https://translate.google.com' },
      ]
    },
    {
      category: 'Communication',
      apps: [
        { name: 'Gmail', logo: gmailLogo, url: 'https://mail.google.com' },
        { name: 'Meet', logo: meetLogo, url: 'https://meet.google.com' },
        { name: 'Chat', logo: chatLogo, url: 'https://chat.google.com' },
        { name: 'Contacts', logo: 'https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png', url: 'https://contacts.google.com' },
      ]
    },
    {
      category: 'Organisation',
      apps: [
        { name: 'Drive', logo: driveLogo, url: 'https://drive.google.com' },
        { name: 'Agenda', logo: calendarLogo, url: 'https://calendar.google.com' },
        { name: 'Keep', logo: keepLogo, url: 'https://keep.google.com' },
        { name: 'Tasks', logo: tasksLogo, url: 'https://tasks.google.com' },
      ]
    },
    {
      category: 'Productivité',
      apps: [
        { name: 'Docs', logo: docsLogo, url: 'https://docs.google.com' },
        { name: 'Sheets', logo: sheetsLogo, url: 'https://docs.google.com/spreadsheets' },
        { name: 'Slides', logo: slidesLogo, url: 'https://docs.google.com/presentation' },
        { name: 'Forms', logo: formsLogo, url: 'https://docs.google.com/forms' },
        { name: 'Sites', logo: sitesLogo, url: 'https://sites.google.com' },
      ]
    },
    {
      category: 'Multimédia',
      apps: [
        { name: 'YouTube', logo: 'https://www.gstatic.com/images/branding/product/1x/youtube_48dp.png', url: 'https://www.youtube.com' },
        { name: 'Photos', logo: 'https://www.gstatic.com/images/branding/product/1x/photos_48dp.png', url: 'https://photos.google.com' },
        { name: 'Actualités', logo: 'https://www.gstatic.com/images/branding/product/1x/news_48dp.png', url: 'https://news.google.com' },
      ]
    }
  ]

  // Initialize event listeners
  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowHistory(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([])
        setSelectedIndex(-1)
        return
      }

      // JSONP implementation with 'firefox' client for more general web suggestions
      const callbackName = `jsonp_${Date.now()}`
      const script = document.createElement('script')
      script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&callback=${callbackName}`

      window[callbackName] = (data) => {
        const remoteSuggestions = data[1] || []
        // Filter history to find matches
        const historyMatches = searchHistory.filter(item =>
          item.toLowerCase().includes(query.toLowerCase()) &&
          !remoteSuggestions.includes(item)
        )
        // Combine history matches (priority) with remote suggestions
        setSuggestions([...historyMatches, ...remoteSuggestions].slice(0, 6))
        setSelectedIndex(-1)
        delete window[callbackName]
        document.body.removeChild(script)
      }

      script.onerror = () => {
        console.error('Error fetching suggestions')
        setSuggestions([])
        setSelectedIndex(-1)
        if (window[callbackName]) {
          delete window[callbackName]
          document.body.removeChild(script)
        }
      }

      document.body.appendChild(script)
    }

    const debounceTimer = setTimeout(fetchSuggestions, 250)
    return () => clearTimeout(debounceTimer)
  }, [query, searchHistory])

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
    const itemsCount = query ? suggestions.length : (searchHistory.length + linkHistory.length)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < itemsCount - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault()
        if (query) {
          const selectedTerm = suggestions[selectedIndex]
          setQuery(selectedTerm)
          saveSearch(selectedTerm)
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(selectedTerm)}`
        } else {
          if (selectedIndex < searchHistory.length) {
            const selectedTerm = searchHistory[selectedIndex]
            setQuery(selectedTerm)
            saveSearch(selectedTerm)
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(selectedTerm)}`
          } else {
            const linkIndex = selectedIndex - searchHistory.length
            const link = linkHistory[linkIndex]
            saveLink(link.title, link.url)
            window.location.href = link.url
          }
        }
      } else if (query.trim()) {
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
  }

  return (
    <div className={`app-layout ${isAppsOpen ? 'sidebar-open' : ''}`}>
      <button
        className={`apps-toggle-btn ${isAppsOpen ? 'active' : ''}`}
        onMouseEnter={() => setIsAppsOpen(true)}
        onClick={() => setIsAppsOpen(true)}
        title="Google Apps"
      >
        <span className="material-symbols-rounded">apps</span>
      </button>

      <main className="hero-container">
        <div className="search-wrapper" ref={wrapperRef}>
          <div className="input-group">
            <input
              type="text"
              autoFocus
              placeholder="Rechercher sur Google ou saisir une URL"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowHistory(true)}
            />
          </div>

          {showHistory && (searchHistory.length > 0 || linkHistory.length > 0 || suggestions.length > 0) && (
            <div className={`history-dropdown ${suggestions.length > 0 ? 'with-suggestions' : ''}`}>
              {suggestions.length > 0 && (
                <div className="history-section suggestions-section">
                  <h3>Suggestions</h3>
                  <div className="history-items">
                    {suggestions.slice(0, 6).map((item, i) => (
                      <div key={i} className={`history-item ${selectedIndex === i ? 'selected' : ''}`} onClick={() => {
                        setQuery(item)
                        saveSearch(item)
                        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(item)}`
                      }}>
                        <span className="material-symbols-rounded icon">trending_up</span>
                        <span className="text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!query && (
                <>
                  {searchHistory.length > 0 && (
                    <div className="history-section">
                      <h3>Recherches récentes</h3>
                      <div className="history-items">
                        {searchHistory.map((item, i) => (
                          <div key={i} className={`history-item ${selectedIndex === i ? 'selected' : ''}`} onClick={() => {
                            setQuery(item)
                            saveSearch(item)
                            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(item)}`
                          }}>
                            <span className="material-symbols-rounded icon">history</span>
                            <span className="text">{item}</span>
                            <button className="delete-btn" onClick={(e) => deleteSearch(e, item)}>
                              <span className="material-symbols-rounded">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {linkHistory.length > 0 && (
                    <div className="history-section">
                      <h3>Liens visités</h3>
                      <div className="history-items">
                        {linkHistory.map((item, i) => {
                          const globalIndex = searchHistory.length + i;
                          return (
                            <a key={i} href={item.url} className={`history-item ${selectedIndex === globalIndex ? 'selected' : ''}`} onClick={() => saveLink(item.title, item.url)}>
                              <span className="material-symbols-rounded icon">link</span>
                              <span className="text">{item.title}</span>
                              <button className="delete-btn" onClick={(e) => deleteLink(e, item.url)}>
                                <span className="material-symbols-rounded">close</span>
                              </button>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <aside className="apps-sidebar" onMouseLeave={() => setIsAppsOpen(false)}>
        <div className="sidebar-header">
          <h2>Google Apps</h2>
          <button className="close-sidebar" onClick={() => setIsAppsOpen(false)}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="apps-categories">
          {googleApps.map((group, groupIndex) => (
            <div key={groupIndex} className="category-section">
              <h3 className="category-title">{group.category}</h3>
              <div className="apps-grid">
                {group.apps.map((app, index) => (
                  <a key={index} href={app.url} className="app-card" target="_blank" rel="noopener noreferrer">
                    <div className="app-icon">
                      <img
                        src={app.logo}
                        alt={app.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png';
                        }}
                      />
                    </div>
                    <span className="app-name">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

export default App
