import { DEFAULT_CODE } from "./constants.js";

export const createInitialState = () => ({
  code: DEFAULT_CODE,
  language: "JavaScript",
  description: "",
  selectedCharacter: "",

  review: "",
  reviewStyle: "",
  hasReview: false,

  loading: false,
  error: "",
  retryAfter: 0,
  isDialogOpen: false,

  history: [],
  historyLoading: false,
  historyError: "",
  searchTerm: "",
  filterLanguage: "all",
  sortBy: "newest",
  expandedItems: new Set(),
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false,
  },
});
