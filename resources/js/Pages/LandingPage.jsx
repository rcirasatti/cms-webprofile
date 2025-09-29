import React, { useState } from "react";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HeroSection from '@/Components/sections/HeroSection';
import AboutSection from '@/Components/sections/AboutSection';
import ProjectsSection from '@/Components/sections/ProjectsSection';
import PortfolioSection from '@/Components/sections/PortfolioSection';
import ClientsSection from '@/Components/sections/ClientsSection';
import ContactSection from '@/Components/sections/ContactSection';
import { Head } from '@inertiajs/react';

export default function LandingPage({ content = {} }) {
    const [activeFilter, setActiveFilter] = useState("all");

    // Filter projects based on category
    const filteredProjects = content.projects ? content.projects.filter(project => {
        if (activeFilter === "all") return true;
        return project.category === activeFilter;
    }) : [];

    // Handle smooth scroll to About section
    const handleExploreClick = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            const offset = 10;
            const elementPosition = aboutSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <main className="App min-h-screen bg-gradient-to-b from-[#F5F8F5] via-[#EDF3EC] to-[#E8EFEA] relative">
            {/* Background patterns matching omah-iot */}
            <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYTQgNCAwIDEwMCA4IDQgNCAwIDAwMC04eiIgZmlsbD0icmdiYSg3NCwxMDMsNjUsMC4wOCkiLz48L2c+PC9zdmc+')] opacity-20 -z-10" />
            <div className="fixed inset-0 bg-gradient-to-t from-[#E8EFEA] via-transparent to-transparent opacity-50 -z-10" />
            
            <Head title="Landing Page" />
            <div className="w-full">
                <Navbar content={content.navbar || []} />
                <HeroSection handleExploreClick={handleExploreClick} content={content.hero || []} />
                <AboutSection content={content.about || []} />
                <ProjectsSection 
                    activeFilter={activeFilter} 
                    setActiveFilter={setActiveFilter} 
                    filteredProjects={filteredProjects}
                    content={content}
                />
                <PortfolioSection content={content.portfolios || []} />
                <ClientsSection content={content} />
                <ContactSection content={content.contact || []} />
                <Footer content={content.footer || []} />
            </div>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "OmahIoT",
                        "url": "https://omahiot.com",
                        "logo": "https://omahiot.com/assets/images/logo_omahiot.png",
                        "description": "Innovative IoT Solutions for Agriculture, Aquaculture & Urban Development",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Jl. Turus Asri IV No. 6, Bulusan",
                            "addressLocality": "Semarang",
                            "addressRegion": "Jawa Tengah",
                            "postalCode": "50277",
                            "addressCountry": "ID"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+62-8127-6253-242",
                            "contactType": "customer support",
                            "email": "omahiot@gmail.com"
                        },
                        "sameAs": [
                            "https://www.instagram.com/omahiot/",
                            "https://www.linkedin.com/company/cv-omah-iot",
                            "https://www.youtube.com/@omahiot3953"
                        ]
                    })
                }}
            />
        </main>
    );
}
