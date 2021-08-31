import React, { useState } from "react";
import { startGoogleLogin, startFacebookLogin } from "../actions/auth";
import { startCheckLogin } from "../actions/users";
import { TiWarning } from "react-icons/ti";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
export const LoginPage = ({
  startGoogleLogin,
  startFacebookLogin,
  startCheckLogin,
  noLoginExists,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckBox] = useState(false);
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
                placeholder={
                  (noLoginExists && "Invalid User name or password") ||
                  "User Name"
                }
                className={`login-page__input ${
                  noLoginExists && "login-page__userPresent"
                }`}
              />
            </div>
            <div className={"login-page__enclose"}>
              <input
                type="password"
                value={password}
                placeholder={
                  (noLoginExists && "Invalid User name or password") ||
                  "Password"
                }
                onChange={(e) => setPassword(e.target.value)}
                className={`login-page__input ${
                  noLoginExists && "login-page__userPresent"
                }`}
              />
            </div>
          </div>
          <div className={"login-page__flexDiv"}>
            <div className={"login-page__checkbox"}>
              <input
                type="checkbox"
                checked={checkbox}
                onClick={() => setCheckBox(!checkbox)}
              />
            </div>
            <div>I have understood the terms and conditions</div>
          </div>
          <button
            onClick={() => startCheckLogin({ userName, password })}
            disabled={!(userName && password && checkbox)}
          >
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

        {noLoginExists && (
          <div style={{ margin: "4rem" }}>
            <TiWarning color="red" />
            <p className="login-page__noLogin">Invalid Username or password</p>
          </div>
        )}
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

const mapStateToProps = (state) => ({
  noLoginExists: state.user.noLoginExists,
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
