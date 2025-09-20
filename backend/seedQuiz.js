const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

dotenv.config();

const questions = [
    // Original 4 Questions
    {
        question: "What is the main purpose of Aadhaar Seeding for DBT?",
        options: ["For KYC only", "To link one specific account for government funds", "To link multiple accounts", "To open a new account"],
        correctAnswer: "To link one specific account for government funds"
    },
    {
        question: "Which of these is the official USSD code to check your Aadhaar Seeding status?",
        options: ["*123#", "*99*99*1#", "*111#", "*444#"],
        correctAnswer: "*99*99*1#"
    },
    {
        question: "Can you have multiple bank accounts seeded with your Aadhaar for receiving DBT?",
        options: ["Yes, up to three accounts", "Yes, any number of accounts", "No, only one account can be seeded at a time", "Only if they are in the same bank"],
        correctAnswer: "No, only one account can be seeded at a time"
    },
    {
        question: "What document is typically required by the bank to seed your Aadhaar?",
        options: ["A hand-written letter", "The Aadhaar Seeding Consent Form", "Your electricity bill", "Your PAN card"],
        correctAnswer: "The Aadhaar Seeding Consent Form"
    },
    // --- 10 NEW QUESTIONS START HERE ---
    {
        question: "What does NPCI stand for in the context of DBT?",
        options: ["National Pension Corporation of India", "National Payments Corporation of India", "New Payments Council of India", "National Peoples Corporation of India"],
        correctAnswer: "National Payments Corporation of India"
    },
    {
        question: "True or False: You need to pay a fee at the bank to get your Aadhaar seeded.",
        options: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "What is the primary benefit of DBT for the government?",
        options: ["It increases bank profits", "It reduces corruption and ensures subsidies reach the right people", "It makes tax collection easier", "It is used for census data"],
        correctAnswer: "It reduces corruption and ensures subsidies reach the right people"
    },
    {
        question: "If you change your primary bank account, what should you do for your DBT payments?",
        options: ["Nothing, it updates automatically", "Close the old account", "Submit a new Aadhaar Seeding Consent Form at the new bank", "Inform the scholarship provider only"],
        correctAnswer: "Submit a new Aadhaar Seeding Consent Form at the new bank"
    },
    {
        question: "Why is it important to keep your mobile number updated with Aadhaar?",
        options: ["For receiving marketing calls", "For receiving One Time Passwords (OTPs) for authentication", "It is not important", "To link it with social media"],
        correctAnswer: "For receiving One Time Passwords (OTPs) for authentication"
    },
    {
        question: "An Aadhaar number is a unique identification number consisting of how many digits?",
        options: ["10", "16", "8", "12"],
        correctAnswer: "12"
    },
    {
        question: "True or False: Linking your PAN card to your bank account is the same as Aadhaar seeding.",
        options: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "A bank account that has not been operated for over 24 months is usually classified as:",
        options: ["Active", "Seeded", "Dormant", "Closed"],
        correctAnswer: "Dormant"
    },
    {
        question: "Which of these is NOT a government scheme that typically uses DBT?",
        options: ["PM-KISAN", "LPG Pahal Scheme", "National Scholarship Portal", "Private company employee bonus"],
        correctAnswer: "Private company employee bonus"
    },
    {
        question: "What is the role of a 'Bank Mitra' or Business Correspondent?",
        options: ["A security guard at a bank", "An agent who provides basic banking services in remote areas", "A bank manager", "A loan recovery agent"],
        correctAnswer: "An agent who provides basic banking services in remote areas"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        await Quiz.deleteMany({});
        console.log('Existing questions cleared.');

        await Quiz.insertMany(questions);
        console.log('14 new questions have been added!');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();