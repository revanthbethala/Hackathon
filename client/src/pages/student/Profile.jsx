import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionsShuffled, selectAnswer, nextQuestion, resetTest } from '@/features/mockTestSlice';

const MockTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    score,
    showScore,
  } = useSelector((state) => state.mockTest);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/questions_data.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        dispatch(setQuestionsShuffled(data));
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    }
    fetchQuestions();
  }, [dispatch]);

  const handleAnswerClick = (option) => {
    dispatch(selectAnswer({ option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate('/course'); // Navigate to RecommendedCourses
    } else {
      dispatch(nextQuestion());
    }
  };

  if (questions.length === 0) {
    return <div className="text-center text-lg font-semibold py-10">Loading questions...</div>;
  }

  return (
    <div className="mock-test-container max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {showScore ? (
        <div className="score-section text-center">
          <h2 className="text-3xl font-bold mb-4">Your Score</h2>
          <p className="text-lg">
            {score} out of {questions.length}
          </p>
          <button
            onClick={() => dispatch(resetTest())}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Retake Test
          </button>
        </div>
      ) : (
        <div className="question-section">
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h2>
          <p className="text-lg mb-6">{questions[currentQuestionIndex].question}</p>
          <div className="options-section flex flex-col">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-button px-4 py-2 border rounded-md mb-2 text-left ${selectedAnswer === option
                  ? option === questions[currentQuestionIndex].correct_option
                    ? 'bg-green-200 border-green-500'
                    : 'bg-red-200 border-red-500'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="next-button mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MockTest;
