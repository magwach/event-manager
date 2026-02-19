"use client";

import { useAuth } from "@clerk/nextjs";
import { Zap } from "lucide-react";

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8 bg-[#0f0f11]">
        {/* Logo mark */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring pulse */}
          <span className="absolute h-16 w-16 rounded-full bg-amber-500/10 animate-ping" />
          {/* Inner ring */}
          <span className="absolute h-12 w-12 rounded-full bg-amber-500/15" />
          {/* Icon */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 shadow-lg shadow-amber-500/30">
            <Zap className="h-5 w-5 fill-[#0f0f11] text-[#0f0f11]" />
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-syne text-xl font-bold tracking-tight text-[#e8e6e1]">
            Event<span className="text-amber-400">Flow</span>
          </p>

          {/* Animated dots */}
          <div className="flex items-center gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-amber-500/60"
                style={{
                  animation: "dotBounce 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <p className="text-xs text-[#4a4a52] tracking-widest uppercase mt-1">
            Loading
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#2a2a35] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0 rounded-full"
            style={{ animation: "shimmer 1.5s ease-in-out infinite" }}
          />
        </div>

        <style>{`
          @keyframes dotBounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40%            { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes shimmer {
            0%   { transform: translateX(-100%); width: 100%; }
            50%  { transform: translateX(0%);    width: 100%; }
            100% { transform: translateX(100%);  width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}