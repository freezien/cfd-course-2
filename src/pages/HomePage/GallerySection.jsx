import React, { useEffect } from "react";

const GallerySection = ({ galleries = [], loading = false }) => {
  useEffect(() => {
    // ======================TEAM HOME ===================
    function teamSlider() {
      let $carouselGallery = $(".gallery .list"),
        $progressBar = $(".gallery .timeline .process");

      $carouselGallery.flickity({
        contain: true,
        wrapAround: false,
        freeScroll: true,
        cellAlign: "left",
        lazyLoad: 6,
        imagesLoaded: true,
        wrapAround: true,
        prevNextButtons: false,
      });
      $carouselGallery.on("scroll.flickity", function (event, progress) {
        progress = Math.max(0.05, Math.min(1, progress));
        $progressBar.width(progress * 100 + "%");
      });

      let ctrPrevGallery = $(".gallery .btn_ctr.prev"),
        ctrNextGallery = $(".gallery .btn_ctr.next");

      ctrPrevGallery.on("click", function () {
        $carouselGallery.flickity("previous");
      });
      ctrNextGallery.on("click", function () {
        $carouselGallery.flickity("next");
      });
    }

    const myTimeout = setTimeout(() => {
      if (galleries?.length > 0) {
        teamSlider();
      }
    }, 300);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [galleries]);
  return (
    <>
      <section className="gallery">
        <div className="heading --noline --center">
          <h2 className="heading__title title --t2">
            <span className="color--primary">CFD Circle</span> Là Một Team
          </h2>
        </div>
        <div className="list">
          {galleries?.length > 0 &&
            galleries.map((image, index) => (
              <img data-flickity-lazyload={image} key={image || index} alt="" />
            ))}
        </div>
        <div className="controls" style={{ display: "block" }}>
          <div className="btn_ctr prev" />
          <span>Trượt qua</span>
          <div className="timeline">
            <div className="process" />
          </div>
          <div className="btn_ctr next" />
        </div>
      </section>
    </>
  );
};

export default GallerySection;
