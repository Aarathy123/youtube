const videosReducerDefaultState = [];
export default (state = videosReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.videos, isGlobal: action.isGlobal };
    case "OPEN_FILTER":
      return { ...state, openFilter: true, openNewVideo: false };
    case "CLOSE_FILTER":
      return { ...state, openFilter: false };
    case "OPEN_NEW_VIDEO":
      return { ...state, openNewVideo: true, openFilter: false };
    case "CLOSE_NEW_VIDEO":
      return { ...state, openNewVideo: false };
    case "SET_VIDEO_COMMENT":
      return { ...state, comments: action.comments };
    case "ERASE_COMMENT":
      return { ...state, comments: [] };
    default:
      return state;
  }
};
