import { AtSign, FolderGit2, Layers, User, Waypoints } from 'lucide-react';
import type { NavItem } from '../types/portfolio';

export const navItems: NavItem[] = [
  { id: 'work', label: 'Work', Icon: FolderGit2 },
  { id: 'services', label: 'Services', Icon: Layers },
  { id: 'process', label: 'Process', Icon: Waypoints },
  { id: 'about', label: 'About', Icon: User },
  { id: 'contact', label: 'Contact', Icon: AtSign },
];
