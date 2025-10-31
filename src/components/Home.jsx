import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Home = () => {

    // const [apiUrl, getApiUrl] = useState ('');
    const [quizOptions, setQuizOptions] = useState ({
        userName: '',
        category: '',
        difficulty: '',
    });

    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value} = event.target;

        setQuizOptions((prevState)=> ({
            ...prevState,
            [name]: value,
        }))
    }

  return (
    <>
    <Card className='welcome col-12 mt-2'>
      <Card.Body>
        <Card.Title>Open Trivia Database Quiz App</Card.Title>
        <Card.Text>
          <h2>Welcome!</h2>
          <p>Join us in brushing up on our trivia knowledge. See how many questions you can crush. Fun, facts, and friendly competition awaits!</p>
        </Card.Text>
      </Card.Body>
    </Card>

    <Card className ='start h5 mb-4'>
      <Card.Body>
        <Card.Title>Let's get started!</Card.Title>
        <Card.Text>
          <p>Enter your name, Select your categories and difficulty below. Then press the "Ready to train my brain." button. You will then move through 15 trivia questions custom made for your level! Select one of the four multiple choice options and click "Next". Results will be displayed after the last question.</p>
        </Card.Text>
      </Card.Body>
    </Card>


    <Form className='mt-4'>
       <Form.Group className="mb-4" controlId="userName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="userName"
          value={quizOptions.userName}
          onChange={handleChange}
        />
      </Form.Group>
      </Form>
    </>
  )
}

export default Home;

