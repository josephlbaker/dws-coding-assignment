import { useState, useEffect } from "react";

function getScreenSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export function formatUnixTimestamp(unixSeconds: number): string {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const formatTime12Hour = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
};
