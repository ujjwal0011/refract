import { useContext } from "react";
import { CodeReviewContext } from "../CodeContext.jsx";

export const useCodeReview = () => {
  const context = useContext(CodeReviewContext);
  if (!context) {
    throw new Error("useCodeReview must be used within a CodeReviewProvider");
  }
  return context;
};
