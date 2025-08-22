import React from 'react';

interface VeritasIconProps {
  className?: string;
  size?: number;
}

export const VeritasIcon: React.FC<VeritasIconProps> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#gradient)"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* V Shape */}
      <path
        d="M25 30 L45 65 L50 55 L55 65 L75 30"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Verification Check */}
      <path
        d="M35 50 L43 58 L65 36"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 90%, 50%)" />
          <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default VeritasIcon;