import React, { useState } from "react";
import { connect } from "react-redux";
import { setTitleFilter } from "../actions/filter";
import { getAllVideos, startSetVideos } from "../actions/video";

const VideoFilters = ({
  openFilter,
  setTitleFilter,
  getAllVideos,
  startSetVideos,
}) => {
  const [title, setTitleFilterValue] = useState("");
  const [uploader, setUploader] = useState("local");
  const onTitleFilterChange = (value) => {
    setTitleFilterValue(value);
    if (value && value.length > 0) {
      setTitleFilter(value);
    }
    if (!value || value.length == 0) {
      setTitleFilter("");
    }
  };

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
      {openFilter && (
        <div className="video__filters">
          <div className="video__searchby">Search BY:</div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "33.33%", margin: "3rem" }}>
              <span>Title: </span>
              <input
                type="search"
                value={title}
                placeholder="Type at least 3 characters"
                style={{ width: "100%" }}
                onChange={(e) => onTitleFilterChange(e.target.value)}
              />
            </div>
            <div style={{ width: "33.33%", margin: "3rem" }}>
              <span>Date of Upload: </span>
              <input type="date" style={{ width: "100%" }} />
            </div>
            <div style={{ width: "33.33%", margin: "3rem" }}>
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
          </div>
        </div>
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setTitleFilter: (title) => dispatch(setTitleFilter(title)),
  getAllVideos: () => dispatch(getAllVideos()),
  startSetVideos: () => dispatch(startSetVideos()),
});
const mapStateToProps = (state) => ({
  openFilter: state.video.openFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoFilters);
