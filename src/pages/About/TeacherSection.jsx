import React from "react";

const TeacherSection = ({ teams }) => {
  return (
    <>
      <section className="aboutteachers --scpadding">
        <div className="container">
          <h2 className="aboutteachers__title title --t2">
            đội ngũ <span className="color--primary">giảng viên và Mentor</span>
          </h2>
          <div className="aboutteachers__list">
            {teams?.length > 0 &&
              teams.map((item, index) => {
                const { id, name, image, jobTitle, tags, description } =
                  item || {};
                return (
                  <div className="itemteacher" key={id || index}>
                    <div className="itemteacher__avatar">
                      <img src={image} alt="CFD Circle" />
                    </div>
                    <div className="itemteacher__info">
                      <div className="itemteacher__info-name">
                        <p className="title --t3">{name}</p>
                        <span className="label badge --teacher">{tags[0]}</span>
                      </div>
                      <h5 className="itemteacher__info-pos label">
                        {jobTitle}
                      </h5>
                      <p className="itemteacher__info-des">{description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeacherSection;
