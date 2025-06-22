import axios from "axios";
import { API_BASE_URL } from "../constants.js";

export const submitReview = async (
  code,
  language,
  selectedCharacter,
  description
) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/api/review`,
    {
      code,
      language,
      characterId: selectedCharacter,
      description: description.trim() || undefined,
    },
    { withCredentials: true }
  );
  return data;
};

export const fetchReviewHistory = async (page = 1, limit = 20) => {
  const { data } = await axios.get(`${API_BASE_URL}/api/review`, {
    withCredentials: true,
    params: { page, limit },
  });
  return data;
};

export const handleApiError = (error, updateState) => {
  if (error.response?.status === 429) {
    const retrySeconds = error.response.data.retryAfter || 60;
    updateState({
      retryAfter: retrySeconds,
      error: `Rate limit exceeded. Please wait ${retrySeconds} seconds before trying again.`,
      review: "",
      reviewStyle: "",
      isDialogOpen: false,
    });
  } else if (error.response?.status === 400) {
    updateState({
      error: error.response.data.message || "Invalid request",
      review: "",
      reviewStyle: "",
      isDialogOpen: false,
    });
  } else {
    updateState({
      error:
        "Review service is temporarily unavailable. Please try again in a few minutes.",
      review: "",
      reviewStyle: "",
      isDialogOpen: false,
    });
  }
};
