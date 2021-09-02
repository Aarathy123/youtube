import moment from "moment";

const filtersReducerDefaultState = {
  title: "",
  uploadDate: moment().startOf("month"),
};
export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TITLE_FILTER":
      return {
        ...state,
        title: action.title,
      };
    case "SET_DATE_FILTER":
      return {
        ...state,
        uploadDate: action.uploadDate,
      };
    default:
      return state;
  }
};
