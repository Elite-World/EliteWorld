'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Course, SessionPerformance, GlobalRole, InstitutionalRole } from '../types';
import {
  MOCK_COURSES,
  MOCK_USERS,
  MOCK_SESSION_PERFORMANCE,
  MOCK_INSTITUTION_MEMBERS,
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
    return MOCK_USERS.find((user) => user.id === course.facultyIds[0]);
  };

  const canManageCourse = (course: Course, user: User): boolean => {
    if (!course || !user) return false;
    
    // Global admins can manage everything
    if (user.globalRole === GlobalRole.WEB_MASTER || user.globalRole === GlobalRole.PLATFORM_ADMIN) return true;

    // Is the user part of this course's institution?
    const member = MOCK_INSTITUTION_MEMBERS.find(m => m.userId === user.id && m.institutionId === course.institutionId);
    if (!member) return false;
    
    // Institutional Partners and Admins can manage all courses in their institution
    if (member.role === InstitutionalRole.PARTNER || member.role === InstitutionalRole.ADMIN) return true;
    
    // Faculty can only manage if they are assigned to this specific course
    if (member.role === InstitutionalRole.FACULTY && course.facultyIds.includes(user.id)) return true;

    return false;
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
