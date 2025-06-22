import React, { createContext, useState, useEffect, useCallback } from "react";
import { createInitialState } from "./types.js";
import { LANGUAGE_MAP } from "./constants.js";
import { useReviewActions } from "./hooks/useReviewActions.js";
import { useHistoryActions } from "./hooks/useHistoryActions.js";
import { useUtilities } from "./hooks/useUtilities.js";

export const CodeReviewContext = createContext();

export const CodeReviewProvider = ({ children }) => {
  const [state, setState] = useState(createInitialState);

  useEffect(() => {
    if (state.retryAfter > 0) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          retryAfter: Math.max(0, prev.retryAfter - 1),
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.retryAfter]);

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const historyActions = useHistoryActions(state, updateState);
  const reviewActions = useReviewActions(
    state,
    updateState,
    historyActions.fetchHistory
  );
  const utilities = useUtilities(state);

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      updateState({ language: newLanguage });
    },
    [updateState]
  );

  const setCode = useCallback((code) => updateState({ code }), [updateState]);
  const setDescription = useCallback(
    (description) => updateState({ description }),
    [updateState]
  );
  const setSelectedCharacter = useCallback(
    (selectedCharacter) => updateState({ selectedCharacter }),
    [updateState]
  );
  const setSearchTerm = useCallback(
    (searchTerm) => updateState({ searchTerm }),
    [updateState]
  );
  const setFilterLanguage = useCallback(
    (filterLanguage) => updateState({ filterLanguage }),
    [updateState]
  );
  const setSortBy = useCallback(
    (sortBy) => updateState({ sortBy }),
    [updateState]
  );

  const contextValue = {
    ...state,

    languageMap: LANGUAGE_MAP,
    ...utilities,

    ...reviewActions,
    ...historyActions,

    setCode,
    setLanguage: handleLanguageChange,
    setDescription,
    setSelectedCharacter,
    setSearchTerm,
    setFilterLanguage,
    setSortBy,
  };

  return (
    <CodeReviewContext.Provider value={contextValue}>
      {children}
    </CodeReviewContext.Provider>
  );
};
