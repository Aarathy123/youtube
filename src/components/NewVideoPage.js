import React, { useState } from "react";

const NewVideoPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [displayURl, setDisplayUrl] = useState("");
  const getVideoLink = (url) => {
    if (url.target.value && url.target.value.indexOf("watch?v=") !== -1) {
      url = url.target.value;
      let video = url.split("watch?v=");
      url = `${video[0]}embed/${video[1]}?wmode=opaque&autohide=1&enablejsapi=1`;
      setVideoUrl(url);
      setDisplayUrl(url);
    } else {
      setVideoUrl("");
      setDisplayUrl("");
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)),url("/images/addVideo.jpg")',
        height: "660px",
      }}
    >
      <div>
        <h3 style={{ textAlign: "center" }}>Add New Video</h3>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "1.2rem",
            }}
          >
            <input
              style={{
                width: "40%",
                height: "5rem",
                borderRadius: "1rem",
                borderColor: "azure",
              }}
              type="text"
              placeholder="Title"
            />
          </div>
          <div style={{ padding: "1.2rem" }}>
            <input
              style={{
                width: "40%",
                width: "40%",
                height: "5rem",
                borderRadius: "1rem",
                borderColor: "azure",
              }}
              type="text"
              placeholder="Video URL"
              onBlur={getVideoLink}
            />
          </div>
          <div style={{ padding: "1.2rem" }}>
            <textarea
              style={{
                width: "40%",
                width: "40%",
                height: "10rem",
                borderRadius: "1rem",
                borderColor: "azure",
              }}
              placeholder="Description"
            />
          </div>
          <div style={{ padding: "1.2rem" }}>
            <div>
              <input type="checkbox" /> Private
            </div>
            <div>
              <input type="checkbox" /> Public
            </div>
          </div>
        </div>

        {videoUrl && (
          <div>
            Is this your video ?{" "}
            <span>
              <iframe
                className="youtube-player"
                style={{
                  width: "300px",
                  height: "300px",
                  boxShadow: "2px 2px 5px grey",
                }}
                id="player"
                type="text/html"
                src={videoUrl}
                frameBorder="0"
              ></iframe>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewVideoPage;
