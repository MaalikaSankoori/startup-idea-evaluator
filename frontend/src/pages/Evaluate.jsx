import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';

const Evaluate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetMarket: '',
        revenueModel: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { title, description, targetMarket, revenueModel } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/ideas', formData);

            // res.data is the saved idea document
            // res.data.evaluation is the full evaluation object from backend
            navigate('/result', {
                state: {
                    evaluation: res.data.evaluation,
                    idea: {
                        title: res.data.title,
                        description: res.data.description,
                        targetMarket: res.data.targetMarket,
                        revenueModel: res.data.revenueModel,
                    },
                },
            });

            toast.success('Analysis complete!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to evaluate idea');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Validate your next <span className="text-primary">big idea</span>.
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Get instant, brutal, and structured feedback from our AI venture capitalist.
                </p>
            </div>

            <div className="glass-card rounded-2xl p-8 animate-slide-up">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                            Startup Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                            placeholder="e.g., Uber for Dog Walking"
                            className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                            Elevator Pitch
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            required
                            rows="5"
                            placeholder="Describe the problem, solution, and how it works..."
                            className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">
                                Target Market
                            </label>
                            <input
                                type="text"
                                name="targetMarket"
                                value={targetMarket}
                                onChange={onChange}
                                required
                                placeholder="Who is this for?"
                                className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">
                                Revenue Model
                            </label>
                            <input
                                type="text"
                                name="revenueModel"
                                value={revenueModel}
                                onChange={onChange}
                                required
                                placeholder="How will you make money?"
                                className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                                Evaluate Idea
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Evaluate;
