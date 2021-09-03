import {
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
} from "../firebase/firebase";

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};
export const startFacebookLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider);
  };
};
export const logout = () => ({
  type: "LOGOUT",
});

export const startLogout = () => {
  return () => {
    firebase.auth().signOut();
    window.location = "/";
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    return;
  };
};
