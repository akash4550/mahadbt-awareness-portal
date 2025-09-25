import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);
    const [score, setScore] = useState(null);
    const [showRetake, setShowRetake] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('/api/quiz')
            .then(res => setQuestions(res.data))
            .catch(err => {
                console.error("Quiz fetch error:", err);
                setError('Could not load quiz questions.');
            });
    }, []);

    const handleAnswer = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to save your progress.");
            window.location.href = '/login';
            return;
        }

        if (Object.keys(answers).length !== questions.length) {
            return alert("Please answer all questions before submitting.");
        }

        try {
            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.post('/api/submit-quiz', { answers: Object.values(answers) }, config);
            setResults(res.data.results);
            setScore(res.data.score);
            setShowRetake(true);
        } catch (err) {
            console.error("Quiz submission error:", err);
            setError('Could not submit your score.');
        }
    };

    if (error) {
        return <section id="quiz"><h2>Test Your Knowledge!</h2><p style={{ color: 'red' }}>{error}</p></section>;
    }

    return (
        <section id="quiz">
            <h2>Test Your Knowledge!</h2>
            {!token && <p style={{ color: 'orange', textAlign: 'center' }}>You are not logged in. Your progress will not be saved.</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results ? (
                <div className="quiz-results">
                    <h3>Your Score: {score} / {results.length}</h3>
                    <ul>
                        {results.map((r, idx) => (
                            <li key={idx} style={{ marginBottom: '1em' }}>
                                <strong>Q{idx + 1}: {r.question}</strong><br />
                                <span>Your answer: <b style={{ color: r.isCorrect ? 'green' : 'red' }}>{r.userAnswer || 'No answer'}</b></span><br />
                                {!r.isCorrect && <span>Correct answer: <b style={{ color: 'green' }}>{r.correctAnswer}</b></span>}
                            </li>
                        ))}
                    </ul>
                    {showRetake && <button onClick={() => { setResults(null); setAnswers({}); setScore(null); setShowRetake(false); }}>Retake Quiz</button>}
                </div>
            ) : (
                questions.length === 0 ? <p>Loading quiz...</p> :
                <form onSubmit={handleSubmit}>
                    {questions.map((q, index) => (
                        <div key={q._id || index} className="question">
                            <p>{index + 1}. {q.question}</p>
                            {q.options.map(opt => (
                                <label key={opt}>
                                    <input type="radio" required name={`question-${index}`} value={opt} onChange={() => handleAnswer(index, opt)} checked={answers[index] === opt} />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Submit & Save to Profile</button>
                </form>
            )}
        </section>
    );
};

export default Quiz;