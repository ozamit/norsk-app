import { useState } from 'react'
import './App.css'
import VocabularyGame from './components/VocabularyGame'
import VerbGame from './components/VerbGame'

function App() {
  const [currentView, setCurrentView] = useState('menu') // 'menu', 'vocab', 'verbs'

  const renderMenu = () => (
    <div className="main-menu">
      <div class="heading-container">
        <h1>Norwegian Vocabulary Learning App</h1>
        <span class="emoji-flag">🇳🇴</span>
      </div>
      {/* <p className="subtitle">Select a mode to start learning</p> */}

      <div className="menu-grid">
        <button
          onClick={() => setCurrentView('vocab')}
          className="menu-card vocab-card"
        >
          <h2>📚 Vocabulary</h2>
          <p>Learn new words, build your vocabulary, and test yourself with 5,000+ words across 80+ categories</p>
        </button>

        {/* Verb Game hidden for now to focus on vocabulary
        <button
          onClick={() => setCurrentView('verbs')}
          className="menu-card verb-card"
        >
          <h2>🏃 Verb Practice</h2>
          <p>Master verb tenses and conjugation</p>
        </button>
        */}
      </div>
    </div>
  )

  return (
    <div className="app-container">
      {currentView === 'menu' && renderMenu()}
      {currentView === 'vocab' && <VocabularyGame onBack={() => setCurrentView('menu')} />}
      {currentView === 'verbs' && <VerbGame onBack={() => setCurrentView('menu')} />}
    </div>
  )
}

export default App
