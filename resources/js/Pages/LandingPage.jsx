import React, { useState, useEffect } from "react";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HeroSection from '@/Components/sections/HeroSection';
import AboutSection from '@/Components/sections/AboutSection';
import ProjectsSection from '@/Components/sections/ProjectsSection';
import PortfolioSection from '@/Components/sections/PortfolioSection';
import ClientsSection from '@/Components/sections/ClientsSection';
import ContactSection from '@/Components/sections/ContactSection';
import axios from 'axios';
import { Head } from '@inertiajs/react';

export default function LandingPage() {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await axios.get('/api/landing-page');
            setContent(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching content:', error);
            // Fallback data if API fails
            setContent({
                hero: [
                    { key: 'title', value: 'Welcome to OmahIoT', metadata: {} },
                    { key: 'subtitle', value: 'IoT Solutions & Digital Innovation', metadata: {} }
                ],
                navbar: [
                    { key: 'logo_text', value: 'OmahIoT', metadata: {} }
                ]
            });
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    const projects = [
        {
            title: "MOKO",
            description: "MOKO memudahkan pengelolaan kolam koi",
            image: "/assets/images/koi1-1.png",
            category: "IoT Solution",
        },
        {
            title: "AUTOFEEDER",
            description: "Meningkatkan kualitas berbagai jenis ikan",
            image: "/assets/images/autofeeder1-1.png",
            category: "IoT Solution",
        },
        {
            title: "MONIK",
            description: "MONIK memudahkan pengelolaan greenhouse",
            image: "/assets/images/hidroponik1-1.png",
            category: "IoT Solution",
        },
        {
            title: "MOBAN",
            description: "MOBAN membantu memantau curah hujan di tempat yang rawan.",
            image: "/assets/images/monitoringhujan.png",
            category: "IoT Solution",
        },
        {
            title: "MANIS",
            description: "MANIS memudahkan pengelolaan lahan pertanian.",
            image: "/assets/images/penyiraman1-1.png",
            category: "IoT Solution",
        },
        {
            title: "MOCKA",
            description: "MOCKA untuk kandang ayam closed house dan konvensional",
            image: "/assets/images/kandangayam1-1.png",
            category: "IoT Solution",
        },
        {
            title: "WEBSITE",
            description: "Jasa pembuatan custom website",
            image: "/assets/images/website.png",
            category: "Digital Solution",
        },
        {
            title: "ANDROID",
            description: "Jasa pembuatan custom android",
            image: "/assets/images/androidd.png",
            category: "Digital Solution",
        },
    ];

    const filteredProjects = activeFilter === "all" 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    const logos = [
        { src: "/assets/images/logo/bawen.png", alt: "Bawen" },
        { src: "/assets/images/logo/hab.png", alt: "HAB" },
        { src: "/assets/images/logo/jgkoi.jpg", alt: "JG Koi" },
        { src: "/assets/images/logo/kartika.jpg", alt: "Kartika" },
        { src: "/assets/images/logo/kois.png", alt: "Kois" },
        { src: "/assets/images/logo/logo_mkc.jpg", alt: "MKC" },
        { src: "/assets/images/logo/logoznamalaysiaasli.jpg", alt: "ZNA Malaysia" },
        { src: "/assets/images/logo/mustika.png", alt: "Mustika" },
        { src: "/assets/images/logo/polines.png", alt: "Polines" },
        { src: "/assets/images/logo/renadjaja.jpg", alt: "Renadjaja" },
        { src: "/assets/images/logo/turus.png", alt: "Turus" },
        { src: "/assets/images/logo/singaporekoishow.jpg", alt: "Singapore Koi Show" },
    ];

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
        <>
            <Head title="Landing Page" />
            <div className="w-full">
                <Navbar />
                <HeroSection handleExploreClick={handleExploreClick} />
                <AboutSection />
                <ProjectsSection 
                    activeFilter={activeFilter} 
                    setActiveFilter={setActiveFilter} 
                    filteredProjects={filteredProjects}
                />
                <PortfolioSection />
                <ClientsSection logos={logos} />
                <ContactSection />
                <Footer />
            </div>
        </>
    );
}
