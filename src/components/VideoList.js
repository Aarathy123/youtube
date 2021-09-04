import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import selectVideos from "../selectors/videos";
import {
  startAddComment,
  getComment,
  startEditComment,
  eraseComment,
  startRemoveComment,
  updateVideo,
} from "../actions/video";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

const VideoList = ({
  videos,
  startAddComment,
  comment,
  commentKey,
  getComment,
  startEditComment,
  eraseComment,
  isGlobal,
  startRemoveComment,
  updateVideo,
  uid,
}) => {
  const [video, setVideo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComment, setModalCommentOpen] = useState(false);
  const [videoComment, setVideoComment] = useState("");
  const setVideoDetails = ({ title, description, videoUrl }) => {
    setVideo({ title, description, videoUrl });
    setModalOpen(true);
  };
  const setComments = (video) => {
    setVideoComment("");
    getComment(video.id);
    setVideo(video);
    setModalCommentOpen(true);
  };

  const onSubmitComment = () => {
    setModalCommentOpen(false);
    const videoData = { ...video, comment: videoComment, commentKey };
    if (
      comment &&
      videoData &&
      comment.length > 0 &&
      videoData.comment.length > 0
    ) {
      startEditComment(videoData);
    } else if (
      videoData &&
      videoData.comment.length === 0 &&
      comment &&
      comment.length > 0
    ) {
      startRemoveComment(commentKey, video.id);
    } else {
      startAddComment(videoData);
    }
    setVideoComment("");
    eraseComment();
  };

  useEffect(() => {
    setVideoComment(comment);
  }, [comment]);
  return (
    <div
      className={
        (videos && videos.length > 0 && "video__container") ||
        "video__containerNoVideo"
      }
    >
      {videos &&
        videos.map((video) => {
          return (
            <div className="video__format">
              <div>
                <img
                  src={video.thumbnail}
                  className="video__thumbnail"
                  onClick={() => setVideoDetails(video)}
                />
              </div>
              <div style={{ margin: "2rem" }}>
                <h3>{video.title}</h3>
                <div style={{ display: "flex" }}>
                  <div>
                    <div
                      className={
                        (uid === video.uploadedById &&
                          "video__detailsWithPublic") ||
                        "video__withoutPublic"
                      }
                    >
                      <div style={{ marginBottom: "1rem" }}>
                        Description: {video.description}
                      </div>
                      {uid === video.uploadedById && (
                        <div style={{ display: "flex" }}>
                          <div>Public:</div>
                          <div style={{ margin: "0.5rem" }}>
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={video.isPublic}
                                onChange={() =>
                                  updateVideo({
                                    ...video,
                                    isPublic: !video.isPublic,
                                    isGlobal,
                                  })
                                }
                              />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </div>
                      )}
                      <div style={{ marginBottom: "1rem" }}>
                        Uploaded By: {video.uploadedBy}
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        Uploaded Date:{" "}
                        {moment(video.uploadedDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "2rem" }}>
                      <div style={{ marginLeft: "3rem" }}>
                        <BiCommentDetail
                          size="22"
                          title="Add Comment"
                          onClick={() => setComments(video)}
                        />
                      </div>
                      <div style={{ marginLeft: "3rem" }}>
                        <AiOutlineLike size="22" />
                      </div>
                      <div style={{ marginLeft: "3rem" }}>
                        <AiOutlineDislike size="22" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {(!videos || videos.length === 0) && (
        <div
          className="video__format"
          style={{ height: `64vh`, textAlign: "center" }}
        >
          <div
            style={{ margin: "24rem", fontSize: "larger", fontWeight: "700" }}
          >
            No Videos Available
          </div>
        </div>
      )}
      <Modal
        isOpen={modalComment}
        style={{
          content: { height: "50%", width: "50%", top: "25%", left: "25%" },
          overlay: { backgroundColor: "rgba(255, 255, 255, 0.3)" },
        }}
        onRequestClose={() => {
          setModalCommentOpen(false);
          eraseComment();
        }}
      >
        <div style={{ height: "100%" }}>
          <div>
            <h3>{video.title}</h3>
          </div>
          <div style={{ height: "70%" }}>
            <div>Comments: </div>
            <textarea
              style={{ width: "100%", height: "80%" }}
              value={videoComment}
              onChange={(e) => setVideoComment(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "end" }}>
            <button
              onClick={onSubmitComment}
              disabled={videoComment && comment && videoComment === comment}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalOpen}
        style={{
          content: { height: "70%", width: "60%", top: "15%", left: "25%" },
          overlay: { backgroundColor: "rgba(255, 255, 255, 0.3)" },
        }}
        onRequestClose={() => setModalOpen(false)}
      >
        <div style={{ display: "flex" }}>
          <h3 style={{ margin: "0" }}>{video.title}</h3>
          <div class="close-container" onClick={() => setModalOpen(false)}>
            <div class="leftright"></div>
            <div class="rightleft"></div>
            <label class="close">close</label>
          </div>
        </div>
        <iframe
          className="youtube-player"
          style={{
            width: "93%",
            height: "90%",
            margin: "2rem 3rem",
            boxShadow: "3px 9px 5px grey",
          }}
          id="player"
          type="text/html"
          src={video.videoUrl}
          frameBorder="0"
        ></iframe>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  videos: selectVideos(state.video.videos, state.filters, state.auth.uid),
  uid: state.auth.uid,
  comment: state.video.comment,
  commentKey: state.video.commentKey,
  isGlobal: state.video.isGlobal,
});

const mapDispatchToProps = (dispatch) => ({
  startAddComment: (videoData) => dispatch(startAddComment(videoData)),
  getComment: (videoId) => dispatch(getComment(videoId)),
  startEditComment: (videoData) => dispatch(startEditComment(videoData)),
  eraseComment: () => dispatch(eraseComment()),
  startRemoveComment: (key, id) => dispatch(startRemoveComment(key, id)),
  updateVideo: (video) => dispatch(updateVideo(video)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
