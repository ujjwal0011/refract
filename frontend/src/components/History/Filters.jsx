import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, SortAsc } from "lucide-react";

const HistoryFilters = ({
  searchTerm,
  setSearchTerm,
  filterLanguage,
  setFilterLanguage,
  sortBy,
  setSortBy,
  uniqueLanguages,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="bg-black/20 backdrop-blur-sm border border-gray-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <CardContent className="p-3 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </div>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews..."
                className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>

            {/* Language Filter */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Filter className="w-4 h-4" />
                <span>Language</span>
              </div>
              <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                <SelectTrigger className="w-full bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500/50 focus:ring-blue-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem
                    value="all"
                    className="text-white hover:bg-gray-800"
                  >
                    All Languages
                  </SelectItem>
                  {uniqueLanguages.map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="text-white hover:bg-gray-800"
                    >
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <SortAsc className="w-4 h-4" />
                <span>Sort By</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500/50 focus:ring-blue-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem
                    value="newest"
                    className="text-white hover:bg-gray-800"
                  >
                    Newest First
                  </SelectItem>
                  <SelectItem
                    value="oldest"
                    className="text-white hover:bg-gray-800"
                  >
                    Oldest First
                  </SelectItem>
                  <SelectItem
                    value="language"
                    className="text-white hover:bg-gray-800"
                  >
                    Language
                  </SelectItem>
                  <SelectItem
                    value="character"
                    className="text-white hover:bg-gray-800"
                  >
                    Character
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryFilters;
