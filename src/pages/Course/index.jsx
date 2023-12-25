import React, { useState, useEffect } from "react";
import CourseItem from "../../components/CourseItem/index.jsx";
import { courseService } from "../../services/courseService.js";
import { Empty, Skeleton, message } from "antd";
import useQuery from "../../hooks/useQuery.js";
import Input from "../../components/Input/index.jsx";
import useDebounce from "../../hooks/useDebounce.js";

const Courses = () => {
  const { data, loading } = useQuery(courseService.getCourse);
  const courses = data?.courses || [];

  const [searchTerm, setSearchTerm] = useState(undefined);
  const debounceTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Refetch API
    if (typeof debounceTerm === "string") {
      refetch(debounceTerm ? `?search=${debounceTerm}` : "");
    }
  }, [debounceTerm]);

  return (
    <>
      <main className="mainwrapper courses --ptop">
        <div className="container">
          <div className="textbox">
            <div className="container">
              <h2 className="title --t2">Tất cả khoá học</h2>
              <div
                style={{ width: "30%", margin: "0 auto" }}
                className="search"
              >
                <Input
                  type="text"
                  value={searchTerm || ""}
                  placeholder="Tìm kiếm khoá học"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="courses__list">
            {/* Loading Skeleton */}
            {!loading && courses?.length === 0 && (
              <Empty
                description="Không tìm thấy dữ liệu về khoá học"
                style={{ margin: "0 auto" }}
              />
            )}
            {loading &&
              Array(4)
                .fill("")
                .map((_, index) => (
                  <div key={index} className="courses__list-item">
                    <Skeleton
                      active
                      style={{ width: "521px", height: "515px" }}
                    />
                  </div>
                ))}

            {/* Render Courses */}
            {courses?.length > 0 &&
              !loading &&
              courses.map((course, index) => {
                return <CourseItem {...course} key={course?.id || index} />;
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Courses;
