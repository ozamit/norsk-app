import { useState, useEffect, useRef } from 'react'

function VerbGame({ onBack }) {
    const [verbs, setVerbs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Game state
    const [currentVerb, setCurrentVerb] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [options, setOptions] = useState([])
    const [gameFinished, setGameFinished] = useState(false)
    const [usedSentences, setUsedSentences] = useState([]) // Track used sentences by English text

    // Score state
    const [score, setScore] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [questionsCompleted, setQuestionsCompleted] = useState(0)
    const TOTAL_QUESTIONS = 10

    const [feedback, setFeedback] = useState(null)
    const [timer, setTimer] = useState(0)
    const timerRef = useRef(null)

    // Fetch verbs on mount
    useEffect(() => {
        const fetchVerbs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verbs`)
                if (response.ok) {
                    const data = await response.json()
                    setVerbs(data)
                } else {
                    setError('Failed to load verbs')
                }
            } catch (err) {
                setError('Failed to connect to server')
            } finally {
                setLoading(false)
            }
        }
        fetchVerbs()
    }, [])

    const startGame = (verb) => {
        setCurrentVerb(verb)
        setScore(0)
        setMistakes(0)
        setQuestionsCompleted(0)
        setGameFinished(false)
        setFeedback(null)
        setUsedSentences([]) // Reset used sentences
        generateQuestion([verb], [])
    }

    const generateQuestion = (verbList = [currentVerb], currentUsed = usedSentences) => {
        if (timerRef.current) clearInterval(timerRef.current)
        setTimer(0)

        if (questionsCompleted >= TOTAL_QUESTIONS) {
            setGameFinished(true)
            setFeedback({ type: 'success', message: 'Session Complete!' })
            return
        }

        const activeVerb = verbList[0]

        // Filter sentences to find "safe" ones for replacement
        // AND exclude sentences that have already been used
        const safeSentences = activeVerb.sentences.filter(s => {
            if (s.tense === 'imperative') return false
            if (currentUsed.includes(s.english)) return false // Skip used sentences

            const form = activeVerb.forms[s.tense]
            const regex = new RegExp(form, 'i')
            return regex.test(s.norwegian)
        })

        // If we ran out of unique sentences, we might need to reset or handle it.
        // For now, let's just log it and maybe reset if needed, or just pick random if empty.
        // But with 10 questions and ~20 sentences, we should be fine.
        let availableSentences = safeSentences
        if (availableSentences.length === 0) {
            console.warn('Ran out of unique sentences! Resetting used list for this session.')
            // Fallback: use all safe sentences again (ignoring used)
            availableSentences = activeVerb.sentences.filter(s => {
                if (s.tense === 'imperative') return false
                const form = activeVerb.forms[s.tense]
                const regex = new RegExp(form, 'i')
                return regex.test(s.norwegian)
            })
        }

        if (availableSentences.length === 0) {
            console.error('No safe sentences available at all')
            return
        }

        const correctSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)]

        // Add to used list
        setUsedSentences(prev => [...prev, correctSentence.english])

        const correctNorwegian = correctSentence.norwegian
        const correctTense = correctSentence.tense
        const correctForm = activeVerb.forms[correctTense]

        const allTenses = ['present', 'past', 'perfect', 'pluperfect', 'future', 'imperative']
        const wrongTenses = allTenses.filter(t => t !== correctTense && t !== 'imperative')
        const selectedWrongTenses = wrongTenses.sort(() => Math.random() - 0.5).slice(0, 3)

        const wrongOptions = selectedWrongTenses.map(wrongTense => {
            const wrongForm = activeVerb.forms[wrongTense]
            const regex = new RegExp(correctForm, 'i')
            let wrongSentence = correctNorwegian.replace(regex, wrongForm)

            return {
                english: correctSentence.english,
                norwegian: wrongSentence,
                tense: wrongTense
            }
        })

        const allOptions = [correctSentence, ...wrongOptions].sort(() => Math.random() - 0.5)

        setCurrentQuestion({
            verb: activeVerb,
            englishSentence: correctSentence.english,
            correctAnswer: correctSentence.norwegian,
            tense: correctSentence.tense
        })

        setOptions(allOptions)
        setFeedback(null)
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
        if (feedback || gameFinished) return

        setQuestionsCompleted(prev => prev + 1)

        if (selectedOption.norwegian === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1)
            setFeedback({ type: 'success', message: 'Correct! 🎉' })
        } else {
            setMistakes(prev => prev + 1)
            setFeedback({
                type: 'error',
                message: `Wrong! Correct was: ${currentQuestion.correctAnswer}`
            })
        }

        if (questionsCompleted < TOTAL_QUESTIONS - 1) {
            startTimer()
        } else {
            // Last question answered, show completion immediately after delay
            setTimeout(() => {
                setGameFinished(true)
            }, 2000)
        }
    }

    const handleSkip = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (gameFinished) {
            setCurrentVerb(null)
        } else {
            generateQuestion()
        }
    }

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Loading verbs...</h1>
        </div>
    )

    if (error) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Error</h1>
            <p>{error}</p>
        </div>
    )

    // Selection View
    if (!currentVerb) {
        return (
            <>
                <div className="game-header">
                    <button onClick={onBack} className="back-button">
                        ← Main Menu
                    </button>
                    <h1>Verb Practice</h1>
                </div>
                <p className="subtitle">Choose a verb to practice</p>

                <div className="categories-container">
                    <div className="category-group">
                        <div className="category-grid">
                            {verbs.map((verb) => (
                                <button
                                    key={verb._id}
                                    onClick={() => startGame(verb)}
                                    className="category-card"
                                >
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{verb.infinitive}</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{verb.translation}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Game View
    if (!currentQuestion && !gameFinished) return <div>Preparing game...</div>

    return (
        <>
            <div className="game-header">
                <button onClick={() => setCurrentVerb(null)} className="back-button">
                    ← Verbs
                </button>
                <h2>Practicing: {currentVerb.infinitive}</h2>
            </div>

            <div className="stats-board">
                <div className="stat">
                    <span className="stat-label">Correct:</span>
                    <span className="stat-value correct">{score}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Wrong:</span>
                    <span className="stat-value wrong">{mistakes}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Progress:</span>
                    <span className="stat-value">{questionsCompleted} / {TOTAL_QUESTIONS}</span>
                </div>
            </div>

            {!gameFinished && currentQuestion && (
                <div className="game-container">
                    <div className="word-display">
                        <h2>{currentQuestion.englishSentence}</h2>
                        <div style={{ fontSize: '1rem', color: '#666', marginTop: '0.5rem' }}>
                            ({currentQuestion.verb.infinitive} - {currentQuestion.verb.translation})
                        </div>
                    </div>

                    <div className="options-grid">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleGuess(option)}
                                className="option-button"
                                disabled={!!feedback}
                            >
                                {option.norwegian}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {feedback && (
                <div className={`feedback-container ${feedback.type}`}>
                    <p className="feedback-message">{feedback.message}</p>

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
                                <p>Final Score: {score}/{TOTAL_QUESTIONS}</p>
                                {mistakes === 0 && (
                                    <p className="mastery-message">🎉 Perfect! Verb Mastered!</p>
                                )}
                            </div>
                            <button onClick={() => setCurrentVerb(null)} className="skip-button">Back to Verbs</button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default VerbGame
