import { useState, useEffect, useRef } from 'react'

// Helper to flatten categories for mix modes
const getAllWords = (categories) => Object.values(categories).flatMap(c => c.words)

function VocabularyGame({ onBack }) {
    // Categories state - fetched from API
    const [CATEGORIES, setCategories] = useState({})
    const [categoriesLoading, setCategoriesLoading] = useState(true)
    const [categoriesError, setCategoriesError] = useState(null)

    // Fetch categories from API on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
                if (response.ok) {
                    const data = await response.json()
                    setCategories(data)
                } else {
                    setCategoriesError('Failed to load categories')
                }
            } catch (error) {
                console.error('Error fetching categories:', error)
                setCategoriesError('Failed to connect to server')
            } finally {
                setCategoriesLoading(false)
            }
        }
        fetchCategories()
    }, [])

    // Game state
    const [currentCategory, setCurrentCategory] = useState(null)
    const [currentWord, setCurrentWord] = useState(null)
    const [options, setOptions] = useState([])
    const [sessionWords, setSessionWords] = useState([]) // Queue of words for the current session
    const [gameFinished, setGameFinished] = useState(false)

    // Score state
    const [correctCount, setCorrectCount] = useState(0)
    const [mistakeCount, setMistakeCount] = useState(0)
    const [wordsCompleted, setWordsCompleted] = useState(0)

    // Dynamic total words based on category
    const getCategoryTotal = (key) => {
        if (!key || key === 'mix_mode') return 20 // Default for mix mode or if key is null
        return CATEGORIES[key]?.words.length || 20 // Fallback to 20 if category not found or words array is empty
    }

    const currentTotalWords = getCategoryTotal(currentCategory)

    const [feedback, setFeedback] = useState(null)
    const [isWaiting, setIsWaiting] = useState(false)
    const [timer, setTimer] = useState(0)
    const timerRef = useRef(null)

    // Mastery and High Score state
    const [masteredCategories, setMasteredCategories] = useState([])
    const [highScores, setHighScores] = useState({})

    // Fetch progress from API
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/progress`)
                if (response.ok) {
                    const data = await response.json()
                    // Process data to populate highScores and masteredCategories
                    const newHighScores = {}
                    const newMastered = []

                    data.forEach(item => {
                        if (item.score > (newHighScores[item.category] || 0)) {
                            newHighScores[item.category] = item.score
                        }
                        if (item.mastered && !newMastered.includes(item.category)) {
                            newMastered.push(item.category)
                        }
                    })

                    setHighScores(newHighScores)
                    setMasteredCategories(newMastered)
                }
            } catch (error) {
                console.error('Failed to fetch progress:', error)
            }
        }
        fetchProgress()
    }, [])

    const saveProgress = async (category, score, total, mastered) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    score,
                    totalWords: total,
                    mastered
                }),
            })
        } catch (error) {
            console.error('Failed to save progress:', error)
        }
    }

    // Check for mastery when game is "done"
    useEffect(() => {
        if (gameFinished && currentCategory && !currentCategory.startsWith('mix')) {
            const isMastered = mistakeCount === 0
            if (isMastered && !masteredCategories.includes(currentCategory)) {
                setMasteredCategories(prev => [...prev, currentCategory])
            }

            // Save to API
            saveProgress(currentCategory, correctCount, currentTotalWords, isMastered)
        }
    }, [gameFinished, mistakeCount, currentCategory, masteredCategories, correctCount, currentTotalWords])

    const prepareSession = (categoryKey) => {
        let wordPool = []
        if (categoryKey === 'mix_mode') {
            wordPool = getAllWords(CATEGORIES)
        } else {
            wordPool = [...CATEGORIES[categoryKey].words]
        }

        const limit = getCategoryTotal(categoryKey)
        // Shuffle the pool
        return wordPool.sort(() => Math.random() - 0.5).slice(0, limit)
    }

    const [showContext, setShowContext] = useState(false)

    // Collapsible groups state
    const [expandedGroups, setExpandedGroups] = useState({})

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }))
    }

    // Hard Mode state
    const [hideOptionsMode, setHideOptionsMode] = useState(false)
    const [optionsVisible, setOptionsVisible] = useState(false)

    const startGame = (categoryKey) => {
        setCurrentCategory(categoryKey)
        setCurrentWord(null) // Reset current word
        setCorrectCount(0)
        setMistakeCount(0)
        setWordsCompleted(0)
        setFeedback(null)
        setGameFinished(false)
        setShowContext(false)
        setOptionsVisible(false)

        // Initialize session with shuffled unique words
        const newSessionWords = prepareSession(categoryKey)
        setSessionWords(newSessionWords)
    }

    // Trigger next question when sessionWords updates (initial start) or after a question is answered
    useEffect(() => {
        if (currentCategory && sessionWords.length > 0 && !currentWord && !gameFinished) {
            generateQuestion()
        }
    }, [currentCategory, sessionWords, currentWord, gameFinished])

    const generateQuestion = () => {
        if (sessionWords.length === 0) {
            // Game Over
            setGameFinished(true)
            setFeedback({ type: 'success', message: 'Session Ended!' })

            // Update high score if applicable
            if (currentCategory && !currentCategory.startsWith('mix')) {
                const currentHighScore = highScores[currentCategory] || 0
                if (correctCount > currentHighScore) {
                    setHighScores(prev => ({ ...prev, [currentCategory]: correctCount }))
                }
            }
            return
        }

        const word = sessionWords[0]
        const remainingWords = sessionWords.slice(1)
        setSessionWords(remainingWords)

        // Get 3 unique distractors from the full pool of the current category/mix
        let fullPool = []
        if (currentCategory === 'mix_mode') {
            fullPool = getAllWords(CATEGORIES)
        } else {
            fullPool = CATEGORIES[currentCategory].words
        }

        const distractors = []
        let attempts = 0
        const maxAttempts = fullPool.length * 3 // Safety limit

        while (distractors.length < 3 && attempts < maxAttempts) {
            attempts++
            const randomDistractorIndex = Math.floor(Math.random() * fullPool.length)
            const distractor = fullPool[randomDistractorIndex]
            if (distractor.english !== word.english && !distractors.some(d => d.english === distractor.english)) {
                distractors.push(distractor)
            }
        }

        // If we couldn't find 3 unique distractors, fill with duplicates
        while (distractors.length < 3) {
            const randomIndex = Math.floor(Math.random() * fullPool.length)
            distractors.push(fullPool[randomIndex])
        }

        const allOptions = [...distractors, word].sort(() => Math.random() - 0.5)

        setCurrentWord(word)
        setOptions(allOptions)
        setFeedback(null)
        setIsWaiting(false)
        setTimer(0)
        setShowContext(false)
        setOptionsVisible(false) // Reset visibility for new question
        if (timerRef.current) clearInterval(timerRef.current)
    }

    const startTimer = () => {
        setTimer(7)
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    generateQuestion()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const handleGuess = (selectedOption) => {
        if (isWaiting || gameFinished) return

        setIsWaiting(true)
        setWordsCompleted(prev => prev + 1)
        setOptionsVisible(true) // Ensure options are visible when showing result

        if (selectedOption.english === currentWord.english) {
            setCorrectCount(prev => prev + 1)
            setFeedback({ type: 'success', message: 'Correct! 🎉' })
        } else {
            setMistakeCount(prev => prev + 1)
            setFeedback({ type: 'error', message: `Wrong! It was "${currentWord.english}"` })
        }

        // Only start timer if it's not the last word
        if (sessionWords.length > 0) { // Changed from >= 0 to > 0
            startTimer()
        }
    }

    const handleSkip = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (gameFinished) {
            setCurrentCategory(null)
        } else {
            generateQuestion()
        }
    }

    // Show loading state
    if (categoriesLoading) {
        return (
            <div className="loading-container">
                <h1>Loading categories...</h1>
            </div>
        )
    }

    // Show error state
    if (categoriesError) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h1>Error</h1>
                <p>{categoriesError}</p>
                <p>Make sure the backend server is running on port 5001</p>
            </div>
        )
    }

    if (!currentCategory) {
        // Group categories by their 'group' property
        const groupedCategories = Object.entries(CATEGORIES).reduce((acc, [key, data]) => {
            const group = data.group || 'Other'
            if (!acc[group]) acc[group] = []
            acc[group].push({ key, ...data })
            return acc
        }, {})

        return (
            <>
                <div className="game-header">
                    <button onClick={onBack} className="back-button">← Main Menu</button>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <h1>Norwegian Quiz</h1>
                    </div>
                </div>
                <p className="subtitle">Choose a category to start learning</p>

                <div className="categories-container">
                    {Object.entries(groupedCategories).map(([groupName, categories]) => (
                        <div key={groupName} className={`category-group ${expandedGroups[groupName] ? 'expanded' : ''}`}>
                            <button
                                className="group-header"
                                onClick={() => toggleGroup(groupName)}
                            >
                                <h3 className="group-title">{groupName}</h3>
                                <span className="group-chevron">▼</span>
                            </button>

                            {expandedGroups[groupName] && (
                                <div className="category-grid">
                                    {categories.map(({ key, title }) => (
                                        <button
                                            key={key}
                                            onClick={() => startGame(key)}
                                            className={`category-card ${masteredCategories.includes(key) ? 'mastered' : ''}`}
                                        >
                                            {title}
                                            {masteredCategories.includes(key) && <span className="mastery-badge">✓</span>}
                                            {highScores[key] !== undefined && !masteredCategories.includes(key) && (
                                                <div className="high-score">High Score: {highScores[key]}/{getCategoryTotal(key)}</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="category-group">
                        <h3 className="group-title">Mix Mode</h3>
                        <div className="category-grid">
                            <button onClick={() => startGame('mix_mode')} className="category-card special">
                                Start Mix Mode
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (!currentWord && !gameFinished) return <div>Loading...</div>

    return (
        <>
            <div className="game-header">
                <button onClick={() => setCurrentCategory(null)} className="back-button">
                    ← Categories
                </button>
                <h2>{currentCategory === 'mix_mode' ? 'Mix Mode' : CATEGORIES[currentCategory]?.title}</h2>

                <div className="hard-mode-toggle">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={hideOptionsMode}
                            onChange={(e) => setHideOptionsMode(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span className="toggle-label">Hard Mode</span>
                    <div className="tooltip">Hide options to guess first!</div>
                </div>
            </div>

            <div className="stats-board">
                <div className="stat">
                    <span className="stat-label">Correct:</span>
                    <span className="stat-value correct">{correctCount}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Wrong:</span>
                    <span className="stat-value wrong">{mistakeCount}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Progress:</span>
                    <span className="stat-value">{wordsCompleted} / {currentTotalWords}</span>
                </div>
            </div>

            {!gameFinished && currentWord && (
                <div className="game-container">
                    <div className="word-display">
                        <h2>{currentWord.norwegian}</h2>
                    </div>

                    {hideOptionsMode && !optionsVisible && !isWaiting ? (
                        <button
                            className="reveal-button"
                            onClick={() => setOptionsVisible(true)}
                        >
                            Reveal Options
                        </button>
                    ) : (
                        <div className="options-grid">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleGuess(option)}
                                    className="option-button"
                                    disabled={isWaiting}
                                >
                                    {option.english}
                                </button>
                            ))}
                        </div>
                    )}

                    {!isWaiting && (
                        <button onClick={() => setShowContext(!showContext)} className="context-button">
                            {showContext ? 'Hide Context' : 'Show Context'}
                        </button>
                    )}

                    {showContext && !isWaiting && (
                        <div className="context-text">
                            <em>{currentWord.context}</em>
                        </div>
                    )}
                </div>
            )}

            {feedback && (
                <div className={`feedback-container ${feedback.type}`}>
                    <p className="feedback-message">{feedback.message}</p>
                    {feedback.type === 'success' && currentWord && (
                        <p className="context-sentence"><em>{currentWord.context}</em></p>
                    )}
                    {feedback.type === 'error' && currentWord && (
                        <p className="context-sentence"><em>{currentWord.context}</em></p>
                    )}
                    {!gameFinished && (
                        <div className="timer-section">
                            <p className="timer">Next in {timer}s</p>
                            <button onClick={handleSkip} className="skip-button">Skip</button>
                        </div>
                    )}
                    {gameFinished && (
                        <>
                            <div className="completion-screen">
                                <h3>Session Complete!</h3>
                                <p>Final Score: {correctCount}/{currentTotalWords}</p>
                                {mistakeCount === 0 && currentCategory && !currentCategory.startsWith('mix') && (
                                    <p className="mastery-message">🎉 Perfect! Category Mastered!</p>
                                )}
                            </div>
                            <button onClick={handleSkip} className="skip-button">Back to Categories</button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default VocabularyGame
