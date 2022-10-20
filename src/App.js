import React, { useState } from "react"
import "./App.css"
import { useTimer } from 'react-timer-hook'


function App() {
  // -----------------------------------------


  function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') })


    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '30px', color: "white", font: "bold" }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}

        {/* <button onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 300)
          restart(time)
        }}>Restart</button>
         */}
      </div>
    )
  }



  // Properties-----------------------------------
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)


  const questions = [
    {
      text: "What is the capital of India?",
      options: [
        { id: 0, text: "Andhra Pradesh", isCorrect: false },
        { id: 1, text: "Chhattisgarh", isCorrect: false },
        { id: 2, text: "Goa", isCorrect: false },
        { id: 3, text: "New Delhi", isCorrect: true },
      ],
    },
    {
      text: "How many country in world?",
      options: [
        { id: 0, text: "195", isCorrect: true },
        { id: 1, text: "199", isCorrect: false },
        { id: 2, text: "189", isCorrect: false },
        { id: 3, text: "190", isCorrect: false },
      ],
    },
    {
      text: "Who made facebook?",
      options: [
        { id: 0, text: "Mark Zuckerberg", isCorrect: true },
        { id: 1, text: "Paul Revere", isCorrect: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false },
      ],
    },
    {
      text: "What is big country in the world?",
      options: [
        { id: 0, text: "India", isCorrect: false },
        { id: 1, text: "Russia", isCorrect: true },
        { id: 2, text: "US", isCorrect: false },
        { id: 3, text: "Canada", isCorrect: false },
      ],
    },
    {
      text: "How many vowels in english?",
      options: [
        { id: 0, text: "6", isCorrect: false },
        { id: 1, text: "5", isCorrect: true },
        { id: 2, text: "4", isCorrect: true },
        { id: 3, text: "7", isCorrect: false },
      ],
    },
  ]

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowResults(false)
  }


  // ---------------------------------------------------------


  const time = new Date()
  time.setSeconds(time.getSeconds() + 30) // 1 minutes timer

  console.log(time)
  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>General Knowledge Quiz</h1>

      {/* <MyTimer expiryTimestamp={time} /> */}
      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <MyTimer expiryTimestamp={time} />
          {
            console.log(<MyTimer expiryTimestamp={time} />, "time")
          }

          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
