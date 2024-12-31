import AboutVisiarise from "./About_Components.jsx/AboutVisiARise";
import OurMotiveSection from "./About_Components.jsx/OurMotive";
import ProblemSection from "./About_Components.jsx/ProblemSection";
import ServicesSection from "./About_Components.jsx/ServicesSection";
import SolutionSection from "./About_Components.jsx/Solution";
import Visiarise from "./Visiarise";
import Features from "./Features";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Community from "./About_Components.jsx/Community";
import OurTeam from "./About_Components.jsx/OurTeam";

const About = () => {
  
    return (
      <>
      
      <Navbar />
       <AboutVisiarise />
        <Features/>
        <ServicesSection />
        <ProblemSection />
        <SolutionSection />
        <OurMotiveSection />
        <Community/>
        <OurTeam/>
        <Visiarise/>
        <Footer/>
        </>
    );
  };
  
  export default About;