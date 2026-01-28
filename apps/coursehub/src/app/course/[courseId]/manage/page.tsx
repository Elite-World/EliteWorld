'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Course, User, CourseCategory, Session } from '@/types';
import Button from '@/components/Button';

// --- Reusable Tab Button ---
const TabButton: React.FC<{
  tabName: string;
  activeTab: string;
  onClick: (tabName: string) => void;
  children: React.ReactNode;
}> = ({ tabName, activeTab, onClick, children }) => (
  <button
    onClick={() => onClick(tabName)}
    className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === tabName ? 'bg-teal-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
  >
    {children}
  </button>
);

// --- Edit Details Panel (now includes Admin Management) ---
const DetailsPanel: React.FC<{ course: Course; users: User[] }> = ({
  course,
  users,
}) => {
  const getAdminDetails = (userId: string) =>
    users.find((u) => u.id === userId);
  const owner = users.find((u) => u.id === course.ownerId);

  return (
    <div className="mt-6 bg-white p-8 rounded-lg shadow">
      {/* Course Details Form */}
      <h3 className="text-xl font-semibold mb-6">Edit Course Details</h3>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={course.title}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={course.description}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={course.category}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
            >
              {Object.values(CourseCategory).map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Default Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={course.price}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="secondary" type="button" className="mr-3">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>

      <div className="border-t my-8"></div>

      {/* Admin Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Default Admins & Instructors
          </h3>
          <ul className="space-y-3">
            {owner && (
              <li
                key={owner.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full mr-3 shrink-0 overflow-hidden">
                    <Image
                      src={owner.avatarUrl}
                      alt={owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{owner.name}</p>
                    <p className="text-sm text-gray-500">Owner</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  Cannot be removed
                </span>
              </li>
            )}
            {course.admins.map((admin) => {
              const adminUser = getAdminDetails(admin.userId);
              return (
                <li
                  key={admin.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full mr-3 shrink-0 overflow-hidden">
                      <Image
                        src={adminUser?.avatarUrl || ''}
                        alt={adminUser?.name || 'Admin'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{adminUser?.name}</p>
                      <p className="text-sm text-gray-500">{admin.role}</p>
                    </div>
                  </div>
                  <button className="text-xs text-red-500 hover:underline">
                    Remove
                  </button>
                </li>
              );
            })}
            {course.admins.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No other admins assigned yet.
              </p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Add New Default Admin</h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                Select Member
              </label>
              <select
                id="user"
                name="user"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option>Select a member...</option>
                {users
                  .filter(
                    (u) =>
                      u.id !== course.ownerId &&
                      !course.admins.some((a) => a.userId === u.id),
                  )
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Assign Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="e.g., Instructor"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <Button type="submit">Assign Role</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Sessions Management Panel ---
const SessionsPanel: React.FC<{
  course: Course;
  onAmend: (session: Session) => void;
}> = ({ course, onAmend }) => {
  const getStatusColor = (status: 'Upcoming' | 'In Progress' | 'Completed') => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Course Sessions</h3>
        {course.sessions.length > 0 ? (
          <ul className="space-y-4">
            {course.sessions.map((session) => (
              <li key={session.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-semibold text-gray-800">
                        {session.title}
                      </h4>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(session.status)}`}
                      >
                        {session.status}
                      </span>
                      {session.price && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          Custom Price
                        </span>
                      )}
                      {session.assignedPersonnel && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                          Custom Staff
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {session.date} at {session.time} &middot;{' '}
                      {session.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <Button
                      onClick={() => onAmend(session)}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      Amend
                    </Button>
                    <Link
                      href={`/course/${course.id}/session/${session.id}/performance`}
                      className="px-3 py-1 text-sm font-semibold rounded-lg transition-all duration-300 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-center"
                    >
                      Performance
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            No sessions have been set up for this course yet.
          </p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Add New Session</h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Session Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Live Q&A"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date & Time
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
              <input
                type="time"
                id="time"
                name="time"
                className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location / Link
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Zoom or Room 101"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <Button type="submit" fullWidth>
            Add Session
          </Button>
        </form>
      </div>
    </div>
  );
};

// --- Amend Session Modal ---
const AmendSessionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  course: Course;
  users: User[];
}> = ({ isOpen, onClose, session, course, users }) => {
  if (!isOpen || !session) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Amend Session: {session.title}
        </h2>
        <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          <div>
            <label
              htmlFor="session-title"
              className="block text-sm font-medium text-gray-700"
            >
              Session Title
            </label>
            <input
              type="text"
              id="session-title"
              defaultValue={session.title}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="session-price"
              className="block text-sm font-medium text-gray-700"
            >
              Override Price ($)
            </label>
            <input
              type="number"
              id="session-price"
              defaultValue={session.price}
              placeholder={`Default: $${course.price}`}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Override Instructors/Admins
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Select staff for this session. If empty, course defaults will be
              used.
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
              {users.map((user) => (
                <div key={user.id} className="flex items-center">
                  <input
                    id={`user-${user.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                    defaultChecked={(
                      session.assignedPersonnel || course.admins
                    ).some((a) => a.userId === user.id)}
                  />
                  <label
                    htmlFor={`user-${user.id}`}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="flex justify-end pt-6 border-t mt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            className="mr-3"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const CourseManagementPage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();
  const { courses, currentUser, getAllUsers, canManageCourse } =
    useAppContext();
  const [activeTab, setActiveTab] = useState('details');
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleOpenAmendModal = (session: Session) => {
    setSelectedSession(session);
    setIsAmendModalOpen(true);
  };

  const handleCloseAmendModal = () => {
    setIsAmendModalOpen(false);
    setSelectedSession(null);
  };

  if (!currentUser) return null;

  if (!course)
    return (
      <div className="container mx-auto p-8 text-center">Course not found.</div>
    );
  if (!canManageCourse(course, currentUser)) {
    return (
      <div className="container mx-auto p-8 text-center">
        You do not have permission to manage this course.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-teal-600 hover:underline text-sm"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Course Management
          </h1>
          <p className="text-lg text-gray-600">{course.title}</p>
        </div>

        <div className="flex items-center border-b border-gray-200 mb-6 flex-wrap">
          <div className="flex space-x-2 py-2">
            <TabButton
              tabName="details"
              activeTab={activeTab}
              onClick={setActiveTab}
            >
              Details
            </TabButton>
            <TabButton
              tabName="sessions"
              activeTab={activeTab}
              onClick={setActiveTab}
            >
              Sessions
            </TabButton>
          </div>
        </div>

        {activeTab === 'details' && (
          <DetailsPanel course={course} users={getAllUsers()} />
        )}
        {activeTab === 'sessions' && (
          <SessionsPanel course={course} onAmend={handleOpenAmendModal} />
        )}
      </div>
      <AmendSessionModal
        isOpen={isAmendModalOpen}
        onClose={handleCloseAmendModal}
        session={selectedSession}
        course={course}
        users={getAllUsers()}
      />
    </div>
  );
};

export default CourseManagementPage;
