import { useEffect, useState } from "react"
import axios from "axios";
import he from "he";

const QuestionForm = ({formData},) => {

  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let currentQuestion = '';

  
  useEffect (() => {
    const getQuestions = async () => {
    try {
      await new Promise(res => setTimeout(res, 1000));
      const response = await axios.get(`https://opentdb.com/api.php?amount=15&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`);
      setQuestionList(response.data.results);
    } catch (error) {
                setError(`Failed to fetch question: ${error.message}`);
            } finally {
                setLoading(false);
            }
  };
    getQuestions();
},[]);

  if (loading) return <p>Loading question...</p>;
  if (error) return <p>{error}</p>;

for (let questionIndex = 0; questionIndex < questionList.length; questionIndex++){
  currentQuestion = questionList[questionIndex]&& he.decode(questionList[questionIndex].question);
}

  return (
    <div className='question-container'>
      <h1>Question</h1>
      <div className="main">
        <p><strong>{currentQuestion}</strong></p>
    
      </div>
    </div>
  )
}

export default QuestionForm;
