import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, Menu, Search, Rocket } from 'lucide-react';

export const Navbar = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-white/10 px-4 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 lg:hidden hover:bg-white/10 rounded-lg transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-nasa-red rounded-xl flex items-center justify-center shadow-lg shadow-nasa-red/20">
              <Rocket className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">
              Space<span className="text-nasa-red">Pulse</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-slate-200/50 dark:bg-white/5 rounded-xl px-3 py-1.5 border border-white/10 w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search celestial bodies, missions..." 
            className="bg-transparent border-none outline-none px-3 text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass hover:bg-white/20 transition-all text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="relative p-2.5 rounded-xl glass hover:bg-white/20 transition-all text-slate-600 dark:text-slate-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-nasa-red rounded-full border-2 border-white dark:border-space-900" />
          </button>

          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-nasa-blue to-nasa-red p-[2px]">
            <div className="h-full w-full rounded-[10px] bg-white dark:bg-space-900 flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Commander+Astra&background=0B3D91&color=fff" alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
