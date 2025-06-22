import { useCallback } from "react";
import { fetchReviewHistory } from "../utils/apiHandlers.js";
import { createInitialState } from "../types.js";

export const useHistoryActions = (state, updateState) => {
  const fetchHistory = useCallback(
    async (page = 1, limit = 20) => {
      updateState({ historyLoading: true, historyError: "" });

      try {
        const data = await fetchReviewHistory(page, limit);

        updateState({
          history: data.reviews || [],
          pagination: data.pagination || createInitialState().pagination,
        });
      } catch (error) {
        console.error("Failed to fetch history:", error);
        updateState({
          historyError: "Failed to load review history. Please try again.",
        });
      } finally {
        updateState({ historyLoading: false });
      }
    },
    [updateState]
  );

  const clearHistoryError = useCallback(() => {
    updateState({ historyError: "" });
  }, [updateState]);

  const toggleExpanded = useCallback(
    (index) => {
      const newExpanded = new Set(state.expandedItems);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      updateState({ expandedItems: newExpanded });
    },
    [state.expandedItems, updateState]
  );

  const refreshHistory = useCallback(() => {
    fetchHistory(state.pagination.page, state.pagination.limit);
  }, [fetchHistory, state.pagination.page, state.pagination.limit]);

  return {
    fetchHistory,
    clearHistoryError,
    toggleExpanded,
    refreshHistory,
  };
};
