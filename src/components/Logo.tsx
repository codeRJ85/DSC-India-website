import React from "react";
import logo from "../../assets/nlogo.png";
interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-11 w-auto" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="DSC India"
      className={className}
    />
  );
}
