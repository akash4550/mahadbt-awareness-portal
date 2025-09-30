import React, { useState, useEffect, useRef, useMemo } from 'react';

// Module-level constant to keep dependencies stable across renders
const FAQS = [
        {
            keywords: ["lost aadhaar", "forgot aadhaar", "missing aadhaar", "reissue"],
            answers: ["If you have lost your Aadhaar card, you can download an e-Aadhaar from the UIDAI website.", "Visit an Aadhaar Enrollment Center to reissue your Aadhaar card if lost.", "You can use your Aadhaar number or enrollment ID to retrieve your details online."]
        },
        {
            keywords: ["biometric", "fingerprint", "iris", "update", "issue"],
            answers: ["For biometric updates or issues, visit an Aadhaar Enrollment Center for assistance.", "Biometric failures can be resolved by updating your fingerprints or iris scan at UIDAI centers.", "Contact UIDAI if you face repeated biometric failures."]
        },
        {
            keywords: ["farmer", "pm kisan", "agriculture", "crop", "farm"],
            answers: ["Farmers can receive PM Kisan and other agriculture subsidies via DBT.", "Check the DBT portal for farmer-specific schemes and eligibility.", "Contact your local agriculture office for help with DBT payments."]
        },
        {
            keywords: ["women", "ujjwala", "girl", "female", "scheme"],
            answers: ["Women can benefit from DBT schemes like Ujjwala for LPG subsidy and scholarships for girls.", "Check the DBT portal for women-specific schemes and eligibility.", "Many DBT schemes support women empowerment and financial inclusion."]
        },
        {
            keywords: ["cyber", "safety", "fraud", "scam", "secure", "phishing"],
            answers: ["Always use official websites and apps for DBT and Aadhaar services.", "Do not share OTPs, passwords, or Aadhaar details with anyone over phone or email.", "Report any suspicious activity or fraud to your bank and the authorities."]
        },
        {
            keywords: ["dbt", "difference", "seeding"],
            answers: ["Aadhaar Linking is for KYC, while Aadhaar Seeding (DBT-enabled) tells the government which single account to send money to. It's your designated 'mailing address' for funds!", "DBT seeding means your Aadhaar is mapped to a specific bank account for direct benefit transfers. Linking is just for identity verification.", "Seeding your Aadhaar ensures you receive government benefits directly into your chosen bank account. Linking alone does not guarantee this."]
        },
        {
            keywords: ["check", "status", "track", "payment"],
            answers: ["You can check your Aadhaar seeding status by dialing *99*99*1# from your Aadhaar-registered mobile number.", "Visit your bank branch or use your bank's app to check if your Aadhaar is seeded for DBT.", "You may also check your DBT status on the official portal: https://dbtbharat.gov.in."]
        },
        {
            keywords: ["scholarship", "money", "payment", "failed", "credited", "transaction"],
            answers: ["A common reason for DBT payment failure is that your Aadhaar is not seeded with your bank account, or it's seeded with a different/inactive account.", "If your scholarship or DBT payment failed, check if your Aadhaar is correctly seeded and your account is active.", "Sometimes payments fail if your bank account is closed or not DBT-enabled. Please verify with your bank."]
        },
        {
            keywords: ["how", "seed", "form", "consent", "online", "branch"],
            answers: ["To seed your Aadhaar, visit your bank branch and fill out an Aadhaar Seeding Consent Form.", "Some banks allow Aadhaar seeding through their mobile or internet banking apps.", "Bring your Aadhaar card and bank passbook to the branch for seeding."]
        },
        {
            keywords: ["portal", "website", "login", "government", "apply"],
            answers: ["The DBT portal is the official government website for Direct Benefit Transfer schemes: https://dbtbharat.gov.in.", "You can access scheme info, check status, and more at the DBT portal.", "You can apply for various government schemes through the DBT portal."]
        },
        {
            keywords: ["aadhar", "aadhaar", "uidai", "identity"],
            answers: ["Aadhaar is a unique 12-digit identity number issued by UIDAI to residents of India.", "Your Aadhaar number is used for KYC and DBT purposes.", "Aadhaar helps you access government benefits and services securely."]
        },
        {
            keywords: ["update", "change", "details", "correction", "edit"],
            answers: ["To update your Aadhaar details, visit an Aadhaar Enrollment Center.", "You can use the UIDAI website for certain updates like address or mobile number.", "Carry original documents for verification when updating Aadhaar details."]
        },
        {
            keywords: ["link", "linking", "bank", "account", "subsidy"],
            answers: ["To link Aadhaar to your bank account, visit your branch or use your bank's mobile/internet banking.", "Some banks offer Aadhaar linking via SMS or ATM as well.", "Linking Aadhaar helps you receive government benefits and subsidies."]
        },
        {
            keywords: ["hello", "hi", "hey", "greetings"],
            answers: ["Hello! Ask me about DBT, Aadhaar seeding, or how to check your status.", "Hi there! How can I assist you with DBT or Aadhaar today?", "Namaste! I'm here to help with your DBT and Aadhaar queries."]
        },
        {
            keywords: ["thank", "thanks", "thx", "appreciate"],
            answers: ["You're welcome! Feel free to ask more questions.", "Glad I could help! Let me know if you have more queries.", "Happy to assist! Ask me anything about DBT or Aadhaar."]
        }
    ];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hello! I am DBT Sahayak. How can I help you understand Aadhaar and DBT today?', sender: 'bot' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatboxBodyRef = useRef(null);

    useEffect(() => {
        const openHandler = () => setIsOpen(true);
        window.addEventListener('open-chatbot', openHandler);
        return () => window.removeEventListener('open-chatbot', openHandler);
    }, []);
    

   
    const keywordMap = useMemo(() => {
        const map = new Map();
        FAQS.forEach((faq, index) => {
            faq.keywords.forEach(keyword => {
                
                map.set(keyword, index);
            });
        });
        return map;
    }, []);


    const getBotResponse = (input) => {
        const sanitizedInput = input.toLowerCase().trim();
        const inputWords = sanitizedInput.split(/\s+/);
        const scores = {}; // To store scores for each FAQ index

       
        inputWords.forEach(word => {
            for (const [keyword, faqIndex] of keywordMap.entries()) {
                if (word.includes(keyword)) {
                    scores[faqIndex] = (scores[faqIndex] || 0) + 1;
                }
            }
        });

        // Find the FAQ with the highest score
        let bestMatchIndex = -1;
        let maxScore = 0;
        for (const faqIndex in scores) {
            if (scores[faqIndex] > maxScore) {
                maxScore = scores[faqIndex];
                bestMatchIndex = parseInt(faqIndex, 10);
            }
        }
        
        // If a good match is found, return a random answer from that FAQ
        if (bestMatchIndex !== -1) {
            const answers = FAQS[bestMatchIndex].answers;
            return answers[Math.floor(Math.random() * answers.length)];
        }

        return "I'm sorry, I don't understand. Try asking about DBT, Aadhaar, or seeding. Example: 'How do I check DBT status?'";
    };

    const handleSend = () => {
        if (userInput.trim() === '') return;

        const userMessage = { text: userInput, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsTyping(true); // Bot starts "typing"
        
        // Get response using the improved logic
        const botResponseText = getBotResponse(userInput);

        // Simulate bot thinking time
        setTimeout(() => {
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setIsTyping(false); // Bot finishes "typing"
        }, 800);

        setUserInput('');
    };

    // Auto-scroll to the latest message
    useEffect(() => {
        if (chatboxBodyRef.current) {
            chatboxBodyRef.current.scrollTop = chatboxBodyRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <>
            {isOpen && (
                <div style={{
                    position: 'fixed', bottom: '110px', right: '40px', width: '350px',
                    maxWidth: '90vw', background: 'white', borderRadius: '24px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)', zIndex: 1001,
                    padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{
                        background: 'linear-gradient(90deg, #4f8cff 60%, #00e6c3 100%)', color: 'white',
                        padding: '16px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'
                    }} onClick={() => setIsOpen(false)}>
                        <span>DBT Sahayak 🤖</span>
                        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{'×'}</span>
                    </div>

                    <div style={{ flex: 1, padding: '16px', maxHeight: '320px', overflowY: 'auto', background: '#f9f9f9' }} ref={chatboxBodyRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>{msg.text}</div>
                        ))}
                        {/* **NEW**: Typing indicator */}
                        {isTyping && <div className="chat-message bot typing-indicator"><span></span><span></span><span></span></div>}
                    </div>

                    <div style={{ padding: '8px 16px', fontSize: '0.9em', color: '#888', background: '#fafcff' }}>
                        <small>Try: "How do I check DBT status?" or "What is Aadhaar seeding?"</small>
                    </div>

                    <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#fff' }}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            style={{ width: 'calc(100% - 80px)', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '8px' }}
                        />
                        <button onClick={handleSend} style={{ width: '70px', padding: '10px 16px', borderRadius: '8px', background: '#4f8cff', color: 'white', border: 'none', fontWeight: 'bold' }}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;