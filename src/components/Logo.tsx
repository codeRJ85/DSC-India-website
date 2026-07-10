import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-11 w-11' }: LogoProps) {
  return (
    <svg
      id="custom-brand-logo"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top light-blue shape */}
      <path
        d="M 12,47 V 12 H 55 C 75,12 85,22 85,42 C 65,39 45,39 12,47 Z M 32,30 H 52 C 58,30 62,34 62,46 C 52,43 42,43 32,46 Z"
        fill="#4FAEE3"
        fillRule="evenodd"
      />
      {/* Bottom dark-blue shape with swoosh extension & inner hole */}
      <path
        d="M 12,53 V 88 H 55 C 80,88 82,60 92,49 C 80,47 62,45 50,45 C 40,45 25,47 12,53 Z M 32,52 V 70 H 52 C 58,70 62,66 62,52 C 52,49 42,49 32,52 Z"
        fill="#0055B8"
        fillRule="evenodd"
      />
    </svg>
  );
}
