import React from "react";
import { connect } from "react-redux";
import selectVideos from "../selectors/videos";

const VideoList = ({ videos }) => {
  return (
    <div style={{ height: "80%", margin: "3rem" }}>
      {videos &&
        videos.map(({ title, description, videoUrl, isPublic }) => {
          return (
            <div
              style={{ display: "flex", marginTop: "2rem" }}
              className="video__format"
            >
              <div>
                <iframe
                  className="youtube-player"
                  style={{
                    width: "280px",
                    height: "250px",
                    margin: "2rem 3rem",
                    boxShadow: "3px 9px 5px grey",
                  }}
                  id="player"
                  type="text/html"
                  src={videoUrl}
                  frameBorder="0"
                ></iframe>
              </div>
              <div style={{ margin: "2rem" }}>
                <h3>Title: {title}</h3>
                <p>Description: {description}</p>
                <div style={{ display: "flex" }}>
                  <div>Public:</div>
                  <div style={{ margin: "0.5rem" }}>
                    <label class="switch">
                      <input type="checkbox" checked={isPublic} />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  const videos = selectVideos(state.video.videos, state.filters);
  return { videos };
};

export default connect(mapStateToProps)(VideoList);
