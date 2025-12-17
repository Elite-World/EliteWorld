'use client';

import { 
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserPlus,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineArrowLeftOnRectangle
} from 'react-icons/hi2';
import type { ReactNode } from 'react';

export const menuIcons: Record<string, ReactNode> = {
  login: <HiOutlineArrowRightOnRectangle className="w-4 h-4" />,
  signup: <HiOutlineUserPlus className="w-4 h-4" />,
  profile: <HiOutlineUser className="w-4 h-4" />,
  settings: <HiOutlineCog className="w-4 h-4" />,
  logout: <HiOutlineArrowLeftOnRectangle className="w-4 h-4" />
};

export function UserIcon() {
  return <HiOutlineUser className="w-5 h-5" />;
} 