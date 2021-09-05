export const setTitleFilter = (title) => ({
  type: "SET_TITLE_FILTER",
  title,
});

export const setDateFilter = (uploadDate) => ({
  type: "SET_DATE_FILTER",
  uploadDate,
});

export const setLikedFilter = (liked) => ({
  type: "SET_LIKED_FILTER",
  liked,
});
