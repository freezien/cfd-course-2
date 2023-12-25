import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { useAuthen } from "../AuthenContext";

const HeaderLogged = () => {
  const { profileInfo, onLogout, openAuthenModal } = useAuthen();

  return (
    <>
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
          >
            <div className="userlogged__avatar-img user__img">
              <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div className="userlogged__dropdown dropdown">
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <Link
                to="profile"
                className="user__info"
                onClick={() => {
                  if (!!!profileInfo?.id) {
                    openAuthenModal();
                  }
                }}
              >
                <p className="title --t4">
                  <strong>{profileInfo?.firstName || "User Name"}</strong>
                </p>
                <span className="email">{profileInfo?.email || "Email"}</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <NavLink
                to={PATHS.PROFILE.COURSES}
                onClick={() => {
                  if (!!!profileInfo?.id) {
                    openAuthenModal();
                  }
                }}
              >
                Khóa học của tôi
              </NavLink>
              <NavLink
                to={PATHS.PROFILE.PAYMENT}
                onClick={() => {
                  if (!!!profileInfo?.id) {
                    openAuthenModal();
                  }
                }}
              >
                Lịch sử thanh toán
              </NavLink>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
                    openAuthenModal();
                  } else {
                    onLogout();
                  }
                }}
              >
                {!!profileInfo?.id ? "Đăng xuất" : "Đăng Nhập"}{" "}
                <i>
                  <img src="/img/iconlogout.svg" alt="" />
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLogged;
