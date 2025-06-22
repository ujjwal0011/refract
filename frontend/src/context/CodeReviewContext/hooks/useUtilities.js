import { useCallback } from "react";
import { formatTimestamp, getStyleEmoji } from "../utils/formatters.js";

export const useUtilities = (state) => {
  const getFilteredHistory = useCallback(() => {
    return state.history
      .filter((item) => {
        const searchLower = state.searchTerm.toLowerCase();
        const matchesSearch =
          !state.searchTerm ||
          [item.code, item.description, item.language, item.reviewStyle].some(
            (field) => field?.toLowerCase().includes(searchLower)
          );

        const matchesLanguage =
          state.filterLanguage === "all" ||
          item.language === state.filterLanguage;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        switch (state.sortBy) {
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "language":
            return a.language.localeCompare(b.language);
          case "character":
            return (a.reviewStyle || "").localeCompare(b.reviewStyle || "");
          default: // newest
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
  }, [state.history, state.searchTerm, state.filterLanguage, state.sortBy]);

  const getUniqueLanguages = useCallback(() => {
    return [...new Set(state.history.map((item) => item.language))];
  }, [state.history]);

  return {
    formatTimestamp,
    getStyleEmoji,
    getFilteredHistory,
    getUniqueLanguages,
  };
};
