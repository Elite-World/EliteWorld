import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-800">Categories</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Summer Camps
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Language
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Coding
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Skill Courses
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Cancellation options
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Teaching</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Become an instructor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Teaching resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-500">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 CourseHub, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
