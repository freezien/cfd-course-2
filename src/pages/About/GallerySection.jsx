import React from "react";

const GallerySection = ({ images }) => {
  return (
    <>
      <section className="aboutgallery --scpadding">
        <div className="container">
          <h2 className="aboutgallery__title title --t2 --white">
            CFD Circle{" "}
            <span className="color--primary">là một team gắn kết,</span> <br />
            cùng nhau học tập, vui chơi và phát triển
          </h2>
          <div className="aboutgallery__imgs">
            {images?.length > 0 &&
              images.map((image, index) => {
                return <img src={image} key={index} alt="CFD Circle" />;
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default GallerySection;
