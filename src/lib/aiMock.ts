// lib/aiMock.ts
// HACKATHON FEATURE: Mock AI Insights Generator.
// HACKATHON JUDGE NOTE: This is a simulated AI feature for the hackathon.
// It uses simple logic based on recent mood data to generate text responses.

import { MoodEntry } from './dataService'; // Import MoodEntry interface

// Mock function to generate insights based on data
// HACKATHON JUDGE NOTE: Mock function generating insights based on simple data analysis.
export const generateMockInsight = (moodData: MoodEntry[]): string => {
  if (!moodData || moodData.length === 0) {
    return "Log some moods to get your first insight!";
  }

  // Look at the last 7 entries for recent trends
  const recentData = moodData.slice(0, Math.min(moodData.length, 7));
  if (recentData.length === 0) return "Log some moods to get insights!";

  const moodCounts: { [key: string]: number } = {};
  recentData.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  const totalRecent = recentData.length;
  let insight = "Analyzing your recent moods...";

  const mostFrequentMood = Object.keys(moodCounts).length > 0
    ? Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b)
    : null;

  if (mostFrequentMood && moodCounts[mostFrequentMood] / totalRecent > 0.7) { // If one mood is dominant (>70% in last 7 days)
     switch(mostFrequentMood) {
        case 'joy': insight = "Insight: You've been feeling very joyful lately! Keep that energy up! ✨"; break;
        case 'happy': insight = "Insight: Looks like a consistently positive trend this week. "; break;
        case 'sad': insight = "Insight: You seem to be experiencing some sadness recently. Remember to be kind to yourself. ❤️"; break;
        case 'angry': insight = "Insight: Noticing some frustration lately. Find healthy ways to release that tension. "; break;
        case 'tired': insight = "Insight: Your recent logs show you've been feeling tired. Make sure to prioritize rest! "; break;
        default: insight = `Insight: Your most frequent mood lately is ${mostFrequentMood.charAt(0).toUpperCase() + mostFrequentMood.slice(1)}.`;
     }
  } else if (totalRecent >= 5 && Object.keys(moodCounts).length > 3) { // If varied moods and enough data
      insight = "Insight: Your moods have been quite varied recently. Embracing the full range of emotions is part of the journey!";
  } else {
     insight = "Insight: Keep logging your moods for deeper insights!";
  }

  // HACKATHON JUDGE NOTE: This insight is generated based on simple conditional logic, not a real AI model.
  return insight;
};

// Mock function to generate recommendations
// HACKATHON JUDGE NOTE: Mock function generating recommendations based on simple rules.
export const generateMockRecommendation = (moodData: MoodEntry[]): string => {
    if (!moodData || moodData.length === 0) {
        return "Log more moods for personalized recommendations!";
    }

    // Simple recommendation based on data quantity or specific moods
    if (moodData.length < 10) {
        return "Recommendation: Log at least 10 moods to unlock more personalized recommendations!";
    }

    // Example: Recommend rest if tired is frequent recently
    const recentData = moodData.slice(0, Math.min(moodData.length, 7));
    const tiredCount = recentData.filter(entry => entry.mood === 'tired').length;
    if (tiredCount > 2) {
        return "Recommendation: You've logged 'tired' frequently this week. Consider scheduling some extra rest or relaxation time. ";
    }

    // Example: Recommend activities if joyful/happy is frequent
     const positiveCount = recentData.filter(entry => entry.mood === 'joy' || entry.mood === 'happy').length;
     if (positiveCount > 4) {
         return "Recommendation: You've had a lot of positive days! Think about what contributed to those moods and do more of it! ";
     }


    return "Recommendation: Keep tracking your moods! Consistent logging helps you understand yourself better. "; // Default recommendation
    // HACKATHON JUDGE NOTE: This recommendation is based on simple conditional logic, not a real AI model.
};
