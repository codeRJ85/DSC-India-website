import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-11 w-auto" }: LogoProps) {
  return (
    <img
      src="/nlogo.png"
      alt="DSC India"
      className={className}
    />
  );
}
