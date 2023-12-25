import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__main">
          <li className="navbar__link">
            <NavLink end to="/" className="navbar__item">
              Trang chủ
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATHS.ABOUT} className="navbar__item">
              Về CFD Circle
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATHS.COURSES} className="navbar__item">
              Khóa học
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATHS.BLOG} className="navbar__item">
              Bài viết
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATHS.CONTACT} className="navbar__item">
              Liên hệ
            </NavLink>
          </li>
        </ul>
        <div className="navbar__overlay" />
      </nav>
      <div className="overlay" />
    </>
  );
};

export default NavBar;
