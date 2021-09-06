import { Link } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { history } from "../routes/AppRouter";
import { FaFilter } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

import {
  setCloseFilter,
  setOpenFilter,
  onNewVideoClick,
} from "../actions/video";
export const Header = (props) => {
  return (
    <header className={`header ${!props.openNewVideo && "header__ZIndex"}`}>
      <div>
        <div className="header__content">
          <Link to="/dashboard">
            <img className="header__titlepic" src="/images/videoLogo2.PNG" />
            {/* <h1>Video Connect</h1> */}
          </Link>
          <div className="header__upload">
            {history.location.pathname !== "/newVideo" && (
              <div style={{ display: "flex" }}>
                <div className="header__filter">
                  <FaFilter onClick={props.openFilter} title="Filter" />
                </div>
                <div className="header__newVideo">
                  <MdLibraryAdd
                    size="22"
                    onClick={props.onNewVideoClick}
                    title="Add New Video"
                  />
                </div>
              </div>
            )}
            <button
              className="button__logout button"
              onClick={props.startLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  openFilter: () => dispatch(setOpenFilter()),
  closeFilter: () => dispatch(setCloseFilter()),
  onNewVideoClick: () => dispatch(onNewVideoClick()),
});

const mapStateToProps = (state) => ({
  openNewVideo: state.video.openNewVideo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
