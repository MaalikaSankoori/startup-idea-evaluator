import React from 'react';
import { TrendingUp, Target, Zap, ShieldAlert, Lightbulb, Code, Users, Swords, CheckCircle } from 'lucide-react';
import GradeBadge from './GradeBadge';

const EvaluationResult = ({ evaluation }) => {
    if (!evaluation) return null;

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Header Card: Verdict & Overall Score */}
            <div className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-display font-bold mb-2">Verdict: <span className="text-primary capitalize">{evaluation.verdict}</span></h2>
                    <p className="text-muted-foreground max-w-md">
                        {evaluation.revenueViability}
                    </p>
                </div>

                <div className="flex flex-col items-center relative z-10">
                    <GradeBadge grade={evaluation.overallScore} />
                    <span className="mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Overall Score</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">Market Potential</span>
                    </div>
                    <div className="text-3xl font-display font-bold mb-1">{evaluation.marketPotential}<span className="text-lg text-muted-foreground">/10</span></div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${evaluation.marketPotential * 10}%` }}></div>
                    </div>
                </div>

                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Target className="w-5 h-5" />
                        <span className="font-bold">Problem Clarity</span>
                    </div>
                    <div className="text-3xl font-display font-bold mb-1">{evaluation.problemClarity}<span className="text-lg text-muted-foreground">/10</span></div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${evaluation.problemClarity * 10}%` }}></div>
                    </div>
                </div>

                <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-violet-400">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold">Differentiation</span>
                    </div>
                    <div className="text-3xl font-display font-bold mb-1">{evaluation.differentiation}<span className="text-lg text-muted-foreground">/10</span></div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 transition-all duration-1000" style={{ width: `${evaluation.differentiation * 10}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Narrative Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-200">
                        <Code className="w-5 h-5 text-blue-400" /> Technical Feasibility
                    </h3>
                    <p className="text-muted-foreground">{evaluation.technicalFeasibility}</p>
                </div>
                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-200">
                        <Users className="w-5 h-5 text-pink-400" /> Ideal Customer Profile
                    </h3>
                    <p className="text-muted-foreground">{evaluation.idealCustomerProfile}</p>
                </div>
            </div>

            {/* Risks & Competition */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-amber-400">
                        <ShieldAlert className="w-5 h-5" /> Biggest Risks
                    </h3>
                    {evaluation.biggestRisks && evaluation.biggestRisks.length > 0 ? (
                        <ul className="space-y-3">
                            {evaluation.biggestRisks.map((risk, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300">
                                    <span className="text-amber-500/50 mt-1">•</span>
                                    {risk}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No specific risks identified. Treat this as a signal to do more customer interviews.
                        </p>
                    )}
                </div>

                <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-orange-400">
                        <Swords className="w-5 h-5" /> Competition Risks
                    </h3>
                    {evaluation.competitionRisks && evaluation.competitionRisks.length > 0 ? (
                        <ul className="space-y-3">
                            {evaluation.competitionRisks.map((risk, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300">
                                    <span className="text-orange-500/50 mt-1">•</span>
                                    {risk}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No direct competition identified, but watch out for indirect substitutes.
                        </p>
                    )}
                </div>
            </div>

            {/* Suggestions */}
            <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-cyan-400">
                    <Lightbulb className="w-5 h-5" /> Suggestions
                </h3>
                {evaluation.suggestions && evaluation.suggestions.length > 0 ? (
                    <ul className="grid md:grid-cols-2 gap-4">
                        {evaluation.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-300 bg-surface/30 p-3 rounded-lg">
                                <span className="text-cyan-500/50 mt-1">•</span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No specific suggestions provided. Focus on validating your core value proposition.
                    </p>
                )}
            </div>

            {/* Action Steps */}
            <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <CheckCircle className="w-5 h-5 text-primary" /> Recommended Action Steps
                </h3>
                {evaluation.actionSteps && evaluation.actionSteps.length > 0 ? (
                    <div className="grid gap-4">
                        {evaluation.actionSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4 bg-surface/50 p-4 rounded-lg hover:bg-surface transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-slate-200 pt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Start by talking to 10 potential customers about this problem.
                    </p>
                )}
            </div>
        </div>
    );
};

export default EvaluationResult;
