const Idea = require('../models/Idea');
const openaiService = require('../services/openaiService');

exports.createIdea = async (req, res) => {
    const { title, description, targetMarket, revenueModel } = req.body;

    try {
        // 1. Call OpenAI to evaluate
        const evaluation = await openaiService.evaluateIdea(
            title,
            description,
            targetMarket,
            revenueModel
        );

        // 2. Save to DB
        const newIdea = new Idea({
            user: req.user.id,
            title,
            description,
            targetMarket,
            revenueModel,
            evaluation,
        });

        const idea = await newIdea.save();
        res.json(idea);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(ideas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getIdeaById = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        if (!idea) return res.status(404).json({ msg: 'Idea not found' });

        // Ensure user owns the idea
        if (idea.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(idea);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Idea not found' });
        res.status(500).send('Server Error');
    }
};

exports.deleteIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({ msg: 'Idea not found' });
        }

        // Check user
        if (idea.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await idea.deleteOne();
        res.json({ msg: 'Idea removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Idea not found' });
        }
        res.status(500).send('Server Error');
    }
};
