import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EvaluationResult from '../components/EvaluationResult';
import api from '../services/api';

const Result = () => {
    const location = useLocation();
    const { id } = useParams();

    const [idea, setIdea] = useState(location.state?.idea || null);
    const [evaluation, setEvaluation] = useState(location.state?.evaluation || null);
    const [loading, setLoading] = useState(!location.state?.evaluation && !!id);

    useEffect(() => {
        const fetchIdea = async () => {
            if (!id || evaluation) return; // already have data from state
            try {
                const res = await api.get(`/ideas/${id}`);
                setIdea(res.data);
                setEvaluation(res.data.evaluation);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchIdea();
    }, [id, evaluation]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!evaluation) {
        return (
            <div className="max-w-md mx-auto text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No Result Found</h2>
                <p className="text-muted-foreground mb-8">
                    It looks like you haven&apos;t submitted an idea in this session.
                </p>
                <Link
                    to="/evaluate"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Go to Idea Input
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
            <Link
                to="/evaluate"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Idea Input
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                    {idea?.title || 'Startup Idea'}
                </h1>
                {idea?.description && (
                    <p className="text-lg text-muted-foreground">
                        {idea.description}
                    </p>
                )}
            </div>

            <EvaluationResult evaluation={evaluation} />
        </div>
    );
};

export default Result;


