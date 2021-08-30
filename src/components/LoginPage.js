import React, { useState } from "react";
import { startGoogleLogin, startFacebookLogin } from "../actions/auth";
import { startCheckLogin } from "../actions/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
export const LoginPage = ({
  startGoogleLogin,
  startFacebookLogin,
  startCheckLogin,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Video Connect</h1>
        <p>Video Rendering made easy!!!</p>
        <div className={"login-page__parent"}>
          <h3>Login Details</h3>
          <div>
            <div className={"login-page__enclose"}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                className={"login-page__input"}
              />
            </div>
            <div className={"login-page__enclose"}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={"login-page__input"}
              />
            </div>
          </div>
          <div className={"login-page__flexDiv"}>
            <div className={"login-page__checkbox"}>
              <input type="checkbox" />
            </div>
            <div>I have understood the terms and conditions</div>
          </div>
          <button onClick={() => startCheckLogin({ userName, password })}>
            Sign In
          </button>
        </div>
        <div className={"login-page__divider"}></div>
        <div>
          {/* <button className={"login-page__button"} onClick={startLogin}>
            Login with Google
          </button> */}
          <div>
            <button
              class="loginBtn loginBtn--facebook"
              onClick={startFacebookLogin}
            >
              Login with Facebook
            </button>
          </div>

          <div>
            <button
              class="loginBtn loginBtn--google"
              onClick={startGoogleLogin}
            >
              Login with Google
            </button>
          </div>
        </div>
        <div className={"login-page__enclose "}>
          Don't have account?{" "}
          <Link to={{ pathname: "/signup" }}>Sign up now!!!</Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startFacebookLogin: () => dispatch(startFacebookLogin()),
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startCheckLogin: ({ userName, password }) =>
    dispatch(startCheckLogin({ userName, password })),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
