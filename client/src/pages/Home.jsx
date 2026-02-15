import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, BookOpen, Users, TrendingUp, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8B5CF6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #3B82F6 0%, transparent 50%)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Web3 decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating blockchain elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-75"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-150"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-300"></div>
          
          {/* Blockchain connection lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M100,100 Q300,50 500,100 T900,100" stroke="url(#gradient)" strokeWidth="1" fill="none" className="animate-pulse" />
            <path d="M50,200 Q250,150 450,200 T850,200" stroke="url(#gradient)" strokeWidth="1" fill="none" className="animate-pulse delay-75" />
            <path d="M150,300 Q350,250 550,300 T950,300" stroke="url(#gradient)" strokeWidth="1" fill="none" className="animate-pulse delay-150" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
                Empowering College Students with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Quality Education</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Master in-demand skills and track your career growth with AI-powered recommendations in the Web3 era.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/lets-play" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold transition shadow-xl hover:shadow-purple-500/40 flex items-center justify-center gap-2 group">
                  <PlayCircle size={24} className="group-hover:scale-110 transition" />
                  Let's Play
                </Link>
                <Link to="/courses" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition border border-white/30 flex items-center justify-center gap-2">
                  <BookOpen size={20} />
                  Explore Courses
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Interactive Learning</div>
                      <div className="text-gray-400 text-sm">Gamified education experience</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Progress Tracking</div>
                      <div className="text-gray-400 text-sm">Monitor your learning journey</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Community</div>
                      <div className="text-gray-400 text-sm">Learn with peers worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Choose EduBridge?</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">We provide a comprehensive learning ecosystem designed to bridge the gap between academic learning and industry requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-purple-400" />}
              title="Smart Learning Tools"
              description="Interactive lessons, quizzes, and projects designed to keep you engaged and improve retention."
              color="bg-purple-500/10 border-purple-500/20"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-400" />}
              title="Progress Tracking"
              description="Visualize your learning journey with detailed analytics and AI-based recommendations."
              color="bg-blue-500/10 border-blue-500/20"
            />
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-20 bg-gray-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Popular Courses</h2>
              <p className="mt-2 text-gray-300">Top rated courses by fellow students</p>
            </div>
            <Link to="/courses" className="text-purple-400 font-semibold hover:text-purple-300 flex items-center gap-1">
              View all courses <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Demo Course Cards */}
            {courses.length > 0 ? (
              courses.slice(0, 3).map((course) => (
                <Link key={course._id} to={`/courses/${course._id}/play`} className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-purple-500/20 group block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-purple-500/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-purple-500/30 transition border border-purple-500/30">
                        <PlayCircle size={32} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-purple-500/30">
                        {course.category}
                      </span>
                      <div className="flex items-center text-yellow-500 text-sm">
                        <span>★</span><span>{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg animate-pulse border border-purple-500/20 h-80"></div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className={`p-8 rounded-2xl ${color} backdrop-blur-sm hover:bg-opacity-100 transition duration-300 border hover:border-purple-500/40`}>
    <div className="bg-gray-900/50 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6 backdrop-blur-sm border border-purple-500/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

export default Home;
