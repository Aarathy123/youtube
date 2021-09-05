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
  startSetLike,
  startSetDislike,
  removeLike,
  removeDislike,
} from "../actions/video";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

const VideoList = ({
  videos,
  startAddComment,
  comments,
  commentKey,
  getComment,
  startEditComment,
  eraseComment,
  isGlobal,
  startRemoveComment,
  startSetLike,
  startSetDislike,
  updateVideo,
  uid,
  removeLike,
  removeDislike,
}) => {
  const [video, setVideo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComment, setModalCommentOpen] = useState(false);
  const [videoComment, setVideoComment] = useState("");
  const [videoComments, setVideoComments] = useState(comments);
  const [editComments, setEditComments] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");

  const setCommentEdit = ({ commentKey, comment }) => {
    setEditComments(commentKey);
    setEditCommentValue(comment);
  };

  const setVideoDetails = ({ title, description, videoUrl }) => {
    setVideo({ title, description, videoUrl });
    setModalOpen(true);
  };
  const setComments = (video) => {
    setEditComments("");
    setEditCommentValue("");
    setVideoComment("");
    getComment(video.id);
    setVideo(video);
    setModalCommentOpen(true);
  };

  const editComment = (commentData, editComment) => {
    const data = { ...commentData, comment: editComment, ...video };
    startEditComment(data);
    setEditComments("");
    setEditCommentValue("");
    getComment(video.id);
  };
  const onSubmitComment = () => {
    const videoData = { ...video, comment: videoComment, commentKey };
    startAddComment(videoData);
    setVideoComment("");
    eraseComment();
    getComment(video.id);
  };

  const onCommentDelete = (commentKey) => {
    startRemoveComment(commentKey, video.id);
    getComment(video.id);
  };
  useEffect(() => {
    setVideoComments(comments);
  }, [comments, editComments]);
  return (
    <div
      className={
        (videos && videos.length > 0 && "video__container") ||
        "video__containerNoVideo"
      }
    >
      {videos &&
        videos.map((video, index) => {
          return (
            <div className="video__format" key={index}>
              <div>
                <img
                  src={video.thumbnail}
                  className="video__thumbnail"
                  onClick={() => setVideoDetails(video)}
                  title="Click to view video"
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
                            <label className="switch">
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
                              <span className="slider round"></span>
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
                    <div style={{ display: "flex", marginTop: "1rem" }}>
                      <div style={{ marginLeft: "3rem", cursor: "pointer" }}>
                        <BiCommentDetail
                          size="22"
                          title="Comments"
                          onClick={() => setComments(video)}
                        />
                      </div>
                      <div style={{ marginLeft: "3rem", cursor: "pointer" }}>
                        <div>
                          {(video.likes && video.likes.indexOf(uid) !== -1 && (
                            <AiFillLike
                              size="22"
                              onClick={() => removeLike({ ...video, isGlobal })}
                            />
                          )) || (
                            <AiOutlineLike
                              size="22"
                              title="Like"
                              onClick={() =>
                                startSetLike({ ...video, isGlobal })
                              }
                            />
                          )}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {video && video.likes && video.likes.length > 0
                            ? video.likes.split(",").length
                            : 0}
                        </div>
                      </div>
                      <div style={{ marginLeft: "3rem", cursor: "pointer" }}>
                        {(video &&
                          video.dislikes &&
                          video.dislikes.indexOf(uid) !== -1 && (
                            <AiFillDislike
                              size="22"
                              onClick={() =>
                                removeDislike({ ...video, isGlobal })
                              }
                            />
                          )) || (
                          <AiOutlineDislike
                            size="22"
                            title="Dislike"
                            onClick={() =>
                              startSetDislike({ ...video, isGlobal })
                            }
                          />
                        )}
                        <div style={{ textAlign: "center" }}>
                          {video && video.dislikes && video.dislikes.length > 0
                            ? video.dislikes.split(",").length
                            : 0}
                        </div>
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
          content: { height: "70%", width: "50%", top: "15%", left: "25%" },
          overlay: { backgroundColor: "rgba(255, 255, 255, 0.3)" },
        }}
        onRequestClose={() => {
          setModalCommentOpen(false);
          eraseComment();
        }}
        ariaHideApp={false}
      >
        <div style={{ height: "90%" }}>
          <div>
            <h3>{video.title}</h3>
          </div>
          <div>Comments: </div>
          <div style={{ height: "55%", overflow: "auto", margin: "1rem" }}>
            <div>
              {videoComments &&
                videoComments.map((comment, index) => (
                  <div key={index}>
                    {editComments !== comment.commentKey && (
                      <div className="video__comment video__format">
                        <div style={{ width: "40%" }}>
                          <div style={{ margin: "0.2rem" }}>
                            {comment.comment}
                          </div>
                          <div style={{ margin: "0.2rem" }}>
                            Uploaded By: {comment.uploadedBy}
                          </div>
                        </div>
                        {uid === comment.uploadedById && (
                          <div
                            style={{
                              textAlign: "right",
                              marginLeft: "56%",
                              marginTop: "1%",
                            }}
                          >
                            <div>
                              <FiEdit onClick={() => setCommentEdit(comment)} />
                            </div>
                            <div>
                              <RiDeleteBin6Fill
                                onClick={() =>
                                  onCommentDelete(comment.commentKey)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {editComments === comment.commentKey && (
                      <div className="video__comment video__format">
                        <div
                          style={{
                            margin: "0.4rem",
                            width: "100%",
                            marginTop: "1rem",
                          }}
                        >
                          <textarea
                            value={editCommentValue}
                            style={{ width: "90%" }}
                            onChange={(e) =>
                              setEditCommentValue(e.target.value)
                            }
                          />
                        </div>
                        <div
                          style={{ marginTop: " 2.5rem", marginRight: "1rem" }}
                        >
                          <button
                            onClick={() =>
                              editComment(comment, editCommentValue)
                            }
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {!videoComments ||
                (videoComments.length === 0 && (
                  <div className="video__noComments">No Comments added</div>
                ))}
            </div>
          </div>
          <div>Add Comment:</div>
          <textarea
            style={{ width: "100%", height: "20%" }}
            value={videoComment}
            onChange={(e) => setVideoComment(e.target.value)}
          />
          <div style={{ textAlign: "end" }}>
            <button onClick={() => onSubmitComment()}>Submit</button>
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
        ariaHideApp={false}
      >
        <div style={{ display: "flex" }}>
          <h3 style={{ margin: "0" }}>{video.title}</h3>
          <div className="close-container" onClick={() => setModalOpen(false)}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
            <label className="close">close</label>
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
          src={"https://videoshub.com/videos/25311429"}
          frameBorder="0"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  videos: selectVideos(state.video.videos, state.filters, state.auth.uid),
  uid: state.auth.uid,
  comments: state.video.comments,
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
  startSetLike: (videoId) => dispatch(startSetLike(videoId)),
  startSetDislike: (videoId) => dispatch(startSetDislike(videoId)),
  removeLike: (videoId) => dispatch(removeLike(videoId)),
  removeDislike: (videoId) => dispatch(removeDislike(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
