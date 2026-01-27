'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAppContext();

  if (!isOpen) return null;

  const handleLogin = (userId: string) => {
    login(userId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to CourseHub
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Log in as a member to continue. This is a demo, so no password is
            required.
          </p>
          <Button onClick={() => handleLogin('user1')} fullWidth>
            Log in as Alice (Learner & Admin)
          </Button>
          <Button
            onClick={() => handleLogin('user2')}
            variant="secondary"
            fullWidth
          >
            Log in as Dr. Angela Yu (Owner)
          </Button>
          <Button
            onClick={() => handleLogin('user3')}
            variant="secondary"
            fullWidth
            className="bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600"
          >
            Log in as David Lee (Owner)
          </Button>
          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
