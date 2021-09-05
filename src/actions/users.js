import database from "../firebase/firebase";
import { login } from "./auth";
import { getAllVideos } from "./video";
export const addUser = (user) => ({
  type: "ADD_USER",
  user,
});

export const startAddUser = (userData = {}) => {
  return (dispatch) => {
    const {
      name = "",
      emailId = "",
      dateOfBirth = "",
      password = "",
    } = userData;
    const user = { name, emailId, dateOfBirth, password };
    return database
      .ref(`userInfo/${name.toLowerCase().split(" ").join("")}`)
      .push(user)
      .then((ref) => {
        dispatch(
          addUser({
            id: ref.key,
            ...user,
          })
        );
      });
  };
};

export const checkUser = (user) => ({
  type: "CHECK_USER",
  user,
});
export const userIsPresent = () => ({
  type: "USER_PRESENT",
});
export const noUserPresent = () => ({
  type: "NO_USER_PRESENT",
});
export const startCheckUser = (userData = "") => {
  return (dispatch) => {
    return (
      (userData.length > 0 &&
        database
          .ref(`userInfo/${userData.toLowerCase().split(" ").join("")}`)
          .once("value")
          .then((snapshot) => {
            const user = [];
            snapshot.forEach((childSnapShot) => {
              user.push({
                id: childSnapShot.key,
                ...childSnapShot.val(),
              });
            });
            return user;
          })
          .then((userPresent) => {
            if (userPresent.length > 0) {
              dispatch(userIsPresent());
            } else {
              dispatch(noUserPresent());
            }
          })) ||
      dispatch(noUserPresent())
    );
  };
};

export const loginExists = (user) => ({
  type: "LOGIN_EXISTS",
  user,
});

export const noLoginExists = () => ({
  type: "NO_LOGIN_EXISTS",
});

export const startCheckLogin = (userData = {}) => {
  return (dispatch) => {
    const { userName = "", password = "" } = userData;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(userName)) {
      dispatch(noLoginExists());
      return;
    }
    return database
      .ref(`userInfo/${userName.toLowerCase().split(" ").join("")}`)
      .once("value")
      .then((snapshot) => {
        const user = [];
        snapshot.forEach((childSnapShot) => {
          user.push({
            id: childSnapShot.key,
            ...childSnapShot.val(),
          });
        });
        return user;
      })
      .then((userPresent) => {
        if (userPresent.length > 0) {
          const userDetails = userPresent[0];
          if (userDetails.password === password) {
            sessionStorage.setItem("userId", userDetails.id);
            sessionStorage.setItem("userName", userDetails.name);
            dispatch(login(userDetails.id));
            dispatch(getAllVideos());
          } else {
            dispatch(noLoginExists());
          }
        } else {
          dispatch(noLoginExists());
        }
      });
  };
};
