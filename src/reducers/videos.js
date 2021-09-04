const videosReducerDefaultState = [];
export default (state = videosReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.videos, isGlobal: action.isGlobal };
    case "OPEN_FILTER":
      return { ...state, openFilter: true };
    case "CLOSE_FILTER":
      return { ...state, openFilter: false };
    case "SET_VIDEO_COMMENT":
      return { ...state, ...action.comment };
    case "ERASE_COMMENT":
      return { ...state, comment: "" };
    default:
      return state;
  }
};
