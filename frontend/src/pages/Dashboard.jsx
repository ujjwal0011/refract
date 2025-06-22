"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CodeReviewProvider } from "../context/CodeReviewContext";
import { motion } from "framer-motion";

import LoadingScreen from "../components/Dashboard/Loading";
import Configuration from "../components/Dashboard/ConfigurationPanel";
import ContextPanel from "../components/Dashboard/ContextPanel";
import CodeEditor from "../components/Dashboard/CodeEditor";
import ReviewDialog from "../components/Dashboard/ReviewDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  if (isInitialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <CodeReviewProvider>
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

        <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto w-full mt-20"
          >
            <div className="space-y-8">
              {/* Configuration Panel */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                <Configuration />
              </motion.div>

              {/* Context Panel */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <ContextPanel />
              </motion.div>

              {/* Code Editor Panel */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <CodeEditor />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Review Dialog */}
        <ReviewDialog />
      </div>
    </CodeReviewProvider>
  );
};

export default Dashboard;
