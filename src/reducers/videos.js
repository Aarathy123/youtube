const videosReducerDefaultState = [];
export default (state = videosReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return action.videos;
    default:
      return state;
  }
};
