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
               
                <Quiz />
            </main>
            <Chatbot />
            <Footer />
        </div>
    );
};

export default QuizPage;
