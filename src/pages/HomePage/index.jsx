import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";
import { courseService } from "../../services/courseService";
import { teamService } from "../../services/teamService";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";
import { rateService } from "../../services/rateService";
import useQuery from "../../hooks/useQuery";

const HomePage = () => {
  // Courses
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
  } = useQuery(() => courseService.getCourse());
  const courses = coursesData?.courses;

  // Modify data
  const comingCourses = courses?.filter(
    (course) =>
      (course.startDate && new Date(course.startDate) > new Date()) || []
  );

  // Teacher Section
  const {
    data: teamsData,
    error: teamsError,
    loading: teamsLoading,
  } = useQuery(() => teamService.getTeams());
  const teams = teamsData?.teams || [];

  // Rates Section
  const {
    data: rateData,
    error: rateError,
    loading: rateLoading,
  } = useQuery(() => rateService.getRates());
  const rates = rateData?.rates || {};

  // FAQ Question
  const {
    data: questionData,
    error: questionError,
    loading: questionLoading,
  } = useQuery(() => questionService.getQuestions());
  let questions = questionData?.questions || [];

  // Gallary Section
  const {
    data: galleriesData,
    error: galleriesError,
    loading: galleriesLoading,
  } = useQuery(() => galleryService.getGalleries());
  let galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <>
      <>
        <main className="mainwrapper">
          <HeroSection />
          <CourseComingSection
            courses={comingCourses}
            loading={coursesLoading}
          />
          <CoursesSection courses={courses} loading={coursesLoading} />
          <TeacherSection teachers={teams} loading={teamsLoading} />
          <FeaturedSection />

          {/* --------------------------------Testimonial-------------------------------- */}
          <TestimonialSection rates={rates} rateLoading={rateLoading} />
          {/* --------------------------------faq-------------------------------- */}
          <FaqSection questions={questions} loading={questionLoading} />
          <GallerySection galleries={galleries} loading={galleriesLoading} />
          <CallRegisterSection />
        </main>
      </>
    </>
  );
};

export default HomePage;
