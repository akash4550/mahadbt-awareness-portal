import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import DBTHealthCheck from './components/DBTHealthCheck';
// import Quiz from './components/Quiz';
import ResourceLocator from './components/ResourceLocator';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Community from './components/Community';
import QuizPage from './components/QuizPage';
const MainPortalContent = () => (
    <>
        <Header />
        <main>
            <DBTHealthCheck />
            
            <ResourceLocator />
        </main>
        <Chatbot />
        <Footer />
    </>
);

const PrivateRoute = ({ children }) => {
    return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MainPortalContent />} />
                    <Route path="/community" element={<Community />} />
                     <Route path="/quiz" element={<QuizPage />} />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute><Dashboard /></PrivateRoute>}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;