import { MAX_CODE_LENGTH } from "../constants.js";

export const validateReviewRequest = (code, selectedCharacter, retryAfter) => {
  if (!code.trim()) {
    return "Please write some code first!";
  }
  if (!selectedCharacter) {
    return "Please select a character for your review!";
  }
  if (code.length > MAX_CODE_LENGTH) {
    return `Code is too long. Please limit to ${MAX_CODE_LENGTH} characters.`;
  }
  if (retryAfter > 0) {
    return `Please wait ${retryAfter} seconds before making another request.`;
  }
  return null;
};
