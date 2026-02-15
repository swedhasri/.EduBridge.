import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PlayCircle, Clock, BarChart, Star, CheckCircle, BookOpen, User, Shield, Gamepad2, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import YouTubeGame from '../components/games/YouTubeGame';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const toYouTubeEmbed = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}?rel=0`;
        // already embed or playlist
        if (u.pathname.startsWith('/embed/')) return url;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.replace('/', '');
        if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
      }
      return '';
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        const dummyCourses = {
          '1': {
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
            videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
            syllabus: [
              { title: 'Introduction to HTML', duration: '1:00', videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
              { title: 'CSS Styling', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI' },
              { title: 'Javascript Basics', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
              { title: 'React Framework', duration: '6:00', videoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
              { title: 'Node.js Backend', duration: '5:00', videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' }
            ]
          },
          '2': {
            _id: '2',
            title: 'Python for Data Science and Machine Learning',
            description: 'Learn NumPy, Pandas, visualization, and ML with hands-on labs.',
            instructor: 'Jose Portilla',
            rating: 4.7,
            duration: 40,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Data Science',
            price: 59,
            videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            syllabus: [
              { title: 'Python Crash Course', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
              { title: 'NumPy & Pandas', duration: '3:30', videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
              { title: 'Data Visualization', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4' },
              { title: 'Machine Learning Basics', duration: '5:00', videoUrl: 'https://www.youtube.com/watch?v=7eh4d6sabA0' }
            ]
          },
          '3': {
            _id: '3',
            title: 'The Complete Cyber Security Course',
            description: 'Hackers exposed, defensive strategies, and security tooling.',
            instructor: 'Nathan House',
            rating: 4.9,
            duration: 35,
            level: 'Advanced',
            thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Cyber Security',
            price: 39,
            videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
            syllabus: [
              { title: 'Intro to Cyber Security', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA' },
              { title: 'Network Security', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=Y45SE3RVMHc' },
              { title: 'Malware Threats', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=yxYEV6aC5SU' },
              { title: 'Anonymous Browsing', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=7Vixer0C1Nk' }
            ]
          },
          '4': {
            _id: '4',
            title: 'Mastering Soft Skills for Success',
            description: 'Communication, leadership, emotional intelligence, and teamwork.',
            instructor: 'Simon Sinek',
            rating: 4.6,
            duration: 12,
            level: 'Beginner',
            thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Soft Skills',
            price: 29,
            videoUrl: 'https://www.youtube.com/watch?v=2zqKc5QdQgs',
            syllabus: [
              { title: 'Effective Communication', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=HAnw168huqA' },
              { title: 'Leadership Principles', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=1R6BML0J7Ew' },
              { title: 'Time Management', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=gu8K2xGZLZQ' }
            ]
          },
          '5': {
            _id: '5',
            title: 'JavaScript Algorithms and Data Structures',
            description: 'Practical algorithms with JavaScript and data structure mastery.',
            instructor: 'Colt Steele',
            rating: 4.7,
            duration: 30,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 39,
            videoUrl: 'https://www.youtube.com/watch?v=t2CEgPsws3U',
            syllabus: [
              { title: 'Time Complexity', duration: '1:00', videoUrl: 'https://www.youtube.com/watch?v=RGuJqTPtPcM' },
              { title: 'Arrays & Linked Lists', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=YQAtGNWvX2w' },
              { title: 'Stacks & Queues', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=wjI1WNcIntg' },
              { title: 'Trees & Graphs', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=fAAZixBzIAI' }
            ]
          },
          '6': {
            _id: '6',
            title: 'React and Redux from Zero to Hero',
            description: 'Modern React patterns, hooks, and Redux Toolkit state management.',
            instructor: 'Maximilian Schwarzmüller',
            rating: 4.8,
            duration: 28,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Web Development',
            price: 49,
            videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
            syllabus: [
              { title: 'React Fundamentals', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
              { title: 'Hooks Deep Dive', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
              { title: 'Redux Toolkit', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=9zySeP5vH9c' },
              { title: 'Testing Components', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=ovZ4r7lQWxs' }
            ]
          },
          '7': {
            _id: '7',
            title: 'AI & Machine Learning A-Z',
            description: 'End-to-end ML workflows with Python and real datasets.',
            instructor: 'Kirill Eremenko',
            rating: 4.5,
            duration: 45,
            level: 'Intermediate',
            thumbnailUrl: 'https://images.unsplash.com/photo-1511458059420-11b1640acb8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Data Science',
            price: 69,
            videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
            syllabus: [
              { title: 'Data Preprocessing', duration: '1:00', videoUrl: 'https://www.youtube.com/watch?v=UsfB3V0E8Dw' },
              { title: 'Regression', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=E5RjzSK0fvY' },
              { title: 'Classification', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=G6W8F3mz3tA' },
              { title: 'Clustering', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=4b5d3muPQmA' }
            ]
          },
          '8': {
            _id: '8',
            title: 'DevOps Fundamentals',
            description: 'CI/CD, Docker, Kubernetes, monitoring, and deployment pipelines.',
            instructor: 'Tech World',
            rating: 4.6,
            duration: 22,
            level: 'Beginner',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 39,
            videoUrl: 'https://www.youtube.com/watch?v=0yWAtQ6wYNM',
            syllabus: [
              { title: 'Docker Basics', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=pTFZFxd4hOI' },
              { title: 'Kubernetes Intro', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do' },
              { title: 'CI/CD Pipelines', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=scEDHsr3APg' }
            ]
          },
          '9': {
            _id: '9',
            title: 'Advanced Node.js and Microservices',
            description: 'Microservice architectures, messaging, and robust Node.js services.',
            instructor: 'Stephen Grider',
            rating: 4.7,
            duration: 32,
            level: 'Advanced',
            thumbnailUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            price: 59,
            videoUrl: 'https://www.youtube.com/watch?v=GZB-6S2RKTw',
            syllabus: [
              { title: 'Service Design', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=GZB-6S2RKTw' },
              { title: 'Queues & Events', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=qh7RY2RPPGw' },
              { title: 'Deployment', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=GZB-6S2RKTw' }
            ]
          }
        };
        if (dummyCourses[id]) setCourse(dummyCourses[id]);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);
  useEffect(() => {
    if (course) {
      const first = course.syllabus && course.syllabus[0] && course.syllabus[0].videoUrl;
      const firstTitle = course.syllabus && course.syllabus[0] && course.syllabus[0].title;
      const chosen = first || course.videoUrl || '';
      setSelectedVideoUrl(chosen);
      setSelectedVideoTitle(firstTitle || course.title || '');
      setCurrentIndex(0);
    }
  }, [course]);

  const handleEnroll = async () => {
    if (!user) {
      alert('Please login to enroll');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('/api/enrollments', { courseId: id }, config);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Course Header */}
      <div className="bg-gray-900 text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-indigo-400 font-medium">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
              <p className="text-xl text-gray-300">{course.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span className="text-gray-400">({course.numReviews || 120} ratings)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <User size={18} />
                  <span>Created by <span className="text-white underline">{course.instructor}</span></span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <Shield size={18} />
                  <span>Last updated {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Master the core concepts', 'Build real-world projects', 'Get industry ready', 'Earn a certificate'].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedVideoTitle || 'Course Preview'}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!course?.syllabus?.length) return;
                      const prev = Math.max(currentIndex - 1, 0);
                      const item = course.syllabus[prev];
                      setCurrentIndex(prev);
                      setSelectedVideoUrl(item.videoUrl || '');
                      setSelectedVideoTitle(item.title || '');
                    }}
                    className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-gray-700"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      if (!course?.syllabus?.length) return;
                      const next = Math.min(currentIndex + 1, course.syllabus.length - 1);
                      const item = course.syllabus[next];
                      setCurrentIndex(next);
                      setSelectedVideoUrl(item.videoUrl || '');
                      setSelectedVideoTitle(item.title || '');
                    }}
                    className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-gray-700"
                  >
                    Next
                  </button>
                </div>
              </div>
              {selectedVideoUrl ? (
                <>
                  {(() => {
                    const videoId = toYouTubeEmbed(selectedVideoUrl)?.split('/').pop()?.split('?')[0];
                    if (videoId) {
                      return (
                        <YouTubeGame
                          videoId={videoId}
                          videoUrl={selectedVideoUrl}
                          startTime={0}
                          onEnded={() => {
                            if (!course?.syllabus?.length) return;
                            const next = currentIndex + 1;
                            if (next < course.syllabus.length) {
                              const item = course.syllabus[next];
                              setCurrentIndex(next);
                              setSelectedVideoUrl(item.videoUrl || '');
                              setSelectedVideoTitle(item.title || '');
                            }
                          }}
                        />
                      );
                    }
                    return (
                      <div className="w-full h-64 md:h-96 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        Video URL is not a valid YouTube link
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="w-full h-64 md:h-96 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">No video available</div>
              )}
            </div>
            {/* Course Content */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {course.syllabus && course.syllabus.map((chapter, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setVideoLoading(true);
                      setSelectedVideoUrl(chapter.videoUrl || course.videoUrl || '');
                      setSelectedVideoTitle(chapter.title || course.title || '');
                      setCurrentIndex(index);
                    }}
                    className={`border-b border-gray-100 last:border-0 p-4 transition flex justify-between items-center cursor-pointer ${index === currentIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <PlayCircle className="text-gray-400" size={20} />
                      <span className="text-gray-700 font-medium">{chapter.title}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{chapter.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Floating Card) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative h-48">
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="text-white opacity-80" size={64} />
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Price removed per request */}

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                  >
                    Enroll Now
                  </button>

                  {course.gameLevels && (
                    <Link
                      to={`/courses/${id}/play`}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
                    >
                      <Zap size={20} className="text-yellow-400 group-hover:scale-110 transition" fill="currentColor" />
                      Start Game Journey
                    </Link>
                  )}

                  {course.games && course.games.length > 0 && (
                    <Link
                      to={`/courses/${id}/games`}
                      className="w-full bg-gray-50 text-indigo-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition border-2 border-indigo-100 flex items-center justify-center gap-2"
                    >
                      <Gamepad2 size={20} />
                      Quick Games ({course.games.length})
                    </Link>
                  )}

                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex justify-between border-b pb-2">
                      <span className="flex items-center gap-2"><Clock size={16} /> Duration</span>
                      <span className="font-medium">{course.duration} hours</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="flex items-center gap-2"><BookOpen size={16} /> Lessons</span>
                      <span className="font-medium">{course.syllabus ? course.syllabus.length : 0}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="flex items-center gap-2"><BarChart size={16} /> Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
