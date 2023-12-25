import React, { useEffect } from "react";
import { useMainContext } from "../MainContext";

const HeaderHambuger = () => {
  const { isShowNavBar, handleShowNavbar } = useMainContext();

  useEffect(() => {
    if (isShowNavBar) {
      $("body").addClass("menu-show");
    } else {
      $("body").removeClass("menu-show");
    }
  }, [isShowNavBar]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    handleShowNavbar?.(!isShowNavBar);
  };
  return (
    <>
      {" "}
      <div
        className={`header__humburger ${!!isShowNavBar ? "--close" : ""}`}
        onClick={toggleMenu}
      >
        <div className="header__humburger-button">
          <span />
          <span />
          <span />
        </div>
        <div className="header__humburger-text">
          <span>Menu</span>
          <span>Đóng</span>
        </div>
      </div>
    </>
  );
};

export default HeaderHambuger;
