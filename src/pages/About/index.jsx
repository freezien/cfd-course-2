import React from "react";
import { PATHS } from "../../constants/pathnames";
import Button from "../../components/Button";
import useQuery from "../../hooks/useQuery";
import { galleryService } from "../../services/galleryService";
import { teamService } from "../../services/teamService";
import HeroSection from "../About/HeroSection";
import StorySection from "../About/StorySection";
import BenefitSection from "../About/BenefitSection";
import NumberSection from "../About/NumberSection";
import StudySection from "../About/StudySection";
import GallerySection from "../About/GallerySection";
import TeacherSection from "../About/TeacherSection";
import CallRegister from "../About/CallRegister";

const About = () => {
  const { data: galleriesData, loading: galleryLoading } = useQuery((query) =>
    galleryService.getGalleries(query)
  );
  const images = galleriesData?.galleries[0]?.images || {};

  const { data: dataTeams, loading: loadingTeams } = useQuery((query) =>
    teamService.getTeams(query)
  );
  const teams = dataTeams?.teams || [];

  return (
    <>
      <main className="mainwrapper aboutpage">
        <HeroSection />
        <StorySection />
        <BenefitSection />
        <NumberSection />
        <StudySection PATHS={PATHS} Button={Button} />
        <GallerySection images={images} />
        <TeacherSection teams={teams} />
        <CallRegister Button={Button} PATHS={PATHS} />
      </main>
    </>
  );
};

export default About;
