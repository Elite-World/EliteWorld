'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Course, SessionPerformance } from '../types';
import {
  MOCK_COURSES,
  MOCK_USERS,
  MOCK_SESSION_PERFORMANCE,
} from '../data/mockData';

interface AppContextType {
  courses: Course[];
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  addToWishlist: (courseId: string) => void;
  removeFromWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  getCourseOwner: (course: Course) => User | undefined;
  canManageCourse: (course: Course, user: User) => boolean;
  getAllUsers: () => User[];
  getSessionPerformance: (sessionId: string) => SessionPerformance | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sessionPerformances] = useState<SessionPerformance[]>(
    MOCK_SESSION_PERFORMANCE,
  );

  const login = (userId: string) => {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    } else {
      // For simplicity, log in the first user if ID not found
      setCurrentUser(MOCK_USERS[0]);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addToWishlist = (courseId: string) => {
    if (!currentUser || currentUser.wishlist.includes(courseId)) return;
    setCurrentUser({
      ...currentUser,
      wishlist: [...currentUser.wishlist, courseId],
    });
  };

  const removeFromWishlist = (courseId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      wishlist: currentUser.wishlist.filter((id) => id !== courseId),
    });
  };

  const isInWishlist = (courseId: string) => {
    return currentUser?.wishlist.includes(courseId) ?? false;
  };

  const getCourseOwner = (course: Course): User | undefined => {
    return MOCK_USERS.find((user) => user.id === course.ownerId);
  };

  const canManageCourse = (course: Course, user: User): boolean => {
    if (!course || !user) return false;
    // The owner always has management authority.
    if (course.ownerId === user.id) {
      return true;
    }
    // Check if the user is listed as an admin.
    return course.admins.some((admin) => admin.userId === user.id);
  };

  const getAllUsers = (): User[] => {
    return MOCK_USERS;
  };

  const getSessionPerformance = (
    sessionId: string,
  ): SessionPerformance | undefined => {
    return sessionPerformances.find((p) => p.sessionId === sessionId);
  };

  const value = {
    courses,
    currentUser,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCourseOwner,
    canManageCourse,
    getAllUsers,
    getSessionPerformance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
