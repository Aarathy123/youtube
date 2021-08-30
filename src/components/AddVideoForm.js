import React, { useState } from "react";

const AddVideoForm = (props) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState("");
  const getVideoLink = (e) => {
    let url = "";
    if (e) {
      url = `https://www.youtube.com/embed/${e}?wmode=opaque&autohide=1&enablejsapi=1`;
      setVideoUrl(url);
      setDisplayUrl(e);
    } else {
      setVideoUrl("");
      setDisplayUrl("");
    }
  };
  const setVisibility = (value, type) => {
    switch (type) {
      case "private":
        setIsPrivate(value);
        setIsPublic(false);
        break;
      case "public":
        setIsPublic(value);
        setIsPrivate(false);
    }
  };
  const saveData = () => {
    if (!title) {
      setTitle(prompt("No title specified! Please give a title"));
    }
    if (!videoUrl) {
      getVideoLink(prompt("No video id specified! Please give a video Id"));
    }
    if (!description) {
      setDescription(
        prompt("No description specified! Please give a description")
      );
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    saveData();
    if (!description || !title || !videoUrl) {
      setError("Please provide Title, VideoId and Description");
    } else {
      props.onSubmit({
        title,
        videoUrl,
        description,
        isPublic,
      });
      setError("");
    }
  };
  return (
    <div className="video__fullPage">
      <form onSubmit={onSubmit}>
        {error && error.length > 0 && <p className="form__error">{error}</p>}
        <div>
          <h3 style={{ textAlign: "center" }}>Add New Video</h3>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "1.2rem",
              }}
            >
              <input
                className="video__title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="video__url">
              <input
                className="video__videoId"
                type="text"
                placeholder="Video ID"
                value={displayUrl}
                onChange={(e) => setDisplayUrl(e.target.value)}
                onBlur={(e) => getVideoLink(e.target.value)}
              />
              <div className="video__details">
                <div className="video__format">
                  <div>
                    Youtube Url: https://www.youtube.com/watch?v=
                    <span className="video__id">xxxxxxxx</span>
                  </div>
                  <div>
                    Youtube Short Url: https://youtu.be/
                    <span className="video__id">xxxxxxxx</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video__url">
              <textarea
                className="video__description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="video__privatePublic">
                <div className="video__visibility">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setVisibility(e.target.checked, "private")}
                  />{" "}
                  Private
                </div>
                <div className="video__visibility">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setVisibility(e.target.checked, "public")}
                  />{" "}
                  Public
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <button>Save</button>
          </div>
          {videoUrl && (
            <div className="video__videoVerification">
              <div>
                <iframe
                  className="youtube-player"
                  style={{
                    width: "280px",
                    height: "250px",
                    boxShadow: "3px 9px 5px grey",
                  }}
                  id="player"
                  type="text/html"
                  src={videoUrl}
                  frameBorder="0"
                ></iframe>
              </div>
              <div className="video__question">
                Is this your video ?&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddVideoForm;
