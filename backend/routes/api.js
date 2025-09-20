const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

// UPDATED to fetch from the database
router.get('/quiz', async (req, res) => {
    try {
        const questions = await Quiz.find().select('-correctAnswer'); // Fetch all questions from DB
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching quiz: " + err.message });
    }
});

// UPDATED to score against the database
router.post('/submit-quiz', auth, async (req, res) => {
    const { answers } = req.body;
    try {
        const questions = await Quiz.find(); // Get questions with answers from DB
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        let score = 0;
        const results = questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = question.correctAnswer === userAnswer;
            if (isCorrect) score++;
            return {
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
                userAnswer,
                isCorrect
            };
        });

        user.quizScore = score;
        user.certificateIssued = (score === questions.length);
        user.progress.isQuizCompleted = true;
        await user.save();

        res.status(200).json({
            score,
            total: questions.length,
            results
        });
    } catch (err) {
        res.status(500).json({ message: "Error submitting quiz: " + err.message });
    }
});

// This route for the DBT check is correct
router.post('/update-dbt-check', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        user.progress.hasCheckedDBTStatus = true;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;