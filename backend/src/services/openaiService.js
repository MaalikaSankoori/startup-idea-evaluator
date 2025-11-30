const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Evaluates a startup idea using Google's Gemini model.
 * Returns a structured JSON object with detailed analysis.
 */
exports.evaluateIdea = async (title, description, targetMarket, revenueModel) => {
    // 1. Construct a detailed prompt to force structured, critical thinking.
    const prompt = `
You are a brutally honest, expert startup consultant and venture capitalist. 
Your goal is to evaluate the following startup idea realistically. 
Do not be overly polite. Identify fatal flaws if they exist.

Startup Idea:
Title: ${title}
Description: ${description}
Target Market: ${targetMarket}
Revenue Model: ${revenueModel}

Output strictly valid JSON (no markdown formatting, no extra text) matching this schema:
{
  "marketPotential": number, // 0-10 rating. 1 = tiny/shrinking, 10 = massive/exploding.
  "problemClarity": number, // 0-10 rating.
  "differentiation": number, // 0-10 rating.
  "competitionRisks": ["string"], // Array of specific competitive threats.
  "revenueViability": "string", // 1-2 sentence realistic assessment.
  "technicalFeasibility": "string", // 1-2 sentence assessment.
  "idealCustomerProfile": "string", // 2-3 sentences describing the perfect early adopter.
  "actionSteps": ["string"], // At least 3 short, concrete, actionable next steps.
  "biggestRisks": ["string"], // 3-5 critical failure points.
  "suggestions": ["string"], // 3-5 actionable ways to pivot or strengthen.
  "overallScore": "string", // "A", "B", "C", "D", or "F".
  "verdict": "string" // "promising", "needs validation", or "risky / unlikely to work".
}

CRITICAL GRADING RULES:
1. Penalize generic ideas. If the target market is "everyone" or it's a generic social network/chat app/clone without a strong niche, "marketPotential" should rarely be above 5.
2. If "differentiation" is weak, the score must be low (2-4).
3. "overallScore" should normally be 'C', 'D', or 'F' for average ideas. 'A' is reserved for truly exceptional, unique, and viable ideas.
4. "actionSteps", "biggestRisks", and "suggestions" MUST contain specific, concrete items, not generic advice.

`;

    // 2. Handle missing API key gracefully (Fallback for local dev/testing)
    if (!GEMINI_API_KEY) {
        console.warn('Missing GEMINI_API_KEY, using mock response');
        return {
            marketPotential: 5,
            problemClarity: 5,
            differentiation: 5,
            competitionRisks: ['Cannot evaluate without API key'],
            revenueViability: 'Unknown (fallback response)',
            technicalFeasibility: 'Unknown (fallback response)',
            idealCustomerProfile: 'Developers who need to set up their .env file',
            actionSteps: [
                'Configure GEMINI_API_KEY in backend/.env',
                'Restart the backend server',
                'Try evaluating the idea again'
            ],
            biggestRisks: ['App will not function correctly'],
            suggestions: ['Configure a valid API key'],
            overallScore: 'C',
            verdict: 'needs validation'
        };
    }

    try {
        // 3. Call Gemini API (gemini-2.0-flash)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await axios.post(url, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        // 4. Robustly extract text from the response
        let text = '';
        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            text = response.data.candidates[0].content.parts[0].text;
        }
        console.log('Gemini raw text:', text);

        // 5. Parse JSON with fallback for markdown code blocks
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        let jsonString = '{}';

        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            jsonString = text.slice(firstBrace, lastBrace + 1);
        }

        let result = {};
        try {
            result = JSON.parse(jsonString);
        } catch (e) {
            console.error('JSON parse error, raw text:', text);
            throw new Error('Failed to parse AI response');
        }

        // 6. Validate, Clamp, and Apply Strict Logic

        // Helper to clamp numbers between 0 and 10
        const clamp = (num) => Math.max(0, Math.min(10, Number(num) || 0));

        result.marketPotential = clamp(result.marketPotential);
        result.problemClarity = clamp(result.problemClarity);
        result.differentiation = clamp(result.differentiation);

        // Calculate Average Score
        const overallNumeric = (result.marketPotential + result.problemClarity + result.differentiation) / 3;

        // Map to Letter Grade
        if (overallNumeric >= 8.0) result.overallScore = 'A';
        else if (overallNumeric >= 6.0) result.overallScore = 'B';
        else if (overallNumeric >= 4.0) result.overallScore = 'C';
        else if (overallNumeric >= 2.0) result.overallScore = 'D';
        else result.overallScore = 'F';

        // Ensure arrays are arrays of strings
        const ensureArray = (arr) => Array.isArray(arr) ? arr.map(String) : [];

        result.competitionRisks = ensureArray(result.competitionRisks);
        result.biggestRisks = ensureArray(result.biggestRisks);
        result.suggestions = ensureArray(result.suggestions);
        result.actionSteps = ensureArray(result.actionSteps);

        // Pad actionSteps if fewer than 3
        if (result.actionSteps.length < 3) {
            const defaults = [
                'Conduct 10 customer interviews to validate the problem.',
                'Create a simple landing page to test interest.',
                'Research direct competitors and their pricing.'
            ];
            for (let i = 0; i < 3 - result.actionSteps.length; i++) {
                result.actionSteps.push(defaults[i]);
            }
        }

        // Ensure strings are strings
        result.revenueViability = String(result.revenueViability || 'Analysis unavailable');
        result.technicalFeasibility = String(result.technicalFeasibility || 'Analysis unavailable');
        result.idealCustomerProfile = String(result.idealCustomerProfile || 'Not specified');
        result.verdict = String(result.verdict || 'needs validation');

        console.log('Final evaluation result:', result);
        return result;

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);

        // 7. Return safe fallback on API failure
        return {
            marketPotential: 0,
            problemClarity: 0,
            differentiation: 0,
            competitionRisks: ['API Connection Failed'],
            revenueViability: 'Unknown',
            technicalFeasibility: 'Unknown',
            idealCustomerProfile: 'Unknown',
            actionSteps: ['Check internet connection', 'Verify API key', 'Retry later'],
            biggestRisks: ['Backend connectivity issue'],
            suggestions: ['Check server logs'],
            overallScore: 'N/A',
            verdict: 'error'
        };
    }
};
