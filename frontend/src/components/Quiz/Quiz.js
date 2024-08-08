import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css'; 

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    setLoading(true);
    axios.get('http://localhost:5000/quiz')
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the quiz questions!', error);
        setLoading(false);
      });
  };

  const handleAnswerChange = (index, option) => {
    setAnswers({
      ...answers,
      [index]: option
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Page</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        questions.length > 0 && (
          <div>
            {questions.map((question, index) => (
              <div key={index} className="question-container">
                <h3 className="question">{question.question}</h3>
                {question.options.map((option, idx) => (
                  <div key={idx} className="option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    {option}
                  </div>
                ))}
              </div>
            ))}
            <button className="quiz-button" onClick={handleSubmit}>Submit</button>
            {score !== null && (
              <h2 className="score">Your score: {score} / {questions.length}</h2>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Quiz;