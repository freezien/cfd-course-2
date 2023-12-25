import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import { PATHS } from "../../constants/pathnames";
import { Roles } from "../../constants/roles";

const CourseItem = (props) => {
  const { name, slug, tags, image, price, teams } = props || {};
  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );

  return (
    <>
      <div className="courses__list-item">
        <div className="img">
          <NavLink to={PATHS.COURSES + `/${slug}`}>
            <img src={image} alt="Khóa học CFD" className="course__thumbnail" />
            {tags && (
              <span className="course__img-badge badge">
                {tags?.join(" | ") || ""}
              </span>
            )}
          </NavLink>
        </div>
        <div className="content">
          <p className="label">{name}</p>
          <h3 className="title --t3">
            <NavLink to={PATHS.COURSES_DETAIL}>{name}</NavLink>
          </h3>
          <div className="content__info">
            <div className="user">
              {teacherInfo && (
                <>
                  <div className="user__img">
                    <img src={teacherInfo.image} alt="Avatar teacher" />
                  </div>
                  <p className="user__name">{teacherInfo.name}</p>
                </>
              )}
            </div>
            <div className="price">
              <strong>{formatCurrency(price)} đ</strong>
            </div>
          </div>
          <div className="content__action" style={{ display: "flex" }}>
            <Link to={`/register/${slug}`} className="btn btn--primary">
              Đăng ký ngay
            </Link>
            <Link to={`/register/${slug}`} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseItem;
