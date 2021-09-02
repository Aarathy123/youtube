import { Link } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { history } from "../routes/AppRouter";
import { FaFilter } from "react-icons/fa";
import { setCloseFilter, setOpenFilter } from "../actions/video";
export const Header = (props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const onFilterClick = () => {
    if (openFilter) {
      setOpenFilter(!openFilter);
      props.closeFilter();
    } else {
      setOpenFilter(!openFilter);
      props.openFilter();
    }
  };
  return (
    <header className="header">
      <div>
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <img className="header__titlepic" src="/images/videoLogo2.PNG" />
            {/* <h1>Video Connect</h1> */}
          </Link>
          {history.location.pathname !== "/newVideo" && (
            <div style={{ display: "flex" }} className="header__upload">
              <div className="header__filter">
                <FaFilter onClick={onFilterClick} />
              </div>
              <div style={{ margin: "1rem" }}>
                <Link className=" header__title" to="/newVideo">
                  Upload New Video
                </Link>
              </div>
            </div>
          )}
          <button className="button__logout button" onClick={props.startLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  openFilter: () => dispatch(setOpenFilter()),
  closeFilter: () => dispatch(setCloseFilter()),
});

export default connect(undefined, mapDispatchToProps)(Header);
