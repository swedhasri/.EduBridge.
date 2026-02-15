import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm text-white pt-12 pb-8 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-purple-400" />
              <span className="font-bold text-2xl tracking-tighter text-white">Edu<span className="text-purple-400">Bridge</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering college students with quality education and career guidance in the Web3 era.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-purple-400 transition text-sm">Home</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-purple-400 transition text-sm">Courses</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-purple-400 transition text-sm">Dashboard</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">Cyber Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition text-sm">Soft Skills</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-purple-400" />
                <span>123 Education Lane, Tech City</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-purple-400" />
                <span>+91 9150226330</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-purple-400" />
                <span>support@edubridge.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EduBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
