import moment from "moment";
import database from "../firebase/firebase";

export const addVideo = (video) => ({
  type: "ADD_VIDEO",
  video,
});

export const startAddVideo = (videoData = {}) => {
  return (dispatch, getState) => {
    const auth = getState().auth;
    const {
      title = "",
      videoUrl = "",
      description = 0,
      isPublic = 0,
    } = videoData;
    const video = {
      title,
      videoUrl,
      description,
      isPublic,
      uploadedDate: moment().format("YYYY-MM-DD"),
      uploadedBy: sessionStorage.getItem("userName") || "",
    };
    return database
      .ref(`users/videos/${auth.uid}`)
      .push(video)
      .then((ref) => {
        dispatch(startSetVideos());
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
      .ref(`users/videos/${uid}`)
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

export const getAllVideos = () => {
  return (dispatch) => {
    return database
      .ref(`users/videos`)
      .once("value")
      .then((snapshot) => {
        const videos = [];
        snapshot.forEach((childSnapShot) => {
          childSnapShot.forEach((child) => {
            videos.push({
              id: child.key,
              ...child.val(),
            });
          });
        });
        return videos;
      })
      .then((videos) => {
        return dispatch(setVideos(videos));
      });
  };
};

export const setOpenFilter = () => ({
  type: "OPEN_FILTER",
});

export const setCloseFilter = () => ({
  type: "CLOSE_FILTER",
});
