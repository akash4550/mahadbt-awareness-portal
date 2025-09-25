import React, { useState } from 'react';
import axios from 'axios';

const DBTHealthCheck = () => {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async () => {
        setIsLoading(true);
        setStatus('Please wait while we simulate the check...');

        setTimeout(async () => {
            const isSeeded = Math.random() > 0.5;
            let finalStatus = isSeeded ? '✅ Your Aadhaar appears to be seeded.' : '❌ Your Aadhaar may not be seeded.';
            
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = { headers: { 'x-auth-token': token } };
                    await axios.post('/api/update-dbt-check', {}, config);
                    
                    finalStatus += " Your progress has been saved.";
                    setStatus(finalStatus);
                    
                    alert("Progress saved! Redirecting to your dashboard.");
                    window.location.href = '/dashboard'; // <-- This is the crucial missing line

                } catch (err) {
                    console.error("Could not save progress:", err);
                    setStatus(finalStatus + " (Could not save progress to dashboard.)");
                    setIsLoading(false);
                }
            } else {
                 setStatus(finalStatus + " (Log in to save your progress.)");
                 setIsLoading(false);
            }
        }, 2000);
    };

    return (
        <section id="health-check">
            <h2>Interactive DBT seeding Check</h2>
            <div>
                <h4>Step 1: Use the Official USSD Service</h4>
                <p>On your mobile phone (the one registered with Aadhaar), dial <strong>*99*99*1#</strong>. This is the official and most reliable way to check your status.</p>
                
                <h4>Step 2: Mark as Complete</h4>
                <p>After you've performed the step above, click the button below to mark this task as complete on your dashboard.</p>
                <button onClick={handleCheck} disabled={isLoading}>
                    {isLoading ? 'Checking...' : "I've Dialed the Number, Mark as Complete"}
                </button>
                {status && <p className="status-message">{status}</p>}
            </div>
        </section>
    );
};

export default DBTHealthCheck;