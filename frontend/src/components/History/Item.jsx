import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Brain, Calendar, FileText, Copy, Check, X } from "lucide-react";

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

const HistoryItem = ({ item, index, formatTimestamp, getStyleEmoji }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedReview, setCopiedReview] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const isModalOpen = showCodeModal || showReviewModal;

    if (isModalOpen) {
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
  }, [showCodeModal, showReviewModal]);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedReview(true);
        setTimeout(() => setCopiedReview(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full max-w-[calc(50%-0.5rem)]"
      >
        <Card className="group relative overflow-visible bg-black/30 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 min-h-fit">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardContent className="p-6 relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                  <Code2 className="w-3 h-3 mr-1" />
                  {item.language}
                </Badge>
                {item.reviewStyle && (
                  <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                    <span className="mr-1">
                      {getStyleEmoji(item.reviewStyle)}
                    </span>
                    {item.reviewStyle}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                {formatTimestamp(item.createdAt)}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 p-3 bg-gray-900/30 border border-gray-700/30 rounded-sm">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  Context
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description || "No context provided"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCodeModal(true)}
                variant="ghost"
                className="h-auto p-3 justify-start text-left bg-gray-900/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 group/btn flex-1 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-blue-500/20 rounded-sm group-hover/btn:bg-blue-500/30 transition-colors">
                    <Code2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-white text-sm">
                      View Code
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.code?.length || 0} characters
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => setShowReviewModal(true)}
                variant="ghost"
                className="h-auto p-3 justify-start text-left bg-gray-900/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 group/btn flex-1 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-purple-500/20 rounded-sm group-hover/btn:bg-purple-500/30 transition-colors">
                    <Brain className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-white text-sm">
                      View Review
                    </div>
                    <div className="text-xs text-gray-400">
                      Analysis & feedback
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Code Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-15"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCodeModal(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="w-full max-w-[95vw] h-[90vh] bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl transform transition-all duration-300 ease-out"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-white flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-semibold">
                      Code - {item.language}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => copyToClipboard(item.code || "", "code")}
                      className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-sm transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {copiedCode ? "Copied!" : "Copy"}
                      </span>
                    </button>
                    <button
                      onClick={() => setShowCodeModal(false)}
                      className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className="flex-1 p-6 overflow-hidden"
                style={{ height: "calc(100% - 88px)" }}
              >
                <div
                  className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                  style={{ scrollBehavior: "auto" }}
                >
                  <div className="text-sm leading-relaxed">
                    <MarkdownRenderer
                      content={item.code || "No code available"}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-15"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowReviewModal(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="w-full max-w-[95vw] h-[90vh] bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl transform transition-all duration-300 ease-out"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-white flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold">
                      Review Analysis
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {item.reviewStyle && (
                      <div className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-3 py-1 rounded-full text-sm font-medium">
                        <span className="mr-2">
                          {getStyleEmoji(item.reviewStyle)}
                        </span>
                        {item.reviewStyle}
                      </div>
                    )}
                    <button
                      onClick={() =>
                        copyToClipboard(item.review || "", "review")
                      }
                      className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                    >
                      {copiedReview ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {copiedReview ? "Copied!" : "Copy"}
                      </span>
                    </button>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className="flex-1 p-6 overflow-hidden"
                style={{ height: "calc(100% - 88px)" }}
              >
                <div
                  className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                  style={{ scrollBehavior: "auto" }}
                >
                  <div className="text-sm leading-relaxed">
                    <MarkdownRenderer
                      content={item.review || "No review available"}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HistoryItem;
