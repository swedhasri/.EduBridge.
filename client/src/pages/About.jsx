import React, { useEffect, useState, useContext, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { User, Clock, TrendingUp, BarChart, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RBarChart, Bar } from 'recharts';

const About = () => {
  const { user } = useContext(AuthContext);
  const [progressItems, setProgressItems] = useState([]);
  const [dailyHistory, setDailyHistory] = useState([]);
  const [autoMode, setAutoMode] = useState(false);
  const autoTimer = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      setProgressItems(JSON.parse(saved));
    } else {
      const defaults = [
        { id: '1', title: 'Complete Web Development Bootcamp', progress: 35, hours: 18 },
        { id: '2', title: 'Python for Data Science and Machine Learning', progress: 60, hours: 24 },
        { id: '3', title: 'The Complete Cyber Security Course', progress: 20, hours: 8 },
      ];
      setProgressItems(defaults);
      localStorage.setItem('userProgress', JSON.stringify(defaults));
    }
  }, []);

  const updateProgress = (id, value) => {
    const next = progressItems.map(p => (p.id === id ? { ...p, progress: Number(value) } : p));
    setProgressItems(next);
    localStorage.setItem('userProgress', JSON.stringify(next));
    const total = next.length;
    const avg = total ? Math.round(next.reduce((a, b) => a + b.progress, 0) / total) : 0;
    const key = new Date().toISOString().split('T')[0];
    setDailyHistory(prev => {
      const existing = prev.length ? [...prev] : [];
      const idx = existing.findIndex(d => d.date === key);
      if (idx >= 0) {
        existing[idx] = { ...existing[idx], value: avg, active: true };
      } else {
        existing.push({ date: key, value: avg, active: true });
      }
      const limited = existing.slice(-30);
      localStorage.setItem('progressHistory', JSON.stringify(limited));
      return limited;
    });
  };

  const totalCourses = progressItems.length;
  const avgProgress = totalCourses ? Math.round(progressItems.reduce((a, b) => a + b.progress, 0) / totalCourses) : 0;
  const totalHours = progressItems.reduce((a, b) => a + (b.hours || 0), 0);
  const completed = progressItems.filter(p => p.progress >= 90).length;
  useEffect(() => {
    const savedHistory = localStorage.getItem('progressHistory');
    if (savedHistory) {
      setDailyHistory(JSON.parse(savedHistory));
    } else {
      const days = 14;
      const today = new Date();
      const defaults = Array.from({ length: days }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (days - 1 - i));
        const key = d.toISOString().split('T')[0];
        return { date: key, value: 0, active: false };
      });
      setDailyHistory(defaults);
      localStorage.setItem('progressHistory', JSON.stringify(defaults));
    }
  }, []);
  const history14 = dailyHistory.slice(-14);
  const progressSeries = history14.map(d => ({ name: d.date.slice(5), value: d.value }));
  const consistencySeries = history14.map(d => ({ name: d.date.slice(5), active: d.active ? 1 : 0 }));
  const streak = (() => {
    let s = 0;
    for (let i = dailyHistory.length - 1; i >= 0; i--) {
      if (dailyHistory[i].active) s += 1; else break;
    }
    return s;
  })();
  const startAuto = () => {
    if (autoTimer.current) return;
    setAutoMode(true);
    localStorage.setItem('autoProgressEnabled', '1');
    autoTimer.current = setInterval(() => {
      setProgressItems(prev => {
        if (!prev.length) return prev;
        const candidates = prev.filter(p => p.progress < 100);
        const targetId = candidates.length ? candidates[0].id : prev[Math.floor(Math.random() * prev.length)].id;
        const inc = Math.floor(Math.random() * 3) + 1;
        const next = prev.map(p => (p.id === targetId ? { ...p, progress: Math.min(100, p.progress + inc) } : p));
        localStorage.setItem('userProgress', JSON.stringify(next));
        const total = next.length;
        const avg = total ? Math.round(next.reduce((a, b) => a + b.progress, 0) / total) : 0;
        const key = new Date().toISOString().split('T')[0];
        setDailyHistory(prevH => {
          const existing = prevH.length ? [...prevH] : [];
          const idx = existing.findIndex(d => d.date === key);
          if (idx >= 0) {
            existing[idx] = { ...existing[idx], value: avg, active: true };
          } else {
            existing.push({ date: key, value: avg, active: true });
          }
          const limited = existing.slice(-30);
          localStorage.setItem('progressHistory', JSON.stringify(limited));
          return limited;
        });
        return next;
      });
    }, 15000);
  };
  const stopAuto = () => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
    setAutoMode(false);
    localStorage.setItem('autoProgressEnabled', '0');
  };
  useEffect(() => {
    const enabled = localStorage.getItem('autoProgressEnabled') === '1';
    if (enabled) startAuto();
    return () => {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
        autoTimer.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
          <p className="text-gray-600">View profile, learning stats, and course progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                  {(user?.name || 'User').charAt(0)}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <User size={18} className="text-indigo-600" />
                    <span>{user?.name || 'Guest'}</span>
                  </div>
                  <div className="text-gray-600">{user?.email || 'Not logged in'}</div>
                  <div className="text-xs text-gray-500">Role: {user?.role || 'student'}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">My Progress</h2>
                <button
                  onClick={autoMode ? stopAuto : startAuto}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    autoMode ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {autoMode ? 'Auto: On' : 'Auto: Off'}
                </button>
              </div>
              <div className="space-y-6">
                {progressItems.map(item => (
                  <div key={item.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.hours || 0}h</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-indigo-600 h-3 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp size={16} className="text-indigo-600" />
                        <span>{item.progress}% complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.progress}
                          onChange={(e) => updateProgress(item.id, e.target.value)}
                          className="w-40"
                        />
                        <span className="text-sm text-gray-700">{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Progress</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressSeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BarChart size={16} className="text-indigo-600" />
                    <span>Courses tracked</span>
                  </div>
                  <div className="font-bold">{totalCourses}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={16} className="text-indigo-600" />
                    <span>Total hours</span>
                  </div>
                  <div className="font-bold">{totalHours}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp size={16} className="text-indigo-600" />
                    <span>Average progress</span>
                  </div>
                  <div className="font-bold">{avgProgress}%</div>
                </div>
                {/* Removed 'Completed courses' row with award icon per request */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp size={16} className="text-indigo-600" />
                    <span>Consistency streak</span>
                  </div>
                  <div className="font-bold">{streak}d</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>Completed first EDA report</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <CheckCircle size={18} />
                  <span>Reached 50% in DS/ML course</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Consistency</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RBarChart data={consistencySeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 1]} tickFormatter={(v) => (v ? 'On' : 'Off')} />
                    <Tooltip />
                    <Bar dataKey="active" fill="#22c55e" />
                  </RBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
