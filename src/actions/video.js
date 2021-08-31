import database from "../firebase/firebase";

export const addVideo = (video) => ({
  type: "ADD_VIDEO",
  video,
});

export const startAddVideo = (videoData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = "",
      videoUrl = "",
      description = 0,
      isPublic = 0,
    } = videoData;
    const video = { title, videoUrl, description, isPublic };
    return database
      .ref(`users/${uid}/videos`)
      .push(video)
      .then((ref) => {
        dispatch(
          addVideo({
            id: ref.key,
            ...video,
          })
        );
      });
  };
};

export const setVideos = (videos) => ({
  type: "SET_VIDEOS",
  videos,
});

export const startSetVideos = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/videos`)
      .once("value")
      .then((snapshot) => {
        const videos = [];
        snapshot.forEach((childSnapShot) => {
          videos.push({
            id: childSnapShot.key,
            ...childSnapShot.val(),
          });
        });
        return videos;
      })
      .then((videos) => {
        return dispatch(setVideos(videos));
      });
  };
};
