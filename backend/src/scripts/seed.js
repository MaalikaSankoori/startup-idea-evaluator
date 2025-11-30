const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Idea = require('../models/Idea');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '../../.env' }); // Adjust path if needed

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-evaluator');
        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Idea.deleteMany({});

        // Create Demo User
        const user = new User({
            email: 'demo@example.com',
            password: 'password123',
        });
        await user.save();
        console.log('Demo user created: demo@example.com / password123');

        // Create Demo Ideas
        const ideas = [
            {
                user: user._id,
                title: 'AI-Powered Plant Doctor',
                description: 'An app that diagnoses plant diseases from photos and suggests treatments.',
                targetMarket: 'Home gardeners, farmers',
                revenueModel: 'Freemium subscription',
                evaluation: {
                    marketPotential: 8,
                    competitionRisks: ['Existing apps like PictureThis', 'Google Lens'],
                    revenueViability: 'High potential with premium features',
                    technicalFeasibility: 'Moderate - needs good computer vision model',
                    actionSteps: ['Collect dataset of plant diseases', 'Build MVP mobile app', 'Partner with nurseries'],
                    overallScore: 'A-',
                },
            },
            {
                user: user._id,
                title: 'Uber for Dog Walking',
                description: 'On-demand dog walking service connecting owners with walkers.',
                targetMarket: 'Urban pet owners',
                revenueModel: 'Commission per walk',
                evaluation: {
                    marketPotential: 9,
                    competitionRisks: ['Rover', 'Wag'],
                    revenueViability: 'Proven model but low margins',
                    technicalFeasibility: 'Easy',
                    actionSteps: ['Recruit walkers', 'Launch in one city', 'Marketing campaign'],
                    overallScore: 'B+',
                },
            },
        ];

        await Idea.insertMany(ideas);
        console.log('Demo ideas created');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
