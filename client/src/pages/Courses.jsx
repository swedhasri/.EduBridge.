import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Star, Clock, BarChart, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Data Science', 'Cyber Security', 'Soft Skills'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        if (!Array.isArray(data)) {
          console.error('Expected array from /api/courses, got:', typeof data);
          setLoading(false);
          return;
        }
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
        // Fallback to dummy data if API fails (for development/demo purposes)
        setCourses([
          {
            _id: '1',
            title: 'Complete Web Development Bootcamp',
            description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
            instructor: 'Dr. Angela Yu',
            rating: 4.8,
            duration: 50,
            level: 'Beginner',
            thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Web Development',
            price: 49,
            syllabus: [
              { title: 'Introduction to HTML' },
              { title: 'CSS Styling' },
              { title: 'Javascript Basics' }
            ]
          },
          {
            _id: '2',
            title: 'Python for Data Science and Machine Learning',
            description: 'Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!',
            instructor: 'Jose Portilla',
            rating: 4.7,
            duration: 40,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Data Science',
            price: 59,
            syllabus: [
              { title: 'Python Crash Course' },
              { title: 'NumPy & Pandas' },
              { title: 'Data Visualization' }
            ]
          },
          {
            _id: '3',
            title: 'The Complete Cyber Security Course',
            description: 'Volume 1 : Hackers Exposed. Explains the security weaknesses in systems and how to fix them.',
            instructor: 'Nathan House',
            rating: 4.9,
            duration: 35,
            level: 'Advanced',
            thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Cyber Security',
            price: 39,
            syllabus: [
              { title: 'Intro to Cyber Security' },
              { title: 'Network Security' },
              { title: 'Malware Threats' }
            ]
          },
          {
            _id: '4',
            title: 'Mastering Soft Skills for Success',
            description: 'Learn communication, leadership, and emotional intelligence skills to boost your career.',
            instructor: 'Simon Sinek',
            rating: 4.6,
            duration: 12,
            level: 'Beginner',
            thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Soft Skills',
            price: 29,
            syllabus: [
              { title: 'Effective Communication' },
              { title: 'Leadership Principles' },
              { title: 'Time Management' }
            ]
          },
          {
            _id: '5',
            title: 'JavaScript Algorithms and Data Structures',
            description: 'Master algorithms and data structures in JavaScript with practical problems and solutions.',
            instructor: 'Colt Steele',
            rating: 4.7,
            duration: 30,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 39,
            syllabus: [
              { title: 'Time Complexity' },
              { title: 'Arrays & Linked Lists' },
              { title: 'Stacks & Queues' }
            ]
          },
          {
            _id: '6',
            title: 'React and Redux from Zero to Hero',
            description: 'Build scalable React apps with modern patterns, hooks, and Redux Toolkit.',
            instructor: 'Maximilian Schwarzmüller',
            rating: 4.8,
            duration: 28,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Web Development',
            price: 49,
            syllabus: [
              { title: 'React Fundamentals' },
              { title: 'Hooks Deep Dive' },
              { title: 'Redux Toolkit' }
            ]
          },
          {
            _id: '7',
            title: 'AI & Machine Learning A-Z',
            description: 'Create machine learning algorithms in Python. Hands-on with real-world datasets.',
            instructor: 'Kirill Eremenko',
            rating: 4.5,
            duration: 45,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1511458059420-11b1640acb8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Data Science',
            price: 69,
            syllabus: [
              { title: 'Data Preprocessing' },
              { title: 'Regression' },
              { title: 'Classification' }
            ]
          },
          {
            _id: '8',
            title: 'DevOps Fundamentals',
            description: 'Learn CI/CD, Docker, Kubernetes, and cloud deployment best practices.',
            instructor: 'Tech World',
            rating: 4.6,
            duration: 22,
            level: 'Beginner',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 39,
            syllabus: [
              { title: 'Docker Basics' },
              { title: 'Kubernetes Intro' },
              { title: 'CI/CD Pipelines' }
            ]
          },
          {
            _id: '9',
            title: 'Advanced Node.js and Microservices',
            description: 'Design, build, and deploy microservices with Node.js and message queues.',
            instructor: 'Stephen Grider',
            rating: 4.7,
            duration: 32,
            level: 'Advanced',
            thumbnailUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 59,
            syllabus: [
              { title: 'Service Design' },
              { title: 'Queues & Events' },
              { title: 'Deployment' }
            ]
          }
        ]);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Courses</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover a wide range of courses designed to help you master new skills and advance your career.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <motion.div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-100 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/courses/${course._id}/play`} className="relative h-48 overflow-hidden group">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 chip bg-white/90 backdrop-blur-sm text-indigo-600 font-bold border-none">
                      {course.category}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-yellow-500 text-sm gap-1">
                        <Star size={16} fill="currentColor" />
                        <span>{course.rating}</span>
                        <span className="text-gray-400">({course.numReviews || 120})</span>
                      </div>
                      {/* Price removed per request */}
                    </div>

                    <Link to={`/courses/${course._id}/play`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">{course.title}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{course.duration}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart size={14} />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 gap-2">
                      <div className="flex items-center gap-2 relative group">
                        <div className="relative">
                          <Link
                            to={`/courses/${course._id}`}
                            className="inline-flex items-center gap-1 text-gray-500 hover:text-indigo-600 text-xs font-bold transition-colors py-2 px-1"
                          >
                            <Play size={12} fill="currentColor" className="opacity-80" />
                            Watch Now
                          </Link>

                          {/* Quick Preview Popover */}
                          <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none">
                            <div className="space-y-3">
                              <h4 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <BookOpen size={14} className="text-indigo-600" />
                                Syllabus Preview
                              </h4>
                              <ul className="space-y-2">
                                {course.syllabus?.slice(0, 3).map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600">
                                    <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                                    {item.title}
                                  </li>
                                ))}
                              </ul>
                              {course.description && (
                                <div className="pt-2">
                                  <h5 className="text-[11px] font-bold text-gray-900 mb-1">About this course</h5>
                                  <p className="text-xs text-gray-700 leading-snug line-clamp-5">
                                    {course.description}
                                  </p>
                                </div>
                              )}
                              <div className="flex items-center gap-3 text-[11px] text-gray-700 pt-1">
                                <div className="flex items-center gap-1">
                                  <BarChart size={12} /> {course.level}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={12} /> {course.duration}h
                                </div>
                                <div className="flex items-center gap-1">
                                  {course.category}
                                </div>
                              </div>
                              {(() => {
                                const u = course.videoUrl;
                                if (!u) return null;
                                let vid = '';
                                try {
                                  const url = new URL(u);
                                  if (url.hostname.includes('youtube.com')) {
                                    const v = url.searchParams.get('v');
                                    if (v) vid = v;
                                  } else if (url.hostname === 'youtu.be') {
                                    vid = url.pathname.replace('/', '');
                                  }
                                } catch {}
                                if (!vid) return null;
                                const thumb = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
                                return (
                                  <Link
                                    to={`/courses/${course._id}`}
                                    className="block group pointer-events-auto"
                                  >
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                      <img src={thumb} alt="Intro Video" className="w-full h-28 object-cover" />
                                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white flex items-center gap-1 text-[11px]">
                                          <Play size={12} fill="currentColor" />
                                          Intro Video
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })()}
                              <div className="pt-1">
                                <Link
                                  to={`/courses/${course._id}`}
                                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 pointer-events-auto"
                                >
                                  View details
                                </Link>
                              </div>
                              <div className="pt-2 border-t">
                                <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold mb-1">
                                  <CheckCircle2 size={12} /> Certificate Included
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-indigo-600 font-bold">
                                  <CheckCircle2 size={12} /> Full Lifetime Access
                                </div>
                              </div>
                            </div>
                            {/* Decorative arrow */}
                            <div className="absolute top-full right-6 -mt-1 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
                          </div>
                        </div>

                        <Link
                          to={`/courses/${course._id}/play`}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-1"
                        >
                          <Play size={14} fill="currentColor" className="text-white" />
                          PLAY
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
