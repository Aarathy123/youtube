import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { HiEmojiHappy, HiEmojiSad } from "react-icons/hi";

const SignUpForm = (props) => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [isSamePW, setIsSamePW] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);
  const [strength, setStrength] = useState(-1);
  const [specialCharacter, setSpecialCharacterAlert] = useState(false);
  const arrayItem = [0, 1, 2, 3, 4];
  const checkStrength = (e) => {
    const value = e.target.value;
    switch (value.length) {
      case 0:
        setStrength(-1);
        break;
      case 1:
      case 2:
        setStrength(1);
        break;
      case 3:
      case 4:
        setStrength(2);
        break;
      case 5:
      case 6:
      case 7:
        setStrength(3);
        break;
      case 8:
        setStrength(4);
        break;
      default:
        setStrength(5);
    }
    setPassword(value);
  };

  const checkPassword = (e) => {
    const value = e.target.value;
    setConfirmPW(value);
    setIsSamePW(value === password);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert("Please give a password");
    } else if (!isSamePW) {
      alert("Please confirm the password by entering the correct one");
    } else if (!disclaimer) {
      alert("Please check the disclaimer checkbox");
    } else if (!name) {
      alert("Please enter the name");
    } else if (!emailId) {
      alert("Please enter the Email Id");
    } else if (!dateOfBirth) {
      alert("Please enter the Date Of Birth");
    } else {
      props.onSubmit({
        name,
        emailId,
        dateOfBirth,
        password,
      });
    }
  };

  const checkName = (e) => {
    const value = e.target.value;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(value)) {
      setName("");
      setSpecialCharacterAlert(true);
    } else {
      setSpecialCharacterAlert(false);
      setName(value);
      props.startCheckUser(value);
    }
  };
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Welcome to Video Connect</h1>
        <p>Video Rendering made easy!!!</p>
        <div className={"login-page__parent"}>
          <h3>Sign Up Details</h3>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div>
              <div className={"login-page__enclose"}>
                <input
                  type="text"
                  placeholder={`${
                    (props.userPresent && "User Name already taken") ||
                    (specialCharacter && "Special Characters not allowed") ||
                    "User Name"
                  }`}
                  value={(!props.userPresent && name) || ""}
                  onChange={checkName}
                  className={`login-page__input ${
                    (props.userPresent || specialCharacter) &&
                    "login-page__userPresent"
                  }`}
                />
              </div>
              <div className={"login-page__enclose"}>
                <input
                  type="email"
                  placeholder="Email Id"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className={"login-page__input"}
                />
              </div>
              <div className={"login-page__enclose"}>
                <input
                  type="date"
                  title="Date of Birth"
                  value={dateOfBirth || moment()}
                  onChange={(e) => setDOB(e.target.value)}
                  className={"login-page__input"}
                />
              </div>
              <div className={"login-page__password-enclose"}>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={checkStrength}
                  value={password}
                  className={"login-page__input login-page__password"}
                />
                <span className={"login-page__strength"}>
                  {arrayItem.map((item) => {
                    return (
                      <FaStar
                        key={item}
                        color={(strength > item && "green") || "red"}
                      />
                    );
                  })}
                </span>
              </div>
              <div className={"login-page__password-enclose"}>
                <input
                  type="password"
                  value={confirmPW}
                  placeholder="Confirm Password"
                  onChange={checkPassword}
                  className={"login-page__input login-page__password"}
                />
                <span className="login-page__strength">
                  {(isSamePW && <HiEmojiHappy color="green" />) || (
                    <HiEmojiSad color="red" />
                  )}
                </span>
              </div>
            </div>
            <div className={"login-page__flexDiv"}>
              <div className={"login-page__checkbox"}>
                <input
                  type="checkbox"
                  checked={disclaimer}
                  onClick={() => setDisclaimer(!disclaimer)}
                />
              </div>
              <div>I have understood the terms and conditions</div>
            </div>
            <button>Sign Up</button>
          </form>
        </div>
        <div className={"login-page__divider"}></div>
        <div className={"login-page__enclose "}>
          <Link to={{ pathname: "/" }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
