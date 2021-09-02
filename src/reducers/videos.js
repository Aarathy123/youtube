const videosReducerDefaultState = [];
export default (state = videosReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.videos };
    case "OPEN_FILTER":
      return { ...state, openFilter: true };
    case "CLOSE_FILTER":
      return { ...state, openFilter: false };
    default:
      return state;
  }
};
