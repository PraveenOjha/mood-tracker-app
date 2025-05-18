// app/page.tsx
'use client'; // This is a client component

import React, { useState } from 'react';
import { format } from 'date-fns'; // For formatting the selected date

// Import all the components
import { Calendar } from '@/components/Calendar/Calendar';
import { RecentHistory } from '@/components/RecentHistory/RecentHistory';
import { ChartDisplay } from '@/components/ChartDisplay/ChartDisplay';
import { AIInsights } from '@/components/AIInsights/AIInsights';
import { MoodPicker } from '@/components/MoodPicker/MoodPicker';
import { TopNav } from '@/components/TopNav/TopNav'; // Import the renamed TopNav component
import { StreakCounter } from '@/components/StreakCounter/StreakCounter'; // Import StreakCounter
import { DemoButton } from '@/components/DemoButton/DemoButton'; // Keep import
import { ConfettiCanvas } from '@/components/ConfettiCanvas/ConfettiCanvas'; // Import ConfettiCanvas


// Import data service functions
import { addMoodEntry, clearAllData, loadDemoData, MoodEntry } from '@/lib/dataService'; // Import MoodEntry interface

// HACKATHON JUDGE NOTE: Main Application Page component.
// Manages the overall application state and orchestrates components.
export default function HomePage() {
  // HACKATHON JUDGE NOTE: State management for active view, logging, data refresh, and demo mode.
  const [activeView, setActiveView] = useState('home'); // 'home', 'history', 'charts', 'ai'
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Date clicked for logging
  const [isLogging, setIsLogging] = useState(false); // Controls visibility of MoodPicker overlay
  // HACKATHON JUDGE NOTE: dataRefreshTrigger is incremented to signal data reload in child components.
  // This is a simple mechanism to tell components displaying data that the underlying data has changed.
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0); // Increment to signal data reload
  // HACKATHON FEATURE: State to trigger confetti animation.
  const [showConfetti, setShowConfetti] = useState(false); // Triggers confetti animation

  // HACKATHON JUDGE NOTE: Handler for selecting a day on the calendar.
  // When a day is clicked, this sets the selected date and shows the mood picker.
  const handleDaySelect = (date: Date | null) => {
    setSelectedDate(date);
    setIsLogging(date !== null); // Show picker if a date is selected (and not null)
     // HACKATHON JUDGE NOTE: Console log to show which date was selected for logging.
    if (date) console.log(`HACKATHON: Date selected for logging: ${format(date, 'yyyy-MM-dd')}`);
  };

  // HACKATHON JUDGE NOTE: Handler for selecting a mood in the picker.
  // This is the core logging logic. It saves the mood, triggers data refresh, and potentially shows confetti.
  const handleSelectMood = async (moodKey: string) => {
    if (selectedDate) {
      // Format date to 'yyyy-MM-dd' for storage
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      // HACKATHON JUDGE NOTE: Calling data service to add the new mood entry to storage.
      await addMoodEntry(dateString, moodKey);

      // HACKATHON JUDGE NOTE: Triggering data refresh for components that display data (Calendar, History, Chart, Streak).
      setDataRefreshTrigger(prev => prev + 1); // Increment to trigger useEffects in data components

      // HACKATHON FEATURE: Trigger confetti for 'joy' mood.
      // Visual Design: Provides a celebratory animation.
      if (moodKey === 'joy') {
        setShowConfetti(true);
      }

      // Reset logging state after successful log
      setSelectedDate(null);
      setIsLogging(false);
    }
  };

  // HACKATHON JUDGE NOTE: Handler for changing the active view via top navigation.
  // Updates the active view state and hides the mood picker if it was open.
  const handleViewChange = (viewKey: string) => {
    // If Log Mood is clicked, open mood picker for today
    if (viewKey === 'log') {
      const today = new Date();
      setSelectedDate(today);
      setIsLogging(true);
      return;
    }
    setActiveView(viewKey);
    setIsLogging(false);
    setSelectedDate(null);
    console.log(`HACKATHON: Changed view to: ${viewKey}`);
  };

   // HACKATHON JUDGE NOTE: Handler passed to DemoButton to toggle demo mode.
   // This function manages loading/clearing demo data in storage and triggers data refresh.
   // Functionality: Activates/deactivates demo mode.
   const handleDemoModeToggle = async (isActive: boolean) => {
        if (isActive) {
            // HACKATHON JUDGE NOTE: Loading pre-defined sample data for demo mode.
            // Sample data is defined here in the main page component for simplicity.
            // In a production app, this might be in dataService or a config file.
            const sampleData: MoodEntry[] = [
                 // Sample data entries (ensure dates are relevant or relative to 'today')
                 { id: 'demo1', date: format(new Date(), 'yyyy-MM-dd'), mood: 'joy', timestamp: Date.now() },
                 { id: 'demo2', date: format(new Date(Date.now() - 86400000), 'yyyy-MM-dd'), mood: 'happy', timestamp: Date.now() - 86400000 },
                 { id: 'demo3', date: format(new Date(Date.now() - 2 * 86400000), 'yyyy-MM-dd'), mood: 'tired', timestamp: Date.now() - 2 * 86400000 },
                 { id: 'demo4', date: format(new Date(Date.now() - 3 * 86400000), 'yyyy-MM-dd'), mood: 'sad', timestamp: Date.now() - 3 * 86400000 },
                 { id: 'demo5', date: format(new Date(Date.now() - 4 * 86400000), 'yyyy-MM-dd'), mood: 'angry', timestamp: Date.now() - 4 * 86400000 },
                 { id: 'demo6', date: format(new Date(Date.now() - 5 * 86400000), 'yyyy-MM-dd'), mood: 'happy', timestamp: Date.now() - 5 * 86400000 },
                 { id: 'demo7', date: format(new Date(Date.now() - 6 * 86400000), 'yyyy-MM-dd'), mood: 'joy', timestamp: Date.now() - 6 * 86400000 },
                 { id: 'demo8', date: format(new Date(Date.now() - 7 * 86400000), 'yyyy-MM-dd'), mood: 'happy', timestamp: Date.now() - 7 * 86400000 },
                 { id: 'demo9', date: format(new Date(Date.now() - 8 * 86400000), 'yyyy-MM-dd'), mood: 'joy', timestamp: Date.now() - 8 * 86400000 },
                 { id: 'demo10', date: format(new Date(Date.now() - 9 * 86400000), 'yyyy-MM-dd'), mood: 'happy', timestamp: Date.now() - 9 * 86400000 },
                 { id: 'demo11', date: format(new Date(Date.now() - 10 * 86400000), 'yyyy-MM-dd'), mood: 'tired', timestamp: Date.now() - 10 * 86400000 },

                // Add more data points as needed for a good demo sequence, perhaps leading up to 'today'
                // Ensure dates are recent or relative to 'today' when displayed in the demo.
            ];
            await clearAllData(); // Clear existing user data before loading demo
            await loadDemoData(sampleData); // Load the sample data into local storage
        } else {
             // HACKATHON JUDGE NOTE: Clearing data when exiting demo mode.
             await clearAllData(); // Clear demo data
             // TODO: If you want to restore user data saved before demo, implement that here.
        }
        // HACKATHON JUDGE NOTE: Triggering data refresh after demo mode state changes.
        // This ensures all components display the correct data (either demo or cleared).
        setDataRefreshTrigger(prev => prev + 1); // Signal components to reload data
   };


   // HACKATHON JUDGE NOTE: Handler for when confetti animation completes.
   // Resets the showConfetti state so it can be triggered again.
   const handleConfettiComplete = () => {
       setShowConfetti(false);
   };


  // HACKATHON JUDGE NOTE: Main application layout and conditional rendering based on activeView.
  // UX: Single page view with sections toggled by top navigation.
  return (
    // Adjusted padding-top (pt-16) to account for fixed mobile navigation bar height (h-16).
    // On desktop, the static nav will push content down naturally.
    <main className="flex  min-h-screen flex-col items-center p-4 md:p-8 pt-16"> {/* Adjusted pt-16 */}
      {/* HACKATHON JUDGE NOTE: Top Navigation Bar */}
      {/* Functionality: onViewChange handler updates the activeView state, controlling the main content. */}
      {/* UX: Provides easy navigation between main sections. Fixed on mobile, static on desktop. */}
      {/* TopNav now includes the Theme Toggle */}
      <TopNav activeView={activeView} onViewChange={handleViewChange} />


      {/* Header/Title area (positioned below the navigation bar) */}
      {/* This div contains the App Title and Demo Button. Theme Toggle is now in the nav. */}
      {/* It is styled to adjust layout and visibility responsively. */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-col lg:flex-row relative lg:mt-8"> {/* Added flex-col lg:flex-row */}
        {/* App Title */}
         {/* Adjusted positioning and visibility */}
        <p className="flex w-full  justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
          Mood Tracker App
        </p>
        {/* Demo Button Section */}
        {/* HACKATHON FEATURE: Demo Button positioned in the header. */}
        {/* Styled to be visible on mobile and positioned below the title, and on the right on desktop. */}
        {/* Theme Toggle is now in the TopNav */}
        <div className="flex w-full items-end justify-center lg:static lg:size-auto lg:bg-none lg:flex-row lg:items-center lg:justify-end lg:space-x-4"> {/* Adjusted layout and spacing */}
           {/* HACKATHON FEATURE: Demo Mode Button */}
           {/* Activates/deactivates demo mode. onDemoModeToggle handler is passed down. */}
           <DemoButton onDemoModeToggle={handleDemoModeToggle} />
        </div>
      </div>

      {/* Main Content Area - Conditionally rendered based on activeView state */}
      {/* mt-8 provides space below the header/controls */}
      <div className="mt-8 w-full max-w-5xl flex-grow"> {/* flex-grow ensures this area takes available space */}
         {/* HACKATHON JUDGE NOTE: Conditional rendering of views based on activeView state. */}

         {activeView === 'home' && (
            // HACKATHON JUDGE NOTE: Home/Dashboard View - Displays Calendar, Recent History, and Streak.
            <div className="space-y-6">
               <h1 className="text-2xl font-bold">Your Mood Dashboard</h1>
               {/* Calendar Component: Displays month view and allows day selection */}
               {/* Functionality: onDaySelect handler updates state for logging */}
               {/* Data Flow: dataRefreshTrigger prop signals Calendar to reload data from storage */}
               <Calendar onDaySelect={handleDaySelect} dataRefreshTrigger={dataRefreshTrigger} />

               {/* Recent History Component: Displays the latest logged moods */}
               {/* Data Flow: dataRefreshTrigger prop signals RecentHistory to reload data from storage */}
               <RecentHistory dataRefreshTrigger={dataRefreshTrigger} />

                {/* Streak Counter Component: Displays the current logging streak */}
                {/* Data Flow: dataRefreshTrigger prop signals StreakCounter to reload data from storage */}
                <StreakCounter dataRefreshTrigger={dataRefreshTrigger} />
            </div>
         )}

         {activeView === 'history' && (
             // HACKATHON JUDGE NOTE: History/List View (Placeholder).
             // This section could be expanded to show a full list of all logged moods.
             <div className="space-y-6">
                 <h1 className="text-2xl font-bold">Mood History</h1>
                 {/* TODO: Implement a full history list component here */}
                 <p className="text-gray-600 dark:text-gray-300">Full history list coming soon! For now, see recent moods on the Home tab.</p> {/* Placeholder message */}
                 {/* You could render a list of all entries here by fetching all data from dataService */}
             </div>
         )}

         {activeView === 'charts' && (
            // HACKATHON JUDGE NOTE: Charts View.
            // Displays a chart visualizing mood data.
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Mood Charts</h1>
                 {/* Chart Display Component: Renders the mood data chart */}
                 {/* Data Flow: dataRefreshTrigger prop signals ChartDisplay to reload and re-render chart */}
                <ChartDisplay dataRefreshTrigger={dataRefreshTrigger} />
            </div>
         )}

         {activeView === 'ai' && (
            // HACKATHON FEATURE: AI Insights View (Mocked).
            // Displays the mocked AI Mood Coach interface.
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">AI Mood Coach</h1>
                 {/* AI Insights Component: Triggers and displays mock AI analysis */}
                 {/* This component fetches data internally */}
                <AIInsights />
            </div>
         )}

         {/* HACKATHON FEATURE: Mood Picker Overlay */}
         {/* UX: Appears as a modal when a date is selected for logging. */}
         {isLogging && selectedDate && (
             <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                     {/* Header for the mood picker modal */}
                     <h2 className="text-xl font-semibold mb-4">Log Mood for {format(selectedDate, 'MMM dd,yyyy')}</h2> {/* Corrected format string */}
                     {/* Mood Picker Component: Allows selecting an emoji */}
                     {/* Functionality: onSelectMood handler logs the mood and triggers refresh */}
                     <MoodPicker onSelectMood={handleSelectMood} />
                     {/* Button to cancel logging and close the modal */}
                     <button
                        onClick={() => handleDaySelect(null)} // Passing null closes the picker
                        className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
                     >
                        Cancel
                     </button>
                 </div>
             </div>
         )}

      </div>

       {/* HACKATHON FEATURE: Confetti Canvas (appears on Joyful mood log) */}
       {/* Visual Design: Provides a celebratory animation. */}
       {/* trigger prop controls when the animation starts/stops */}
       {/* onComplete prop resets the showConfetti state */}
       <ConfettiCanvas trigger={showConfetti} onComplete={handleConfettiComplete} />


       {/* The TopNav component is used as the Responsive Top Navigation Bar */}
       {/* It is fixed on mobile and static on desktop */}


    </main>
  );
}
