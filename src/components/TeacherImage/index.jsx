import React from "react";
import { Roles } from "../../constants/roles";

const TeacherImage = (props) => {
  const { name, slug, tags, image, price, teams } = props || {};
  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );
  return (
    <>
      <div className="teacher__list-item">
        <div className="img">
          <img src={teacherInfo.image} alt="Giảng viên CFD" />
        </div>
        <div className="info">
          <p className="label">Creative Front-End Dev</p>
          <h3 className="title --t3">{teacherInfo.name}</h3>
        </div>
      </div>
    </>
  );
};

export default TeacherImage;
