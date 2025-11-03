import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import he from "he";

const QuestionForm = ({formData, score, setScore},) => {

  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();

  
  useEffect (() => {
    const getQuestions = async () => {
    try {
      const tokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
      const token = tokenResponse.data.token;

      const response = await axios.get(`https://opentdb.com/api.php?amount=15&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple&token=${token}`);
      setQuestionList(response.data.results);
    } catch (error) {
                setError(`Failed to fetch question: ${error.message}`);
            } finally {
                setLoading(false);
            }
  };
    getQuestions();
},[formData]);

  useEffect (() => {
    if(questionList.length > 0) {
      const current = questionList[questionIndex];
      const mixedAnswers = shuffle([
        current.correct_answer, ...current.incorrect_answers,
      ]);
      setAnswers(mixedAnswers);
      setSelectedAnswer('');
      setFeedback('');
      setShowNext(false);
    }
  },[questionList, questionIndex]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) return;

    const correct = questionList[questionIndex].correct_answer;

    if (selectedAnswer === correct){
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect. Answer was: ${he.decode(correct)}`);
    }
    setShowNext(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex + 1 < questionList.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      navigate('/results')
    }
  }

  if (loading) return <p>Loading question...</p>;
  if (error) return <p>{error}</p>;
  if (questionList.length === 0) return <p>No questions found.</p>;

  const currentQuestion = he.decode(questionList[questionIndex].question);

  return (
    <div className='question-container'>
      <h2>Question {questionIndex +1} / {questionList.length}</h2>
      <div className="main">
        <p><strong>{currentQuestion}</strong></p>
        <form onSubmit={handleAnswerSubmit}>
          {answers.map((ans, index) => (
          <div key={index} className="options">
            <label>
              <input 
                type="radio"
                name="answer"
                value={ans}
                checked={selectedAnswer === ans}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                disabled={showNext} 
              />
              {he.decode(ans)}
            </label>
          </div>
          ))}
          {!showNext && (
          <button type="submit" disabled={!selectedAnswer}>
            Submit Answer
          </button>
        )}
        </form>

         {feedback && <p>{feedback}</p>}
        
        {showNext && (
        <button onClick={handleNextQuestion}>
          {questionIndex + 1 === questionList.length
            ? "View Results"
            : "Next Question"}
        </button>
      )}
      <p>Current Score: {score}</p>
      </div>
    </div>
  )
}

export default QuestionForm;
