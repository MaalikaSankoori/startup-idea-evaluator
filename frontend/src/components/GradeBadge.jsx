import React from 'react';

const GradeBadge = ({ grade }) => {
    const getColors = (g) => {
        const score = g?.charAt(0).toUpperCase();
        switch (score) {
            case 'A': return 'from-emerald-400 to-emerald-600 shadow-emerald-500/50';
            case 'B': return 'from-blue-400 to-blue-600 shadow-blue-500/50';
            case 'C': return 'from-amber-400 to-amber-600 shadow-amber-500/50';
            case 'D': return 'from-orange-400 to-orange-600 shadow-orange-500/50';
            case 'F': return 'from-red-400 to-red-600 shadow-red-500/50';
            default: return 'from-slate-400 to-slate-600 shadow-slate-500/50';
        }
    };

    return (
        <div className="relative group animate-pop">
            <div className={`absolute inset-0 bg-gradient-to-br ${getColors(grade)} rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${getColors(grade)} flex items-center justify-center shadow-lg border-4 border-white/10`}>
                <span className="text-4xl font-display font-bold text-white drop-shadow-md">
                    {grade || '?'}
                </span>
            </div>
        </div>
    );
};

export default GradeBadge;
