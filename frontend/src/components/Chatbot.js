import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openHandler = () => setIsOpen(true);
        window.addEventListener('open-chatbot', openHandler);
        return () => window.removeEventListener('open-chatbot', openHandler);
    }, []);
    const [messages, setMessages] = useState([
        { text: 'Hello! I am DBT Sahayak. How can I help you understand Aadhaar and DBT today?', sender: 'bot' }
    ]);
    const [userInput, setUserInput] = useState('');
    const chatboxBodyRef = useRef(null);

    
    const faqs = [
        // ...existing topics...
        {
            keywords: ["lost aadhaar", "forgot aadhaar", "missing aadhaar", "aadhaar reissue"],
            answers: [
                "If you have lost your Aadhaar card, you can download an e-Aadhaar from the UIDAI website.",
                "Visit an Aadhaar Enrollment Center to reissue your Aadhaar card if lost.",
                "You can use your Aadhaar number or enrollment ID to retrieve your details online.",
                "Keep your Aadhaar details safe and do not share them with unknown sources."
            ]
        },
        {
            keywords: ["biometric", "fingerprint", "iris", "biometric update", "biometric issue"],
            answers: [
                "For biometric updates or issues, visit an Aadhaar Enrollment Center for assistance.",
                "Biometric failures can be resolved by updating your fingerprints or iris scan at UIDAI centers.",
                "Biometric authentication is required for some DBT and Aadhaar services.",
                "Contact UIDAI if you face repeated biometric failures."
            ]
        },
        {
            keywords: ["farmer", "pm kisan", "agriculture", "crop", "farm"],
            answers: [
                "Farmers can receive PM Kisan and other agriculture subsidies via DBT.",
                "Check the DBT portal for farmer-specific schemes and eligibility.",
                "Crop insurance and input subsidies are often paid through DBT to seeded accounts.",
                "Contact your local agriculture office for help with DBT payments."
            ]
        },
        {
            keywords: ["women", "ujjwala", "girl", "female", "women scheme"],
            answers: [
                "Women can benefit from DBT schemes like Ujjwala for LPG subsidy and scholarships for girls.",
                "Check the DBT portal for women-specific schemes and eligibility.",
                "Many DBT schemes support women empowerment and financial inclusion.",
                "Contact your local government office for more information on women DBT schemes."
            ]
        },
        {
            keywords: ["digital literacy", "how to use", "online help", "internet", "computer"],
            answers: [
                "Digital literacy programs are available to help you use DBT portals and online banking.",
                "Ask your local community center for digital literacy workshops.",
                "Government websites often have guides and videos for using DBT and Aadhaar services online.",
                "If you need help, ask a trusted person or visit your bank branch for assistance."
            ]
        },
        {
            keywords: ["cyber safety", "fraud", "scam", "secure online", "phishing"],
            answers: [
                "Always use official websites and apps for DBT and Aadhaar services.",
                "Do not share OTPs, passwords, or Aadhaar details with anyone over phone or email.",
                "Report any suspicious activity or fraud to your bank and the authorities.",
                "Check for the lock icon and https:// in the website address for secure access."
            ]
        },
        {
            keywords: ["technical error", "site not working", "portal error", "server down", "website issue"],
            answers: [
                "If you encounter a technical error on the DBT portal, try refreshing the page or accessing it later.",
                "Website issues may be temporary. Check your internet connection and try again.",
                "If the portal is down, you can visit your bank branch for DBT-related services.",
                "Report persistent technical errors to the DBT portal support team."
            ]
        },
        {
            keywords: ["navigation", "how to use portal", "find scheme", "portal help", "menu"],
            answers: [
                "The DBT portal has a menu for schemes, status check, and grievance redressal on the homepage.",
                "Use the search bar on the DBT portal to find specific schemes or information.",
                "For help navigating the portal, refer to the user guide or FAQs section on the website.",
                "If you need assistance, contact the DBT helpline or visit your local bank branch."
            ]
        },
        {
            keywords: ["rural banking", "village bank", "gramin bank", "remote area"],
            answers: [
                "Rural and Gramin banks also support DBT and Aadhaar seeding services.",
                "Visit your nearest village bank branch for DBT queries and account updates.",
                "DBT schemes are available in remote and rural areas through local banks.",
                "Ask your Gramin bank for help with DBT payments and Aadhaar linking."
            ]
        },
        {
            keywords: ["senior citizen", "pension", "old age", "retirement"],
            answers: [
                "Senior citizens can receive pension payments via DBT directly to their seeded bank account.",
                "Check the DBT portal for pension scheme eligibility and application details.",
                "Visit your bank branch for help with pension DBT payments and account updates.",
                "Retirement benefits are often paid through DBT for convenience and security."
            ]
        },
        {
            keywords: ["student", "scholarship", "education", "college", "school"],
            answers: [
                "Students can receive scholarships and education benefits via DBT to their seeded account.",
                "Check the DBT portal for available scholarship schemes and eligibility criteria.",
                "Contact your school or college administration for help with DBT scholarship payments.",
                "Education-related DBT payments require Aadhaar seeding and an active bank account."
            ]
        },
        {
            keywords: ["update address", "change address", "address correction", "move house"],
            answers: [
                "To update your address in Aadhaar, visit an Enrollment Center with proof of new address.",
                "Address changes can be made online for Aadhaar if you have the required documents.",
                "Keep your address updated in Aadhaar for smooth DBT payments and scheme eligibility.",
                "Check the UIDAI portal for accepted address proof documents."
            ]
        },
        {
            keywords: ["nominee", "add nominee", "beneficiary", "family member"],
            answers: [
                "You can add a nominee to your bank account for DBT payments by visiting your branch.",
                "Nominee details help ensure your DBT benefits reach your chosen beneficiary.",
                "Ask your bank for the process to update or add a nominee for your account.",
                "Nominee information is important for pension and insurance DBT schemes."
            ]
        },
        {
            keywords: ["atm", "withdraw dbt", "cash withdrawal", "get money"],
            answers: [
                "You can withdraw DBT payments from any ATM using your bank debit card.",
                "Check your account balance before withdrawing DBT funds at an ATM.",
                "If you face issues withdrawing DBT money, contact your bank branch.",
                "ATMs in rural areas also support DBT payment withdrawals."
            ]
        },
        {
            keywords: ["inactive aadhaar", "aadhaar not working", "aadhaar suspended", "aadhaar blocked"],
            answers: [
                "If your Aadhaar is inactive or suspended, visit an Enrollment Center for reactivation.",
                "Aadhaar may be blocked due to incorrect information or misuse. Contact UIDAI for help.",
                "Keep your Aadhaar active for uninterrupted DBT payments and government services.",
                "Check your Aadhaar status on the UIDAI portal if you face issues."
            ]
        },
        {
            keywords: ["mobile app", "dbt app", "bank app", "use app"],
            answers: [
                "Many banks offer Aadhaar seeding and DBT status checking through their mobile apps.",
                "You can download your bank's official app to manage Aadhaar linking and DBT payments.",
                "Check the app store for your bank's app and look for DBT or Aadhaar services in the menu.",
                "Mobile apps often provide instant updates on your DBT payment status."
            ]
        },
        {
            keywords: ["language", "hindi", "english", "regional", "other language"],
            answers: [
                "The DBT portal and many bank apps support multiple languages including Hindi and English.",
                "You can change the language preference on the DBT portal for easier navigation.",
                "Regional language support is available for many government schemes and portals.",
                "If you need help in your local language, ask your bank branch for assistance."
            ]
        },
        {
            keywords: ["scheme", "pm kisan", "scholarship", "ujjwala", "pension", "subsidy"],
            answers: [
                "PM Kisan, scholarships, Ujjwala, and pensions are some popular DBT schemes in India.",
                "Each DBT scheme has its own eligibility and application process. Check the DBT portal for details.",
                "Subsidies for LPG, education, and farming are often paid via DBT to your seeded account.",
                "You can track scheme-specific payments on the DBT portal or with your bank."
            ]
        },
        {
            keywords: ["pending", "under process", "delay", "not received yet", "waiting"],
            answers: [
                "If your DBT payment is pending, check your bank account status and Aadhaar seeding.",
                "Delays can happen due to bank holidays or technical issues. Wait a few days and check again.",
                "Contact your bank or scheme authority if your payment is under process for a long time.",
                "Pending payments may be due to incomplete documentation or verification."
            ]
        },
        {
            keywords: ["rejected", "dbt rejected", "aadhaar rejected", "application rejected"],
            answers: [
                "DBT payments can be rejected if your Aadhaar is not properly seeded or your account is inactive.",
                "Check the rejection reason on the DBT portal or with your bank.",
                "You may need to update your documents or reapply for the scheme if rejected.",
                "Contact customer support for help with rejected DBT or Aadhaar applications."
            ]
        },
        {
            keywords: ["multiple accounts", "more than one account", "change account", "switch dbt account"],
            answers: [
                "You can only have one DBT-enabled account at a time. Update your seeding if you switch accounts.",
                "Visit your preferred bank branch to set your DBT account if you have multiple accounts.",
                "Only the latest seeded account will receive DBT payments.",
                "Inform your bank if you want to change your DBT receiving account."
            ]
        },
        {
            keywords: ["inactive account", "dormant account", "closed account", "account not working"],
            answers: [
                "DBT payments will fail if your account is inactive or closed. Seed your Aadhaar with an active account.",
                "Contact your bank to reactivate your account or open a new one for DBT payments.",
                "Dormant accounts may not receive DBT benefits. Keep your account active.",
                "Update your DBT seeding if you change or close your bank account."
            ]
        },
        {
            keywords: ["update mobile", "change mobile", "mobile number", "phone number"],
            answers: [
                "To update your mobile number in Aadhaar, visit an Aadhaar Enrollment Center.",
                "Banks require your mobile number to be registered for DBT and Aadhaar services.",
                "You can check your registered mobile number status on the UIDAI portal.",
                "Keep your mobile number updated to receive DBT alerts and OTPs."
            ]
        },
        {
            keywords: ["otp", "verification code", "one time password", "secure code"],
            answers: [
                "Never share your Aadhaar OTP or bank verification code with anyone.",
                "OTP is required for secure transactions and updates in DBT and Aadhaar services.",
                "If you do not receive OTP, check your mobile number registration with UIDAI or your bank.",
                "Contact customer support if you face issues with OTP or verification codes."
            ]
        },
        {
            keywords: ["grievance", "complaint", "issue", "problem", "raise ticket"],
            answers: [
                "You can raise a grievance or complaint on the DBT portal for payment or scheme issues.",
                "Banks also have grievance redressal mechanisms for DBT and Aadhaar problems.",
                "Keep your complaint reference number for future tracking.",
                "Contact the scheme authority or helpline for urgent issues."
            ]
        },
        {
            keywords: ["dbt", "difference", "seeding"],
            answers: [
                "Aadhaar Linking is for KYC, while Aadhaar Seeding (DBT-enabled) tells the government which single account to send money to. It's your designated 'mailing address' for funds!",
                "DBT seeding means your Aadhaar is mapped to a specific bank account for direct benefit transfers. Linking is just for identity verification.",
                "Seeding your Aadhaar ensures you receive government benefits directly into your chosen bank account. Linking alone does not guarantee this.",
                "Aadhaar seeding is required for DBT payments. Without seeding, you may not get your benefits even if your Aadhaar is linked.",
                "If you want to receive DBT benefits, make sure your Aadhaar is seeded with your active bank account.",
                "Seeding is a one-time process, but you should verify it if you change your bank account."
            ]
        },
        {
            keywords: ["check status", "how to check", "dbt status", "aadhaar status", "track payment", "payment status"],
            answers: [
                "You can check your Aadhaar seeding status by dialing *99*99*1# from your Aadhaar-registered mobile number.",
                "Visit your bank branch or use your bank's app to check if your Aadhaar is seeded for DBT.",
                "Our 'DBT Health Check' wizard can guide you step-by-step to check your seeding status.",
                "You may also check your DBT status on the official portal: https://dbtbharat.gov.in.",
                "If you have not received your payment, check your DBT status online or with your bank.",
                "Tracking your DBT payment is easy using the DBT portal or your bank's customer service."
            ]
        },
        {
            keywords: ["scholarship failed", "money not received", "payment failed", "dbt failed", "not credited", "transaction failed"],
            answers: [
                "A common reason for DBT payment failure is that your Aadhaar is not seeded with your bank account, or it's seeded with a different/inactive account.",
                "If your scholarship or DBT payment failed, check if your Aadhaar is correctly seeded and your account is active.",
                "Sometimes payments fail if your bank account is closed or not DBT-enabled. Please verify with your bank.",
                "Contact your bank for details if you haven't received your DBT payment despite seeding.",
                "If your transaction failed, confirm your account status and Aadhaar seeding with your bank.",
                "You may need to update your account details or re-seed your Aadhaar if payments are not credited."
            ]
        },
        {
            keywords: ["how to seed", "form", "aadhaar seeding", "consent form", "seed online", "bank branch"],
            answers: [
                "To seed your Aadhaar, visit your bank branch and fill out an Aadhaar Seeding Consent Form.",
                "Some banks allow Aadhaar seeding through their mobile or internet banking apps.",
                "You can also check with your bank if they offer online Aadhaar seeding options.",
                "Bring your Aadhaar card and bank passbook to the branch for seeding.",
                "Ask your bank about digital Aadhaar seeding if you cannot visit the branch.",
                "Seeding is usually free and takes a few days to process."
            ]
        },
        {
            keywords: ["dbt portal", "dbt website", "dbt login", "government schemes", "apply dbt"],
            answers: [
                "The DBT portal is the official government website for Direct Benefit Transfer schemes: https://dbtbharat.gov.in.",
                "You can access scheme info, check status, and more at the DBT portal.",
                "Log in to the DBT portal to view your benefit status and scheme eligibility.",
                "The DBT portal provides updates on government schemes and payment tracking.",
                "You can apply for various government schemes through the DBT portal.",
                "Use the DBT portal to check eligibility, payment history, and scheme details."
            ]
        },
        {
            keywords: ["aadhar", "aadhaar", "what is aadhaar", "uidai", "identity proof"],
            answers: [
                "Aadhaar is a unique 12-digit identity number issued by UIDAI to residents of India.",
                "Your Aadhaar number is used for KYC and DBT purposes.",
                "Aadhaar helps you access government benefits and services securely.",
                "It's important to keep your Aadhaar details up to date for DBT and other services.",
                "Aadhaar is accepted as identity proof for many services in India.",
                "You can download your e-Aadhaar from the UIDAI website."
            ]
        },
        {
            keywords: ["update aadhaar", "change aadhaar", "update details", "correction", "edit aadhaar"],
            answers: [
                "To update your Aadhaar details, visit an Aadhaar Enrollment Center.",
                "You can use the UIDAI website for certain updates like address or mobile number.",
                "Carry original documents for verification when updating Aadhaar details.",
                "Check the UIDAI portal for the list of supported updates and required documents.",
                "Aadhaar corrections may take a few days to reflect in the system.",
                "You can track your update request status on the UIDAI portal."
            ]
        },
        {
            keywords: ["link aadhaar", "aadhaar linking", "link bank", "link account", "link subsidy"],
            answers: [
                "To link Aadhaar to your bank account, visit your branch or use your bank's mobile/internet banking.",
                "Some banks offer Aadhaar linking via SMS or ATM as well.",
                "Ensure your mobile number is registered with your bank for easy Aadhaar linking.",
                "Linking Aadhaar helps you receive government benefits and subsidies.",
                "You can check your linking status with your bank's customer service.",
                "Linking is required for many government subsidies and schemes."
            ]
        },
        {
            keywords: ["hello", "hi", "hey", "greetings"],
            answers: [
                "Hello! Ask me about DBT, Aadhaar seeding, or how to check your status.",
                "Hi there! How can I assist you with DBT or Aadhaar today?",
                "Greetings! Feel free to ask about DBT, Aadhaar, or seeding.",
                "Namaste! I'm here to help with your DBT and Aadhaar queries.",
                "Hey! What would you like to know about DBT or Aadhaar?",
                "Welcome! Ask me anything about DBT, Aadhaar, or seeding."
            ]
        },
        {
            keywords: ["thank you", "thanks", "thx", "appreciate"],
            answers: [
                "You're welcome! Feel free to ask more questions.",
                "Glad I could help! Let me know if you have more queries.",
                "Anytime! Reach out if you need more information.",
                "Happy to assist! Ask me anything about DBT or Aadhaar.",
                "Thank you for your kind words!",
                "I'm here whenever you need help with DBT or Aadhaar."
            ]
        },
        
        {
            keywords: ["eligibility", "who can apply", "eligible for dbt", "dbt scheme"],
            answers: [
                "Eligibility for DBT schemes depends on the specific program. Check the DBT portal for details.",
                "Most DBT schemes require Aadhaar seeding and a valid bank account.",
                "You can find eligibility criteria for each scheme on https://dbtbharat.gov.in.",
                "Students, farmers, and other groups may be eligible for different DBT schemes."
            ]
        },
        {
            keywords: ["privacy", "secure", "data safety", "aadhaar privacy"],
            answers: [
                "Your Aadhaar data is protected by law and handled securely by UIDAI.",
                "Never share your Aadhaar OTP or personal details with unknown sources.",
                "Banks and government portals use secure channels for Aadhaar and DBT transactions.",
                "You can read about Aadhaar privacy and security on the UIDAI website."
            ]
        },
        {
            keywords: ["documents required", "what documents", "proof needed", "aadhaar documents"],
            answers: [
                "For Aadhaar updates, carry original documents like proof of address or identity.",
                "Banks may ask for your Aadhaar card and passbook for seeding.",
                "Check the UIDAI portal for the list of accepted documents for Aadhaar services.",
                "For DBT schemes, you may need proof of eligibility such as income certificate or caste certificate."
            ]
        },
        {
            keywords: ["change bank", "switch account", "update bank", "new account"],
            answers: [
                "If you change your bank account, re-seed your Aadhaar with the new account for DBT payments.",
                "Visit your new bank branch and submit a fresh Aadhaar Seeding Consent Form.",
                "You can only have one DBT-enabled account at a time. Update it if you switch banks.",
                "Ask your bank for help if you need to update your DBT account details."
            ]
        },
        {
            keywords: ["dbt helpline", "contact support", "customer care", "help number"],
            answers: [
                "You can contact the DBT helpline at 1800-11-0001 for assistance.",
                "Banks also have customer care numbers for DBT and Aadhaar queries.",
                "Visit the DBT portal for support and grievance redressal options.",
                "For urgent help, reach out to your bank's branch manager or DBT officer."
            ]
        },
        {
            keywords: ["dbt health check", "wizard", "portal tool"],
            answers: [
                "The DBT Health Check wizard helps you verify your Aadhaar seeding and DBT status step-by-step.",
                "Use the DBT Health Check tool on our portal to troubleshoot payment issues.",
                "The wizard guides you through checking your eligibility, seeding, and payment status.",
                "If you face issues, the DBT Health Check wizard can help you resolve them quickly."
            ]
        },
    ];

    const getBotResponse = (input) => {
        const text = input.toLowerCase().trim();
        for (let faq of faqs) {
            if (faq.keywords.some(keyword => text.includes(keyword))) {
                // Pick a random answer from the array
                const answers = faq.answers;
                return answers[Math.floor(Math.random() * answers.length)];
            }
        }
        return "I'm sorry, I don't understand. Try asking about DBT, Aadhaar, or seeding. Example: 'How do I check DBT status?'";
    };

    const handleSend = () => {
        if (userInput.trim() === '') return;

        const userMessage = { text: userInput, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        
        const botResponse = getBotResponse(userInput);
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
        }, 500);

        setUserInput('');
    };

    useEffect(() => {
        if (chatboxBodyRef.current) {
            chatboxBodyRef.current.scrollTop = chatboxBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '110px',
                        right: '40px',
                        width: '350px',
                        maxWidth: '90vw',
                        background: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        zIndex: 1001,
                        padding: '0',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(90deg, #4f8cff 60%, #00e6c3 100%)',
                        color: 'white',
                        padding: '16px',
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        cursor: 'pointer'
                    }} onClick={() => setIsOpen(false)}>
                        <span>DBT Sahayak 🤖</span>
                        <span style={{ fontSize: '1.5rem', marginLeft: '8px' }}>{'×'}</span>
                    </div>
                    <div style={{ padding: '16px', maxHeight: '320px', overflowY: 'auto' }} ref={chatboxBodyRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>{msg.text}</div>
                        ))}
                    </div>
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#fafcff' }}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question about DBT, Aadhaar, or seeding..."
                            style={{ width: '70%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '8px' }}
                        />
                        <button onClick={handleSend} style={{ padding: '8px 16px', borderRadius: '8px', background: '#4f8cff', color: 'white', border: 'none', fontWeight: 'bold' }}>Send</button>
                    </div>
                    <div style={{ padding: '8px 16px', fontSize: '0.9em', color: '#888', background: '#fafcff' }}>
                        <small>Try: "How do I check DBT status?" or "What is Aadhaar seeding?"</small>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;