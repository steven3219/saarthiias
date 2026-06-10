import { useState } from 'react';

export default function UPSCAnalyzer() {
  const [formData, setFormData] = useState({ hours: '', tests: '', optional: '', stage: 'Beginner' });
  const [score, setScore] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    // Deterministic formulation mimicking custom criteria evaluation logic
    let calculatedScore = Math.min(100, (parseInt(formData.hours || 0) * 5) + (parseInt(formData.tests || 0) * 2));
    if (formData.stage === 'Advanced') calculatedScore += 20;
    if (formData.stage === 'Intermediate') calculatedScore += 10;
    setScore(Math.min(100, calculatedScore));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">UPSC Readiness Analyzer</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Evaluate your current preparation level instantly</p>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Study Hours</label>
            <input type="number" required className="w-full border p-2 rounded-lg" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mock Tests Attempted</label>
            <input type="number" required className="w-full border p-2 rounded-lg" value={formData.tests} onChange={e => setFormData({...formData, tests: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Optional Subject</label>
            <input type="text" required placeholder="e.g. Sociology, History" className="w-full border p-2 rounded-lg" value={formData.optional} onChange={e => setFormData({...formData, optional: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Preparation Stage</label>
            <select className="w-full border p-2 rounded-lg" value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition shadow-md">Analyze Readiness</button>
        </form>

        {score !== null && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center animate-fade-in">
            <h3 className="text-lg font-semibold text-indigo-900">Your Readiness Score</h3>
            <div className="text-4xl font-extrabold text-indigo-600 my-2">{score}%</div>
            {/* Visual Indicator Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-3">
              <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${score}%` }}></div>
            </div>
            <p className="text-xs text-gray-600">
              {score > 75 ? "Excellent momentum. Keep up consistency in answer writing." : score > 45 ? "Good progress. Increase focus on mock test diagnostics." : "Focus closely on fundamental dynamic areas."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}