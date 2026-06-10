
//3. AI Service Implementation (backend/services/aiService.js)
// Fulfills Module 7 using the Gemini API option to compile historical student profiles into strategic study pathways.

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateWeeklyStudyPlan = async (studentMetrics, weaknesses) => {
  const prompt = `
    As an expert UPSC Mentor, generate a personalized weekly study plan for a student with the following details:
    - Average Score: ${studentMetrics.averageScore}/100
    - Completed Tasks: ${studentMetrics.completedTasks}
    - Missed Deadlines: ${studentMetrics.missedDeadlines}
    - Core Areas of Weakness: ${weaknesses}
    
    Provide the output strictly in valid JSON formatting matching this exact structure:
    {
      "focusAreas": ["area1", "area2"],
      "suggestedStudyHours": 45,
      "answerWritingTargets": "Target description here",
      "revisionStrategy": "Revision plan description"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini AI Processing Error: ", error);
    throw new Error("Failed to generate AI Coach insights");
  }
};

module.exports = { generateWeeklyStudyPlan };