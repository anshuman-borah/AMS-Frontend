import { useEffect, useState } from "react";

export default function LoadingScreen({
  title = "Loading...",
  subtitle = "Please wait..."
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;

        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="rounded-xl leading-none animate-pulse shadow-sm">
          <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#111827" />

            <rect
              x="9"
              y="9"
              width="6"
              height="6"
              rx="1.5"
              fill="white"
            />

            <rect
              x="17"
              y="9"
              width="6"
              height="6"
              rx="1.5"
              fill="white"
              opacity="0.45"
            />

            <rect
              x="9"
              y="17"
              width="6"
              height="6"
              rx="1.5"
              fill="white"
              opacity="0.45"
            />

            <rect
              x="17"
              y="17"
              width="6"
              height="6"
              rx="1.5"
              fill="white"
              opacity="0.18"
            />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 95)}%`
            }}
          ></div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-700 tracking-wide">
            {title}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>

      </div>
    </div>
  );
}