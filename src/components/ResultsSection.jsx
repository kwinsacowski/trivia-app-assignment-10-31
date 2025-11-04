import React from "react";
import { useNavigate } from "react-router-dom";

const ResultsSection = ({ score, }) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>15</strong>!
      </p>

      <div className="results-buttons">
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>

      {score === 15 && <p>🎉 Perfect Score! Well done! Restart with a new Category or Challenge your Friends!</p>}
      {score > 15 / 2 && score < 15 && <p>👍 Retry for a higher school, choose a new category, or challenge your Friends!</p>}
      {score <= 15 / 2 && <p>😅 No one needs to know! Try again for a better score!</p>}
    </div>
  );
};

export default ResultsSection;
