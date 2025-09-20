const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizScore: { type: Number, default: 0 },
    certificateIssued: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    progress: {
        isQuizCompleted: { type: Boolean, default: false },
        hasCheckedDBTStatus: { type: Boolean, default: false },
        hasGeneratedForm: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('User', UserSchema);