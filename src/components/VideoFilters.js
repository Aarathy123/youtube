import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  setTitleFilter,
  setDateFilter,
  setLikedFilter,
} from "../actions/filter";
import { getAllVideos, startSetVideos, setCloseFilter } from "../actions/video";

const VideoFilters = ({
  openFilter,
  closeFilter,
  setTitleFilter,
  getAllVideos,
  startSetVideos,
  setDateFilter,
  setLikedFilter,
}) => {
  const [title, setTitleFilterValue] = useState("");
  const [uploader, setUploader] = useState("global");
  const [date, setDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [liked, setLiked] = useState("");
  const onTitleFilterChange = (value) => {
    setTitleFilterValue(value);
    if (value && value.length > 0) {
      setTitleFilter(value);
    }
    if (!value || value.length == 0) {
      setTitleFilter("");
    }
  };

  const onDateFilterChange = (value) => {
    setDate(value);
    setDateFilter(value);
  };

  const onLikedSelect = (e) => {
    setLiked(e.target.value);
    setLikedFilter(e.target.value);
  };
  useEffect(() => {
    setDateFilter(date);
  }, []);
  const onUploadSelect = (e) => {
    setUploader(e.target.value);
    if (e.target.value === "global") {
      getAllVideos();
    } else {
      startSetVideos();
    }
  };
  return (
    <div>
      <Modal
        isOpen={openFilter}
        style={{
          content: { height: "20%", width: "100%", top: "13%", left: "0" },
          overlay: { backgroundColor: "rgba(255, 255, 255, 0.3)" },
        }}
        onRequestClose={() => closeFilter()}
        ariaHideApp={false}
      >
        <div className="video__filters">
          <div className="video__searchby">Search BY:</div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "25%", margin: "3rem" }}>
              <span>Title: </span>
              <input
                type="search"
                value={title}
                placeholder="Type at least 3 characters"
                style={{ width: "100%" }}
                onChange={(e) => onTitleFilterChange(e.target.value)}
              />
            </div>
            <div style={{ width: "25%", margin: "3rem" }}>
              <span>Date of Upload: </span>
              <input
                type="date"
                style={{ width: "100%" }}
                value={date}
                onChange={(e) => onDateFilterChange(e.target.value)}
              />
            </div>
            <div style={{ width: "25%", margin: "3rem" }}>
              <span>Uploaded: </span>
              <select
                onChange={onUploadSelect}
                value={uploader}
                style={{ width: "100%" }}
              >
                <option value="local">Local</option>
                <option value="global">Global</option>
              </select>
            </div>
            <div style={{ width: "25%", margin: "3rem" }}>
              <span>Liked: </span>
              <select
                onChange={onLikedSelect}
                value={liked}
                style={{ width: "100%" }}
              >
                <option value="">Select</option>
                <option value="liked">Liked</option>
                <option value="disliked">Disliked</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setTitleFilter: (title) => dispatch(setTitleFilter(title)),
  getAllVideos: () => dispatch(getAllVideos()),
  startSetVideos: () => dispatch(startSetVideos()),
  setDateFilter: (uploadDate) => dispatch(setDateFilter(uploadDate)),
  closeFilter: () => dispatch(setCloseFilter()),
  setLikedFilter: (liked) => dispatch(setLikedFilter(liked)),
});
const mapStateToProps = (state) => ({
  openFilter: state.video.openFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoFilters);
