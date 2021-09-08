import moment from "moment";
import database from "../firebase/firebase";
import videos from "../selectors/videos";

export const addVideo = (video) => ({
  type: "ADD_VIDEO",
  video,
});

export const startAddVideo = (videoData = {}) => {
  return (dispatch, getState) => {
    const auth = getState().auth;
    const isGlobal = videoData.isGlobal;
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
      uploadedById: auth.uid,
    };
    return database
      .ref(`users/videos/${auth.uid}`)
      .push(video)
      .then((ref) => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};

export const startAddComment = (videoData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { id, comment = "" } = videoData;
    const video = {
      comment,
      uploadedBy: sessionStorage.getItem("userName"),
      uploadedDate: moment().format("DD/MM/YYYY"),
    };
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
    const commentData = {
      comment: videoData.comment,
      uploadedBy: videoData.uploadedBy,
      uploadedDate: moment().format("DD/MM/YYYY"),
    };
    return database
      .ref(`users/comments/${videoData.id}/${uid}/${videoData.commentKey}`)
      .set(commentData);
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
      .ref(`users/comments/${videoId}`)
      .once("value")
      .then((snapshot) => {
        let comments = [];
        snapshot.forEach((childSnapShot) => {
          childSnapShot.forEach((child) => {
            comments.push({
              commentKey: child.key,
              ...child.val(),
              uploadedById: childSnapShot.key,
            });
          });
        });
        return comments;
      })
      .then((comments) => {
        return dispatch(setVideoComment(comments));
      });
  };
};

export const eraseComment = () => ({
  type: "ERASE_COMMENT",
});
export const setVideoComment = (comments) => ({
  type: "SET_VIDEO_COMMENT",
  comments,
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

export const onNewVideoClick = () => ({
  type: "OPEN_NEW_VIDEO",
});

export const closeNewVideo = () => ({
  type: "CLOSE_NEW_VIDEO",
});
export const setCloseFilter = () => ({
  type: "CLOSE_FILTER",
});

export const startSetLike = (video) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const isGlobal = video.isGlobal;
    const data = {
      ...video,
      likes:
        video.likes && video.likes.length > 0 ? video.likes + "," + uid : uid,
    };
    if (data.dislikes) {
      if (
        data.dislikes.indexOf(uid) === 0 &&
        data.dislikes.length === uid.length
      ) {
        delete data.dislikes;
      } else if (data.dislikes.indexOf(uid + ",") >= 0) {
        data.dislikes = data.dislikes.replace(uid + ",", "");
      } else if (data.dislikes.indexOf("," + uid) >= 0) {
        data.dislikes = data.dislikes.replace("," + uid, "");
      }
    }
    return database
      .ref(`users/videos/${video.uploadedById}/${video.id}`)
      .set(data)
      .then(() => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};

export const startRemoveVideo = (videoId, isGlobal) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/videos/${uid}/${videoId}`)
      .remove()
      .then(() => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};
export const removeLike = (video) => {
  return (dispatch, getState) => {
    const videoData = { ...video };
    const uid = getState().auth.uid;
    const isGlobal = video.isGlobal;
    if (video.likes.indexOf(uid) === 0 && video.likes.length === uid.length) {
      delete videoData.likes;
    } else if (video.likes.indexOf(uid + ",") >= 0) {
      videoData.likes = video.likes.replace(uid + ",", "");
    } else if (video.likes.indexOf("," + uid) > 0) {
      videoData.likes = video.likes.replace("," + uid, "");
    }
    return database
      .ref(`users/videos/${video.uploadedById}/${video.id}`)
      .set(videoData)
      .then(() => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};

export const startSetDislike = (video) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const isGlobal = video.isGlobal;
    const data = {
      ...video,
      dislikes:
        video.dislikes && video.dislikes.length > 0
          ? video.dislikes + "," + uid
          : uid,
    };
    if (data.likes) {
      if (data.likes.indexOf(uid) === 0 && data.likes.length === uid.length) {
        delete data.likes;
      } else if (data.likes.indexOf(uid + ",") >= 0) {
        data.likes = data.likes.replace(uid + ",", "");
      } else if (data.likes.indexOf("," + uid) >= 0) {
        data.likes = data.likes.replace("," + uid, "");
      }
    }
    return database
      .ref(`users/videos/${video.uploadedById}/${video.id}`)
      .set(data)
      .then(() => {
        if (isGlobal) {
          dispatch(getAllVideos());
        } else {
          dispatch(startSetVideos());
        }
      });
  };
};

export const removeDislike = (video) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const isGlobal = video.isGlobal;
    if (
      video.dislikes.indexOf(uid) === 0 &&
      video.dislikes.length === uid.length
    ) {
      delete video.dislikes;
    } else if (video.dislikes.indexOf(uid + ",") >= 0) {
      videoData.dislikes = video.dislikes.replace(uid + ",", "");
    } else if (video.dislikes.indexOf("," + uid) > 0) {
      videoData.dislikes = video.dislikes.replace("," + uid, "");
    }
    return database
      .ref(`users/videos/${video.uploadedById}/${video.id}`)
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
