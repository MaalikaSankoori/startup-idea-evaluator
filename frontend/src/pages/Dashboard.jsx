import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Trash2, Eye, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIdeas();
    }, []);

    const fetchIdeas = async () => {
        try {
            const res = await api.get('/ideas');
            setIdeas(res.data);
        } catch (err) {
            toast.error('Failed to fetch ideas');
        } finally {
            setLoading(false);
        }
    };

    const deleteIdea = async (id) => {
        if (!window.confirm('Are you sure you want to delete this idea?')) return;
        try {
            await api.delete(`/ideas/${id}`);
            setIdeas(ideas.filter((idea) => idea._id !== id));
            toast.success('Idea deleted');
        } catch (err) {
            toast.error('Failed to delete idea');
        }
    };

    const getScoreColor = (score) => {
        if (['A', 'A+', 'A-'].includes(score)) return 'text-green-600 bg-green-100';
        if (['B', 'B+', 'B-'].includes(score)) return 'text-blue-600 bg-blue-100';
        if (['C', 'C+', 'C-'].includes(score)) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Ideas</h1>
                <Link
                    to="/evaluate"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> New Idea
                </Link>
            </div>

            {ideas.length === 0 ? (
                <div className="text-center py-12 bg-card border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No ideas yet</h3>
                    <p className="text-muted-foreground mb-6">
                        Submit your first startup idea to get an AI evaluation.
                    </p>
                    <Link
                        to="/evaluate"
                        className="text-primary hover:underline font-medium"
                    >
                        Evaluate an Idea
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((idea) => (
                        <div key={idea._id} className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl truncate pr-4" title={idea.title}>
                                    {idea.title}
                                </h3>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(
                                        idea.evaluation?.overallScore
                                    )}`}
                                >
                                    {idea.evaluation?.overallScore || 'N/A'}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {idea.description}
                            </p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="text-xs text-muted-foreground">
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/result/${idea._id}`}
                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                        title="View Result"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => deleteIdea(idea._id)}
                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
