"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History } from "lucide-react";

const HistoryLoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const codeSnippets = ["Dr Doom", "Thor", "Batman", "Ultron", "Iron Man"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Main Loading Animation */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-blue-800/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Progress Ring */}
          <svg className="absolute inset-0 w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-blue-800/30"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-blue-600"
              strokeLinecap="round"
              strokeDasharray={351.86}
              initial={{ strokeDashoffset: 351.86 }}
              animate={{ strokeDashoffset: 351.86 - (351.86 * progress) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-800/50"
            >
              <History className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Floating Code Elements */}
          {codeSnippets.map((code, i) => (
            <motion.div
              key={i}
              className="absolute text-xs font-mono text-blue-300/70 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-sm"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: [0, Math.cos((i * 72 * Math.PI) / 180) * 80],
                y: [0, Math.sin((i * 72 * Math.PI) / 180) * 80],
                opacity: [0, 1, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Loading Archive
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-300/80"
          >
            Fetching your code review timeline...
          </motion.p>

          {/* Progress Text */}
          <div className="text-sm text-blue-400 font-mono">
            {progress}% complete
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryLoadingScreen;
