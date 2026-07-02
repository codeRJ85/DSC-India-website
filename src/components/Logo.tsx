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
        d="M 10,10 
           H 60 
           C 75,10 87,22 87,37 
           C 87,41 85,44 82,46
           C 62,41 42,43 10,51 
           V 10 
           Z 
           M 26,26 
           H 52 
           C 59,26 64,31 64,37 
           C 64,39 62,41 58,41
           C 48,39 37,39 26,41 
           V 26 
           Z"
        fill="#5EBCD3"
        fillRule="evenodd"
      />
      {/* Bottom dark-blue shape with swoosh extension & inner hole */}
      <path
        d="M 10,68 
           V 87 
           H 60 
           C 75,87 87,75 87,60 
           C 87,55 91,51 95,47.5 
           C 80,48 55,56 10,68 
           Z 
           M 26,70 
           V 77 
           C 26,77 40,81 53,77 
           C 59,74 65,70 65,65 
           C 55,66 40,68 26,70 
           Z"
        fill="#0050B3"
        fillRule="evenodd"
      />
    </svg>
  );
}
