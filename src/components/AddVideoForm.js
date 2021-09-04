import React, { useEffect, useState } from "react";

const AddVideoForm = (props) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isYoutube, setIsYoutube] = useState(true);
  const [isFaceBook, setIsFaceBook] = useState(false);
  const [isVimeo, setIsVimeo] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [vimeoVideoId, setVimoeVideoId] = useState("");
  const [error, setError] = useState("");
  const getVideoLink = (e) => {
    let url = "";
    if (e) {
      if (isYoutube) {
        const videoId = getYoutubeId(e);
        setYoutubeVideoId(videoId);
        url = `https://www.youtube.com/embed/${videoId}?wmode=opaque&autohide=1&enablejsapi=1`;
      } else if (isVimeo) {
        const vimeoId = getVimeoId(e);
        setVimoeVideoId(vimeoId);
        url = `https://player.vimeo.com/video/${vimeoId}?h=923afc4753`;
      } else if (isFaceBook) {
        setFacebookEmbed(e);
        document.getElementById("facebook").innerHTML = e;
        return;
      }
      setVideoUrl(url);
      setDisplayUrl(e);
    } else {
      setVideoUrl("");
      setDisplayUrl("");
    }
  };
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const getVimeoId = (url) => {
    const match = /vimeo.*\/(\d+)/i.exec(url);
    if (match) {
      return match[1];
    }
  };
  const setVideoPlatform = (type) => {
    switch (type) {
      case "youtube":
        setIsYoutube(!isYoutube);
        setIsVimeo(false);
        setIsFaceBook(false);
        break;
      case "facebook":
        setIsYoutube(false);
        setIsVimeo(false);
        setIsFaceBook(!isFaceBook);
        break;
      case "vimeo":
        setIsYoutube(false);
        setIsVimeo(!isVimeo);
        setIsFaceBook(false);
        break;
    }
  };
  useEffect(() => {
    getVideoLink(displayUrl);
  }, [isYoutube, isFaceBook, isVimeo]);
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
      let thumbnail = "";
      if (isYoutube) {
        thumbnail = `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;
      }
      if (isVimeo) {
        thumbnail = `http://vimeo.com/api/v2/video/${vimeoVideoId}.json?callback=showThumb`;
      }
      props.onSubmit({
        title,
        videoUrl,
        description,
        isPublic,
        thumbnail,
      });
      setError("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && error.length > 0 && <p className="form__error">{error}</p>}
        <div className="video__new">
          <h3
            style={{ textAlign: "center", textShadow: "2px 2px burlywood" }}
            className="video__visibility"
          >
            Add New Video
          </h3>
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
                placeholder="Video URL (embed for facebook)"
                value={displayUrl}
                onChange={(e) => setDisplayUrl(e.target.value)}
                onBlur={(e) => getVideoLink(e.target.value)}
              />
              <div className="video__details">
                <div className="video__format">
                  <div>
                    Youtube Url:{" "}
                    <span className="video__id">
                      https://www.youtube.com/watch?v= xxxxxxxx
                    </span>
                  </div>
                  <div>
                    Youtube Short Url:{" "}
                    <span className="video__id">
                      https://youtu.be/ xxxxxxxx
                    </span>
                  </div>
                  <div>
                    Vimeo Url:{" "}
                    <span className="video__id">
                      https://vimeo.com/ xxxxxxxx
                    </span>
                  </div>
                  <div>
                    Facebook Url:
                    <span className="video__id">
                      Give the embed URL {"<iframe.... />"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video__visibility">
              <span style={{ fontWeight: "bold" }}>
                Uploading from:&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <input
                type="checkbox"
                checked={isYoutube}
                onChange={() => setVideoPlatform("youtube")}
              />
              &nbsp;&nbsp; Youtube&nbsp;&nbsp; &nbsp;&nbsp;
              <input
                type="checkbox"
                checked={isFaceBook}
                onChange={() => setVideoPlatform("facebook")}
              />
              &nbsp;&nbsp; Facebook&nbsp;&nbsp; &nbsp;&nbsp;
              <input
                type="checkbox"
                checked={isVimeo}
                onChange={() => setVideoPlatform("vimeo")}
              />
              &nbsp;&nbsp; Vimeo&nbsp;&nbsp; &nbsp;&nbsp;
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
          <div className="wrapper video__saveBtn">
            <button className="video__buttonStyle">Save</button>
          </div>
          {videoUrl && (
            <div className="video__videoVerification">
              <div>
                {isFaceBook && <div id="facebook"></div>}
                {!isFaceBook && (
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
                )}
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
