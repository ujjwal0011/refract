import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, X, Play } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCodeReview } from "../../context/CodeReviewContext";

const MarkdownRenderer = ({ content }) => {
  const renderMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let currentElement = null;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = "";

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = line.replace("```", "").trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                {codeBlockLanguage && (
                  <div className="bg-gray-800 px-3 py-2 text-xs text-gray-300 border-b border-gray-700">
                    {codeBlockLanguage}
                  </div>
                )}
                <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                  <code>{codeBlockContent.join("\n")}</code>
                </pre>
              </div>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = "";
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={index}
            className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0"
          >
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-xl font-semibold text-white mb-3 mt-5 first:mt-0"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-lg font-medium text-white mb-2 mt-4 first:mt-0"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.includes("**")) {
        const parts = line.split("**");
        const rendered = parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-semibold text-white">
              {part}
            </strong>
          ) : (
            part
          )
        );
        elements.push(
          <p key={index} className="text-gray-200 mb-2 leading-relaxed">
            {rendered}
          </p>
        );
      } else if (line.includes("`")) {
        const parts = line.split("`");
        const rendered = parts.map((part, i) =>
          i % 2 === 1 ? (
            <code
              key={i}
              className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono"
            >
              {part}
            </code>
          ) : (
            part
          )
        );
        elements.push(
          <p key={index} className="text-gray-200 mb-2 leading-relaxed">
            {rendered}
          </p>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li key={index} className="text-gray-200 mb-1 ml-4">
            • {line.replace(/^[*-] /, "")}
          </li>
        );
      } else if (/^\d+\. /.test(line)) {
        const number = line.match(/^(\d+)\. /)[1];
        elements.push(
          <li key={index} className="text-gray-200 mb-1 ml-4">
            {number}. {line.replace(/^\d+\. /, "")}
          </li>
        );
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 bg-blue-900/20 pl-4 py-2 my-3 text-gray-200"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      } else if (line.trim() === "") {
        elements.push(<br key={index} />);
      } else {
        elements.push(
          <p key={index} className="text-gray-200 mb-2 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return <div className="markdown-content">{renderMarkdown(content)}</div>;
};

const ReviewDialog = () => {
  const { characters } = useAuth();
  const {
    isDialogOpen,
    closeDialog,
    loading,
    review,
    reviewStyle,
    selectedCharacter,
    getStyleEmoji,
  } = useCodeReview();

  useEffect(() => {
    if (isDialogOpen) {
      if (window.lenis) {
        window.lenis.stop();
      }

      document.body.style.overflow = "hidden";
    } else {
      if (window.lenis) {
        window.lenis.start();
      }

      document.body.style.overflow = "";
    }

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isDialogOpen]);

  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        className="w-full max-w-[95vw] h-[90vh] bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl transform transition-all duration-300 ease-out"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onWheel={(e) => e.stopPropagation()}
        style={{
          animation: isDialogOpen
            ? "dialogEnter 0.3s ease-out"
            : "dialogExit 0.3s ease-in",
        }}
      >
        <div className="p-6 pb-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-semibold">Code Review Results</span>
            </div>
            <div className="flex items-center space-x-4">
              {reviewStyle && (
                <div className="bg-blue-600/20 text-blue-300 border border-blue-600/30 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="mr-2">{getStyleEmoji(reviewStyle)}</span>
                  {reviewStyle}
                </div>
              )}
              <button
                onClick={closeDialog}
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex-1 p-6 overflow-hidden"
          style={{ height: "calc(100% - 88px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
            style={{ scrollBehavior: "auto" }}
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-8"
              >
                {/* Main Loader Animation */}
                <div className="relative">
                  {/* Outer rotating ring */}
                  <div className="w-24 h-24 relative">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                    <motion.div
                      className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-blue-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    ></motion.div>

                    {/* Inner rotating ring */}
                    <div className="absolute inset-3 border-2 border-blue-500/30 rounded-full"></div>
                    <motion.div
                      className="absolute inset-3 border-2 border-transparent border-b-blue-300 border-l-blue-300 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    ></motion.div>

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-8 h-8 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-500/40"
                      >
                        <Brain className="w-4 h-4 text-blue-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Character Info */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="bg-blue-600/10 border border-blue-600/30 rounded-lg px-6 py-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {characters.find((char) => char.id === selectedCharacter)
                        ?.emoji || "🤖"}
                    </div>
                    <div>
                      <p className="text-blue-300 font-medium">
                        {characters.find(
                          (char) => char.id === selectedCharacter
                        )?.name || "AI Reviewer"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Analyzing your code
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Loading Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="space-y-3"
                >
                  {[
                    { text: "Parsing code structure", delay: 0 },
                    { text: "Analyzing logic patterns", delay: 1000 },
                    { text: "Generating insights", delay: 2000 },
                    { text: "Crafting review", delay: 3000 },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: step.delay / 1000,
                        ease: "easeInOut",
                      }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{step.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Animated dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="flex items-center justify-center space-x-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="text-gray-400 text-sm"
                >
                  This may take a few moments for a thorough analysis
                </motion.p>
              </motion.div>
            ) : review ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm leading-relaxed"
                onWheel={(e) => e.stopPropagation()}
                style={{ scrollBehavior: "auto" }}
              >
                <MarkdownRenderer content={review} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center mb-4"
                >
                  <Play className="w-8 h-8 text-gray-400" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="text-gray-300 text-lg font-medium mb-2"
                >
                  Ready for Analysis
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="text-gray-400 text-sm"
                >
                  Your code review will appear here
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewDialog;
