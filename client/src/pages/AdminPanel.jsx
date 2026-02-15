import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LayoutDashboard, BookOpen, Users, Settings, Plus, Trash2, Edit } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full pt-6">
            <div className="px-6 space-y-2">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </button>
                <button 
                    onClick={() => setActiveTab('courses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <BookOpen size={20} />
                    Manage Courses
                </button>
                <button 
                    onClick={() => setActiveTab('students')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Users size={20} />
                    Students
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Settings size={20} />
                    Settings
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8">
            <div className="max-w-6xl mx-auto">
                {activeTab === 'courses' && <CoursesManager />}
                {activeTab === 'dashboard' && <DashboardOverview />}
                {/* Add other tabs placeholders */}
            </div>
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Students</p>
                <h3 className="text-3xl font-bold text-gray-900">1,234</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Courses</p>
                <h3 className="text-3xl font-bold text-gray-900">42</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-3xl font-bold text-green-600">$12.4k</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Avg. Rating</p>
                <h3 className="text-3xl font-bold text-yellow-500">4.8</h3>
            </div>
        </div>
    </div>
);

const CoursesManager = () => {
    // Mock Data
    const courses = [
        { id: 1, title: 'Web Development Bootcamp', instructor: 'Dr. Angela Yu', students: 1200, status: 'Active' },
        { id: 2, title: 'Python for Data Science', instructor: 'Jose Portilla', students: 850, status: 'Active' },
        { id: 3, title: 'Cyber Security Essentials', instructor: 'Nathan House', students: 600, status: 'Draft' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                    <Plus size={18} /> Add New Course
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Course Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Instructor</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Students</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {courses.map(course => (
                            <tr key={course.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                                <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                                <td className="px-6 py-4 text-gray-600">{course.students}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="text-gray-400 hover:text-indigo-600 transition"><Edit size={18} /></button>
                                    <button className="text-gray-400 hover:text-red-600 transition"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
