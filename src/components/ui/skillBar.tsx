import React from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
  size?: number; // Make the size customizable
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage, size = 80 }) => {
  // --- SVG & Circle Calculations ---
  const strokeWidth = 6;
  const radius = (size / 2) - (strokeWidth * 2);
  const circumference = 2 * Math.PI * radius;
  // Calculate the stroke-dashoffset for the progress
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
      <div className="relative" style={{ width: size, height: size }}>
        {/* We use an absolute div to easily center the text over the SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[var(--text-color)] transition-all duration-700 ease-in-out">{percentage}%</span>
        </div>
        <svg
          className="-rotate-90" // Start the progress from the top
          width={size}
          height={size}
        >
          {/* Define the gradient for the progress bar */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Background Circle (The Track) */}
          <circle
            className="text-[#eef2ff] transition-all duration-700 ease-in-out" // Muted background color
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Foreground Circle (The Progress) */}
          <circle
            className="transition-all duration-700 ease-in-out"
            strokeWidth={strokeWidth}
            stroke="url(#skillGradient)" // Apply the gradient
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progressOffset,
            }}
          />
        </svg>
      </div>
      <span className="font-bold text-md text-[var(--text-color)] transition-all duration-700 ease-in-out">{skill}</span>
    </div>
  );
};

export default SkillBar;