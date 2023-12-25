import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { courseService } from "../../services/courseService";
import useQuery from "../../hooks/useQuery";
import PageLoading from "../../components/PageLoading";
import useDebounce from "../../hooks/useDebounce";
import useMutation from "../../hooks/useMutation";
import { formatCurrency, formatTimeDisplay } from "../../utils/format";
import { Roles } from "../../constants/roles";
import { questionService } from "../../services/questionService";
import HeroSection from "../CourseDetail/HeroSection";
import ContentDetailSection from "../CourseDetail/ContentDetailSection";
import FeaturedSection from "../CourseDetail/FeaturedSection";
import FaqSection from "../CourseDetail/FaqSection";
import CoursesSection from "../CourseDetail/CoursesSection";
import HeaderTop from "../CourseDetail/HeaderTop";

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // const {
  //   data: courseDetail,
  //   loading: courseDetailLoading,
  //   error: courseDetailError,
  // } = useQuery(() => courseService.getCourseBycourseSlug(slug), [slug]);
  // const { teams, price, description } = courseDetail || {};

  // const teacherInfo = teams?.find((member) =>
  //   member.tags?.includes(Roles.Teacher)
  // );

  // const teacherRef = useRef();
  // const scrollToSection = () => {
  //   teacherRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const { data: questionsData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );

  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourse
  );

  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (slug) execute(slug || "", {});
  }, [slug]);

  // Modify data
  const questions = questionsData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/register/` + slug;

  const { teams, startDate, price } = courseDetailData || {};
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(Roles.Teacher)),
    startDate: formatTimeDisplay(startDate || ""),
    price: formatCurrency(price),
    orderLink,
    navigate,
  };

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  const pageLoading = useDebounce(apiLoading, 500);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </>
  );
};

export default CourseDetail;
