import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { history } from "../routes/AppRouter";

export const Header = (props) => (
  <header className="header">
    <div>
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <img className="header__titlepic" src="/images/videoLogo2.PNG" />
          {/* <h1>Video Connect</h1> */}
        </Link>
        {history.location.pathname !== "/newVideo" && (
          <div className="header__upload">
            <Link className=" header__title" to="/newVideo">
              Upload New Video
            </Link>
          </div>
        )}
        <button className="button__logout button" onClick={props.startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});
export default connect(undefined, mapDispatchToProps)(Header);
