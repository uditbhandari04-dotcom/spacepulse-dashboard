import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  MessageSquare, 
  Newspaper, 
  Settings, 
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MapIcon, label: 'ISS Tracker', path: '/iss' },
  { icon: MessageSquare, label: 'Mission Control', path: '/chat' },
  { icon: Newspaper, label: 'Space News', path: '/news' },
];

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 glass border-r border-white/10 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between lg:hidden mb-8">
            <span className="text-xl font-black uppercase">SpacePulse</span>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-3">Main Menu</p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-nasa-blue text-white shadow-lg shadow-nasa-blue/20" 
                    : "hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto space-y-2 border-t border-white/10 pt-6">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white/10 transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Settings</span>
            </NavLink>
            <NavLink
              to="/help"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white/10 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold">Help Center</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
