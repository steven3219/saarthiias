import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0, totalMentors: 0, totalEvaluators: 0,
    activeStudents: 0, pendingEvaluations: 0, completedEvaluations: 0
  });

  useEffect(() => {
    // Fetch stats from backend API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(res => { if (res.success) setStats(res.data); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Admin Intelligence Portal</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
      </header>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">{val}</p>
          </div>
        ))}
      </div>

      {/* Visualizations Placeholder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm h-64 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Student Performance Distribution</h3>
          <div className="bg-gray-100 h-44 rounded-lg flex items-center justify-center text-gray-400">[Chart Library Target]</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-64 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Task Completion Trend</h3>
          <div className="bg-gray-100 h-44 rounded-lg flex items-center justify-center text-gray-400">[Chart Library Target]</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-64 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Evaluation Score Trend</h3>
          <div className="bg-gray-100 h-44 rounded-lg flex items-center justify-center text-gray-400">[Chart Library Target]</div>
        </div>
      </div>
    </div>
  );
}