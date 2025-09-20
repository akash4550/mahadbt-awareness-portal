import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Quiz from './Quiz';
import Chatbot from './Chatbot';

const QuizPage = () => {
    return (
        <div>
            <Header />
            <main>
                {/* The Quiz component now lives on its own dedicated page */}
                <Quiz />
            </main>
            <Chatbot />
            <Footer />
        </div>
    );
};

export default QuizPage;