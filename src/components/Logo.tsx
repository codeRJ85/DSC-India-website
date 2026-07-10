import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-11 w-11' }: LogoProps) {
  return (
    <img
      id="custom-brand-logo"
      src="/logo.svg"
      alt="DSC Logo"
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}



