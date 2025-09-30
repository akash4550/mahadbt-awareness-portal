import React, { useState, useEffect } from 'react';
import client from '../api/client';
import './Dashboard.css';

import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';



const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formDownloaded, setFormDownloaded] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleGenerateForm = async () => {
        setIsGenerating(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token }, responseType: 'blob' };
            const res = await client.get('/api/form/generate', config);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `DBT-Consent-Form-${user.name}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setFormDownloaded(true);
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            setIsGenerating(false);
        }
    };



    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) { setLoading(false); window.location.href = '/login'; return; }
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await client.get('/api/auth/user', config);
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                localStorage.removeItem('token');
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);



    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Dashboard...</p>;
    if (!user) return null;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
                <div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                    <button onClick={() => navigate('/community')} className="community-btn" style={{ marginLeft: '10px' }}>Community</button>
                </div>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-section">
                    <h2>Your Personalized Action Plan</h2>
                    <section className="video1">
                      <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/V64Ron0EdSs?si=SkSetttGzKUI1J7K&amp;start=31" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
                    </section>
                       
                    <ul className="checklist">
                        <li className="completed">
                            <span className="icon">✅</span><span className="text">Account Created</span>
                        </li>
                        <li className={user.progress?.isQuizCompleted ? 'completed' : 'pending'}>
                            <span className="icon">{user.progress?.isQuizCompleted ? '✅' : '⬜️'}</span>
                            <span className="text">Complete the DBT Awareness Quiz</span>
                            {!user.progress?.isQuizCompleted && <a href="/quiz"><button className="task-btn">Start Quiz</button></a>}
                        </li>
                        <li className={user.progress?.hasCheckedDBTStatus ? 'completed' : 'pending'}>
                            <span className="icon">{user.progress?.hasCheckedDBTStatus ? '✅' : '⬜️'}</span>
                            <span className="text">Check Your Aadhaar Seeding Status</span>
                            {!user.progress?.hasCheckedDBTStatus && <a href="/#health-check"><button className="task-btn">Check Now</button></a>}
                        </li>
                        <li className={(user.progress?.hasGeneratedForm || formDownloaded) ? 'completed' : 'pending'}>
                            <span className="icon">{(user.progress?.hasGeneratedForm || formDownloaded) ? '✅' : '⬜️'}</span>
                            <span className="text">Download Seeding Form</span>
                            {!(user.progress?.hasGeneratedForm || formDownloaded) && 
                                <button className="task-btn" onClick={handleGenerateForm} disabled={isGenerating}>
                                    {isGenerating ? 'Generating...' : 'Generate PDF'}
                                </button>
                            }
                        </li>
                    </ul>

                     <button
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    right: '32px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f8cff 60%, #00e6c3 100%)',
                    color: 'white',
                    fontSize: '2rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                aria-label="Open Chatbot"
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            >🤖</button>
            <Chatbot />
                </section>
            </main>
           
        </div>
    );
};

export default Dashboard;
