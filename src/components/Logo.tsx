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
        d="M 10,10 H 55 C 75,10 88,23 88,43 C 60,40 30,40 10,50 V 10 Z M 27,26 H 52 C 61,26 66,31 66,38 C 53,38 40,39 27,41 V 26 Z"
        fill="#5EBCD3"
        fillRule="evenodd"
      />
      {/* Bottom dark-blue shape with swoosh extension & inner hole */}
      <path
        d="M 10,54 C 35,47 65,46 95,47.5 C 90,51 87,54 85,58 C 85,75 75,90 60,90 H 10 V 54 Z M 27,71 C 40,71 55,66 66,54 C 52,53 38,60 27,71 Z"
        fill="#0050B3"
        fillRule="evenodd"
      />
    </svg>
  );
}
