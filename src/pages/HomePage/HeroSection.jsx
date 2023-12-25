import React from "react";
import { useAuthen } from "../../components/AuthenContext";

const HeroSection = () => {
  const { openAuthenModal } = useAuthen();

  // ================= LOAD VIDEO HERO HOME ================
  function loadVideoBG() {
    let videoBgWrap = $(".hero__background-video"),
      srcVideoBg = videoBgWrap.data("src");
    setTimeout(function () {
      videoBgWrap.html(
        '<video preload="none" autoplay loop muted playsinline><source src="' +
          srcVideoBg +
          '" type="video/mp4">Your browser does not support the video tag.</video>'
      );
    }, 500);
  }
  loadVideoBG();

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <div className="container">
            <h1 className="title --white">
              Học Viện Đào Tạo
              <br /> Lập Trình Front-End Thực Chiến
            </h1>
            <p className="text">
              Dạy từ kinh nghiệm, học từ thực tế để tạo ra sản phẩm có giá trị.
            </p>
            <div
              className="btn btn--primary btnmodal"
              onClick={openAuthenModal}
            >
              Bắt đầu học
            </div>
          </div>
        </div>
        <div className="hero__bottom">
          <div className="container-fluid">
            <div className="hero__bottom-social">
              <a href="https://www.facebook.com/cfdcircle" target="_blank">
                <img src="/img/icon-facebook.svg" alt="Facebook CFD" />
              </a>
              <a href="https://www.youtube.com/cfdcircle" target="_blank">
                <img src="/img/icon-youtube.svg" alt="Youtube CFD" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero__background">
          <img
            className="hero__background-img"
            src="/img/bg-hero-home.jpg"
            alt="CFD Training Background"
          />
          <div
            className="hero__background-video"
            // data-src="video/CFD-video-bg2.mp4"
          />
          <video preload="none" autoPlay loop muted playsInline>
            <source src="video/CFD-video-bg2.mp4" type="video/mp4" />
            Your browser does not support the video tag
          </video>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
