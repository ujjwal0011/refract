import React from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../context/AuthContext";
import { useCodeReview } from "../../context/CodeReviewContext";

const ConfigurationPanel = () => {
  const { groupedCharacters } = useAuth();
  const {
    language,
    setLanguage,
    selectedCharacter,
    setSelectedCharacter,
    languageMap,
  } = useCodeReview();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
      className="bg-black/40 backdrop-blur-sm border-gray-800 border py-8 px-6 shadow-xl rounded-sm transition-all duration-500"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Configuration</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-30">
        <div className="flex-1 max-w-xl">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="bg-gray-900/60 border-gray-700 text-white w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 cursor-pointer">
              {Object.keys(languageMap).map((lang) => (
                <SelectItem
                  key={lang}
                  value={lang}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                >
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 max-w-xl">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Reviewer
          </label>
          <Select
            value={selectedCharacter}
            onValueChange={setSelectedCharacter}
          >
            <SelectTrigger className="bg-gray-900/60 border-gray-700 text-white w-full cursor-pointer">
              <SelectValue placeholder="Select reviewer..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {Object.entries(groupedCharacters).map(([category, chars]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {chars.map((char) => (
                    <SelectItem
                      key={char.id}
                      value={char.id}
                      className="text-white hover:bg-gray-800 cursor-pointer"
                    >
                      {char.emoji} {char.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfigurationPanel;
