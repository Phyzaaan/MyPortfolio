import React from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
  size?: number; 
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage, size = 80 }) => {
  const strokeWidth = 6;
  const radius = (size / 2) - (strokeWidth * 2);
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[var(--text-color)] ">{percentage}%</span>
        </div>
        <svg
          className="-rotate-90" 
          width={size}
          height={size}
        >
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          <circle
            className="text-[#eef2ff] "
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className=""
            strokeWidth={strokeWidth}
            stroke="url(#skillGradient)" 
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
      <span className="font-bold text-md text-[var(--text-color)] ">{skill}</span>
    </div>
  );
};

export default SkillBar;