const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    targetMarket: {
        type: String,
        required: true,
    },
    revenueModel: {
        type: String,
        required: true,
    },
    evaluation: {
        marketPotential: Number,
        problemClarity: Number,
        differentiation: Number,
        competitionRisks: [String],
        revenueViability: String,
        technicalFeasibility: String,
        idealCustomerProfile: String,
        actionSteps: [String],
        biggestRisks: [String],
        suggestions: [String],
        overallScore: String, // A-F grade
        verdict: String,
        rawResponse: Object, // optional full JSON from Gemini
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Idea', ideaSchema);

