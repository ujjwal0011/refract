"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCodeReview } from "../context/CodeReviewContext";
import { motion } from "framer-motion";

import LoadingScreen from "../components/History/Loading";
import FilterSection from "../components/History/Filters";
import HistoryItem from "../components/History/Item";
import EmptyState from "../components/History/EmptyState";
import ErrorBanner from "../components/History/ErrorBanner";
import PaginationControls from "../components/History/Pagination";
import StatsOverview from "../components/History/StatsOverview";

const ReviewHistory = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    history,
    historyLoading,
    historyError,
    searchTerm,
    setSearchTerm,
    filterLanguage,
    setFilterLanguage,
    sortBy,
    setSortBy,
    pagination,

    fetchHistory,
    refreshHistory,
    clearHistoryError,
    getFilteredHistory,
    getUniqueLanguages,

    getStyleEmoji,
    formatTimestamp,
  } = useCodeReview();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    fetchHistory(1, 6);

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage) => {
    fetchHistory(newPage, pagination.limit);
  };

  const filteredHistory = getFilteredHistory();
  const uniqueLanguages = getUniqueLanguages();

  if (isInitialLoading || historyLoading) {
    return <LoadingScreen />;
  }

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
      />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          {/* Error Banner */}
          {historyError && (
            <ErrorBanner error={historyError} onDismiss={clearHistoryError} />
          )}

          {/* Stats Overview */}
          <StatsOverview
            totalReviews={history.length}
            filteredCount={filteredHistory.length}
            uniqueLanguages={uniqueLanguages.length}
            pagination={pagination}
          />

          {/* Filter Section */}
          <FilterSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterLanguage={filterLanguage}
            setFilterLanguage={setFilterLanguage}
            sortBy={sortBy}
            setSortBy={setSortBy}
            uniqueLanguages={uniqueLanguages}
            filteredCount={filteredHistory.length}
          />

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 space-y-4"
          >
            {filteredHistory.length === 0 ? (
              <EmptyState
                hasReviews={history.length > 0}
                onCreateReview={() => navigate("/dashboard")}
              />
            ) : (
              filteredHistory.map((item, index) => (
                <HistoryItem
                  key={`${item._id || index}-${item.createdAt}`}
                  item={item}
                  index={index}
                  getStyleEmoji={getStyleEmoji}
                  formatTimestamp={formatTimestamp}
                />
              ))
            )}
          </motion.div>

          {/* Pagination */}
          {filteredHistory.length > 0 && (
            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
              onRefresh={refreshHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewHistory;
