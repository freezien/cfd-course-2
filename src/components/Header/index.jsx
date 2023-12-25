import React, { useEffect, useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderHambuger from "./HeaderHambuger";
import HeaderAuthen from "./HeaderAuthen";
import HeaderLogged from "./HeaderLogged";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }

    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($("header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }

    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);
  return (
    <>
      <header
        id="header"
        className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
      >
        <div className="container-fluid">
          <HeaderHambuger />
          <HeaderLogo />
          {/* <HeaderAuthen /> */}
          {/* user logged */}
          <HeaderLogged />
        </div>
      </header>
    </>
  );
};

export default Header;
