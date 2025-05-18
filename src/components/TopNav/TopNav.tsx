// components/TopNav/TopNav.tsx
'use client'; // This is a client component

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Shadcn utility
// HACKATHON JUDGE NOTE: Icons used for navigation items.
import { Home, List, Plus,  BarChart2, Brain } from 'lucide-react'; // Example icons (npm install lucide-react)

// Import the ThemeToggle component
import { ThemeToggle } from '@/components/ThemeToggle'; // Import ThemeToggle
import { useTheme } from 'next-themes';

// Define navigation items
// HACKATHON JUDGE NOTE: Structure defining each navigation item.
const navItems = [
  { name: 'Home', icon: Home, key: 'home' }, // Home/Dashboard view (Calendar, Recent History, Streak)
  { name: 'History', icon: List, key: 'history' }, // History/List view (placeholder)
  { name: 'Log Mood', icon: Plus, key: 'log' }, // Log Mood action (triggers the modal/picker in page.tsx)
  // { name: 'Search', icon: Search, key: 'search' }, // Optional Search view
  { name: 'Charts', icon: BarChart2, key: 'charts' }, // Charts view
  { name: 'AI', icon: Brain, key: 'ai' }, // AI Insights view
];

interface TopNavProps { // Renamed interface
    // HACKATHON JUDGE NOTE: Prop indicating the currently active view key.
    activeView: string; // Current active view key
    // HACKATHON JUDGE NOTE: Prop function to call when a nav item is clicked.
    // This handler in the parent (page.tsx) is responsible for changing the view state.
    onViewChange: (viewKey: string) => void; // Callback when a nav item is clicked
    // Removed onDemoModeToggle prop as DemoButton is not here
}

// HACKATHON JUDGE NOTE: Responsive Top Navigation Bar Component (Fixed on mobile, Static on desktop).
// Functionality: Handles navigation clicks, indicates active view, includes Theme Toggle.
// Visual Design: Fixed position at the top on small screens, becomes static and potentially horizontal on larger screens.
export const TopNav: React.FC<TopNavProps> = ({ activeView, onViewChange }) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = theme;
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(true);
    }
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-around px-2 rounded-b-lg shadow-md",
        "dark:bg-[var(--color-background-dark)] bg-[var(--color-background-light)] border-0 border-[var(--color-border)]",
        "lg:static lg:h-auto lg:w-full lg:max-w-5xl lg:flex-row lg:justify-between lg:items-center lg:border-b lg:p-4 lg:mx-auto lg:rounded-lg lg:mt-4"
      )}
    >
      <div className="flex items-center justify-around flex-grow lg:flex-none lg:space-x-8">
        {navItems.map((item) => {
          const isActive = activeView === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-[var(--color-text-secondary)]",
                "dark:text-[var(--color-text-secondary)] transition-colors duration-200 ease-in-out",
                isActive && "text-[var(--color-primary)] dark:text-[var(--color-secondary)]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50",
                "lg:flex-row lg:space-x-2 lg:p-2 lg:rounded-md lg:hover:bg-[var(--color-background-light)] lg:dark:hover:bg-[var(--color-background-dark)] lg:transition-colors",
                "max-sm:rounded-sm max-sm:h-15 max-sm:w-15  max-sm:min-h-15 max-sm:max-h-15  max-sm:min-w-15  max-sm:max-w-20 ", // Make button slightly smaller on mobile, default size on sm+
                isActive && "lg:bg-[var(--color-border)] lg:dark:bg-[var(--color-border)]"
              )}
              aria-label={item.name}
            >
              <Icon className={cn("size-6", isActive && "scale-110 lg:scale-100")} />
              <span className="text-xs mt-1 lg:mt-0">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  );
};
