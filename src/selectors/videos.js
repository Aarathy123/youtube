import moment from "moment";

export default (videos, { title, uploadDate, liked }, uid) => {
  return (
    (videos &&
      videos.filter((video) => {
        const isPublic =
          uid !== video.uploadedById && !video.isPublic ? false : true;
        const titleMatch = title
          ? video.title.toLowerCase().includes(title.toLowerCase())
          : true;
        const dateMatch = uploadDate
          ? moment(video.uploadedDate).isSameOrAfter(uploadDate, "day")
          : true;
        const isLiked = liked === "liked";
        const isDisLiked = liked === "disliked";
        const likeMatch = isLiked
          ? video.likes && video.likes.indexOf(uid) >= 0
          : isDisLiked
          ? video.dislikes && video.dislikes.indexOf(uid) >= 0
          : true;
        return titleMatch && dateMatch && isPublic && likeMatch;
      })) ||
    []
  );
};
