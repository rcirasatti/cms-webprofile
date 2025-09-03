import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import PortfolioSection from "./sections/PortfolioSection";
import ClientsSection from "./sections/ClientsSection";
import ContactSection from "./sections/ContactSection";
import axios from 'axios';

function LandingPage() {
    const [page, setPage] = useState({});

    useEffect(() => {
        axios.get('/api/pages/landing-page').then(response => {
            setPage(response.data);
        });
    }, []);

    return (
        <div>
            <h1>{page.title}</h1>
            <p>{page.content}</p>
        </div>
    );
}

export default LandingPage;
// const LandingPage = () => {
//   // Filter for portfolio/projects section
//   const [activeFilter, setActiveFilter] = useState("all");
  
//   const projects = [
//     {
//       title: "MOKO",
//       description: "MOKO memudahkan pengelolaan kolam koi",
//       image: "koi1-1.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "AUTOFEEDER",
//       description: "Meningkatkan kualitas berbagai jenis ikan",
//       image: "autofeeder1-1.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "MONIK",
//       description: "MONIK memudahkan pengelolaan greenhouse",
//       image: "hidroponik1-1.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "MOBAN",
//       description: "MOBAN membantu memantau curah hujan di tempat yang rawan.",
//       image: "monitoringhujan.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "MANIS",
//       description: "MANIS memudahkan pengelolaan lahan pertanian.",
//       image: "penyiraman1-1.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "MOCKA",
//       description: "MOCKA untuk kandang ayam closed house dan konvensional",
//       image: "kandangayam1-1.png",
//       category: "IoT Solution",
//     },
//     {
//       title: "WEBSITE",
//       description: "Jasa pembuatan custom website",
//       image: "website.png",
//       category: "Digital Solution",
//     },
//     {
//       title: "ANDROID",
//       description: "Jasa pembuatan custom android",
//       image: "androidd.png",
//       category: "Digital Solution",
//     },
//   ];
  
//   const filteredProjects = activeFilter === "all" 
//     ? projects 
//     : projects.filter(project => project.category === activeFilter);

//   const logos = [
//     { src: "/LandingPage-OmahIot/logo/bawen.png", alt: "Bawen" },
//     { src: "/LandingPage-OmahIot/logo/hab.png", alt: "HAB" },
//     { src: "/LandingPage-OmahIot/logo/jgkoi.jpg", alt: "JG Koi" },
//     { src: "/LandingPage-OmahIot/logo/kartika.jpg", alt: "Kartika" },
//     { src: "/LandingPage-OmahIot/logo/kois.png", alt: "Kois" },
//     { src: "/LandingPage-OmahIot/logo/logo_mkc.jpg", alt: "MKC" },
//     { src: "/LandingPage-OmahIot/logo/logoznamalaysiaasli.jpg", alt: "ZNA Malaysia" },
//     { src: "/LandingPage-OmahIot/logo/mustika.png", alt: "Mustika" },
//     { src: "/LandingPage-OmahIot/logo/polines.png", alt: "Polines" },
//     { src: "/LandingPage-OmahIot/logo/renadjaja.jpg", alt: "Renadjaja" },
//     { src: "/LandingPage-OmahIot/logo/turus.png", alt: "Turus" },
//     { src: "/LandingPage-OmahIot/logo/singaporekoishow.jpg", alt: "Singapore Koi Show" },
//   ];
  
//   const handleExploreClick = () => {
//     const aboutSection = document.getElementById("about");
//     if (aboutSection) {
//       const offset = 10;
//       const elementPosition = aboutSection.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="w-full">
//       <HeroSection handleExploreClick={handleExploreClick} />
//       <AboutSection />
//       <ProjectsSection 
//         activeFilter={activeFilter} 
//         setActiveFilter={setActiveFilter} 
//         filteredProjects={filteredProjects}
//       />
//       <PortfolioSection />
//       <ClientsSection logos={logos} />
//       <ContactSection />
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;
