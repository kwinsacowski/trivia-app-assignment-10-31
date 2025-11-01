import { useState } from "react"


const Home = () => {
    const [heading, setHeading] = useState ('Welcome');
    const [message, setMessage] = useState ('Join us in brushing up on our trivia knowledge. See how many questions you can crush. Fun, facts, and friendly competition awaits!')
    const [buttonText, setButtonText] = useState ('Test Your Brain!')

    const giveInstructiions = () => {
       setHeading('Instructions');
       setMessage("Enter your name, pick your favorite categories, and choose your difficulty level. Then hit “I'm Ready” to start your custom 15-question quiz.");
       setButtonText("I'm Ready")
    }

  return (
    <>
        <h1>Open Trivia Database Quiz</h1>
        <div className="main">
           <h2>{heading}</h2>
            <p>{message}</p>
        </div>
        <button type="button" onClick={giveInstructiions}>{buttonText}</button>
    </>
  )
}

export default Home;

