import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import ResultsSection from './components/ResultsSection';

function App() {
  const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: '',
});
  const [score, setScore] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home formData={formData} setFormData={setFormData}/>} />
        <Route path="/questions" element={<QuestionForm formData={formData} score={score} setScore={setScore}/>} />
        <Route path="/results" element={<ResultsSection score={score}/>} />
      </Routes>
    </>
  )
}

export default App
