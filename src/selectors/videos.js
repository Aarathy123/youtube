import moment from "moment";

export default (videos, { title, uploadDate }) => {
  return (
    (videos &&
      videos.filter((video) => {
        const titleMatch = title
          ? video.title.toLowerCase().includes(title.toLowerCase())
          : true;
        const dateMatch = uploadDate
          ? moment(video.uploadDate).isSameOrAfter(uploadDate, "day")
          : true;
        return titleMatch && dateMatch;
      })) ||
    []
  );
};
