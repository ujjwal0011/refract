import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCodeReview } from "../../context/CodeReviewContext";

const ContextPanel = () => {
  const { description, setDescription } = useCodeReview();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="bg-black/40 backdrop-blur-sm border-gray-800 border py-8 px-6 shadow-xl rounded-sm transition-all duration-500"
    >
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Context</h2>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Help your reviewer understand your code better:
• What does this code do?
• What specific issues are you facing?
• What would you like feedback on?"
        className="bg-gray-900/60 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          Optional context for better reviews
        </span>
        <span className="text-xs text-gray-300">{description.length}/500</span>
      </div>
    </motion.div>
  );
};

export default ContextPanel;
