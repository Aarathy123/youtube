import moment from "moment";

export default (videos, { title, uploadDate }, uid) => {
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
        return titleMatch && dateMatch && isPublic;
      })) ||
    []
  );
};
