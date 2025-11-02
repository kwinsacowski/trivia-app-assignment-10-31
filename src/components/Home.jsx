import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = ({formData, setFormData}) => {
    const navigate = useNavigate();

    const [heading, setHeading] = useState ('Welcome');
    const [message, setMessage] = useState ('Join us in brushing up on our trivia knowledge. See how many questions you can crush. Fun, facts, and friendly competition awaits!')
    const [buttonText, setButtonText] = useState ('Test Your Brain!')
    const [showForm, setShowForm] = useState(false)
    const [categoryList, setCategoryList] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState("");


    const giveInstructions = () => {
       setHeading('Instructions');
       setMessage("Enter your name, pick your favorite categories, and choose your difficulty level. Then hit “I'm Ready” to start your custom 15-question Multiple Choice quiz.");
       setButtonText("I'm Ready")
       setShowForm(true);
    }
 
    useEffect(()=>{
        const fetchCategories = async () =>{
            try {
                const categoryResponse = await axios.get('https://opentdb.com/api_category.php');
                setCategoryList(categoryResponse.data.trivia_categories);
            } catch (error) {
                setError(`Failed to fetch categories: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategories();
    },[]);

    const handleChange = (e) => {
        const { name, value} = e.target;

        

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        const {name, category, difficulty} = formData;

        if(!name || !category || !difficulty) {
            setFormError('Please complete all fields.');
            return;
        }
        setFormError('');
        navigate('/questions');
    };


    if (loading) return <p>Loading Categories...</p>;
    if (error) return <p>{error}</p>;

  return (
    <>
        <h1>Open Trivia Database Quiz</h1>
        <div className="main">
           <h2>{heading}</h2>
            <p>{message}</p>
        </div>
        {showForm && <div className="form">
            <form>
                <div className="form-row">
                    <label htmlFor="Name">Name:</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="What do we call you?"
                    onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="Category">Category:</label>
                        <select 
                        id="category" 
                        name="category"
                        defaultValue=""
                        onChange={handleChange}>
                            <option value='' disabled>Select Category</option>
                            {categoryList.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                        </select>
                </div>

                <div className="form-row">
                    <label htmlFor="Difficulty">Difficulty:</label>
                        <select 
                        id="difficulty" 
                        name="difficulty" 
                        defaultValue=""
                        onChange={handleChange}
                        >
                            <option value="" disabled>Select difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                </div>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>}
        <button type="submit" onClick=
        {() =>
            buttonText === "Test Your Brain!" ? giveInstructions() : handleSubmit()
        }>
        {buttonText}</button>
    </>
  )
}

export default Home;

