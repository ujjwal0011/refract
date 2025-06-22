import { STYLE_EMOJI_MAP } from "../constants.js";

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStyleEmoji = (style) => {
  return STYLE_EMOJI_MAP[style] || "🤖";
};
