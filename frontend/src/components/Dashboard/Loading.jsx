import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Brain, Zap } from "lucide-react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: Terminal, text: "Initializing workspace", color: "text-blue-400" },
    { icon: Code2, text: "Loading code editor", color: "text-purple-400" },
    { icon: Brain, text: "Preparing AI reviewers", color: "text-purple-400" },
    { icon: Zap, text: "Finalizing setup", color: "text-green-400" },
  ];

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    const startLoading = () => {
      setProgress(0);
      setCurrentStep(0);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;

          if (newProgress >= 75) setCurrentStep(3);
          else if (newProgress >= 50) setCurrentStep(2);
          else if (newProgress >= 25) setCurrentStep(1);
          else setCurrentStep(0);

          return Math.min(newProgress, 100);
        });
      }, 40);

      stepTimeout = setTimeout(() => {
        setProgress(100);
        setCurrentStep(3);
        onComplete();
      }, 2000);
    };

    startLoading();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      ></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12 z-10 max-w-md mx-auto px-6"
        >
          {/* Main Loading Animation */}
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div
                className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>

              {/* Inner Ring */}
              <div className="absolute inset-4 border-2 border-blue-500/30 rounded-full"></div>
              <div
                className="absolute inset-4 border-2 border-transparent border-t-blue-300 rounded-full animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/20">
                  <Code2 className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Brand Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
              REFRACT
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
            <p className="text-gray-300 text-lg font-medium">
              Code Review Platform
            </p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-6">
            <div className="space-y-3">
              {loadingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-3 transition-all duration-500 ${
                      isActive
                        ? "opacity-100 scale-105"
                        : isCompleted
                        ? "opacity-60"
                        : "opacity-30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "border-blue-400 bg-blue-400/20"
                          : isActive
                          ? `border-current ${step.color}`
                          : "border-gray-600"
                      }`}
                    >
                      {isCompleted ? (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      ) : (
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? step.color : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : isCompleted
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {step.text}
                    </span>
                    {isActive && (
                      <div className="flex space-x-1 ml-auto">
                        <div
                          className="w-1 h-1 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Loading components</span>
                <span>{Math.round(Math.min(progress, 100))}%</span>
              </div>
            </div>
          </div>

          {/* Status Text */}
          <div className="text-gray-400 text-sm">
            {progress < 100
              ? "Preparing your development environment..."
              : "Almost ready!"}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
