import { useCallback } from "react";
import { submitReview, handleApiError } from "../utils/apiHandlers.js";
import { validateReviewRequest } from "../utils/validators.js";

export const useReviewActions = (state, updateState, fetchHistory) => {
  const handleReview = useCallback(async () => {
    const validationError = validateReviewRequest(
      state.code,
      state.selectedCharacter,
      state.retryAfter
    );

    if (validationError) {
      updateState({ error: validationError });
      return;
    }

    updateState({
      loading: true,
      error: "",
      isDialogOpen: true,
      review: "",
      reviewStyle: "",
    });

    try {
      const data = await submitReview(
        state.code,
        state.language,
        state.selectedCharacter,
        state.description
      );

      updateState({
        review: data.review,
        reviewStyle: data.reviewStyle || "",
        hasReview: true,
      });

      // Refresh history after successful review
      await fetchHistory();
    } catch (error) {
      console.error("Review failed:", error);
      handleApiError(error, updateState);
    } finally {
      updateState({ loading: false });
    }
  }, [
    state.code,
    state.language,
    state.selectedCharacter,
    state.description,
    state.retryAfter,
    updateState,
    fetchHistory,
  ]);

  const clearError = useCallback(() => {
    updateState({ error: "" });
  }, [updateState]);

  const closeDialog = useCallback(() => {
    updateState({ isDialogOpen: false });
  }, [updateState]);

  const openDialog = useCallback(() => {
    updateState({ isDialogOpen: true });
  }, [updateState]);

  return {
    handleReview,
    clearError,
    closeDialog,
    openDialog,
  };
};
