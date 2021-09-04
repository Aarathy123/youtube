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
      thumbnail = "",
    } = videoData;
    const video = {
      title,
      videoUrl,
      description,
      isPublic,
      thumbnail,
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

export const startAddComment = (videoData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { id, comment = "" } = videoData;
    const video = { comment };
    return database.ref(`users/comments/${id}/${uid}`).push(video);
  };
};
export const setVideos = (videos, isGlobal) => ({
  type: "SET_VIDEOS",
  videos,
  ...isGlobal,
});

export const startEditComment = (videoData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/comments/${videoData.id}/${uid}/${videoData.commentKey}`)
      .set({ comment: videoData.comment });
  };
};
export const startRemoveComment = (commentKey, id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/comments/${id}/${uid}/${commentKey}`).remove();
  };
};

export const updateVideo = (video) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const isGlobal = video.isGlobal;
    delete video.isGlobal;
    return database
      .ref(`users/videos/${uid}/${video.id}`)
      .set(video)
      .then(() => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};
export const getComment = (videoId) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/comments/${videoId}/${uid}`)
      .once("value")
      .then((snapshot) => {
        let comment = {};
        snapshot.forEach((childSnapShot) => {
          comment = { commentKey: childSnapShot.key, ...childSnapShot.val() };
        });
        return comment;
      })
      .then((comment) => {
        return dispatch(setVideoComment(comment));
      });
  };
};

export const eraseComment = () => ({
  type: "ERASE_COMMENT",
});
export const setVideoComment = (comment) => ({
  type: "SET_VIDEO_COMMENT",
  comment,
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
        return dispatch(setVideos(videos, { isGlobal: false }));
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
        return dispatch(setVideos(videos, { isGlobal: true }));
      });
  };
};

export const setOpenFilter = () => ({
  type: "OPEN_FILTER",
});

export const setCloseFilter = () => ({
  type: "CLOSE_FILTER",
});
