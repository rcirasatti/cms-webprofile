import React from "react";

const HeroSection = ({ handleExploreClick }) => {
return (
    <section
    id="home"
    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c2c1f]/80 via-background/90 to-background pt-16"
    >
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3A2F]/30 via-background/50 to-background"></div>
        <div className="absolute w-full h-full opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A6741]/40 rounded-full mix-blend-multiply filter blur-[128px] animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C3A2F]/40 rounded-full mix-blend-multiply filter blur-[128px] animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-[128px] animate-float-delayed"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-30"></div>
    </div>

    <div className="container mx-auto px-4 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
        <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#4CAF50] to-white animate-gradient">
                OmahIoT
            </span>
            </h1>
        </div>

        <p className="text-xl md:text-2xl font-medium mb-8 max-w-3xl mx-auto text-foreground/80 animate-fade-in-delay-1 leading-relaxed">
            Transforming Ideas into Solutions with
            <span className="text-primary font-semibold"> IoT </span>
            and
            <span className="text-secondary font-semibold">
            {" "}
            Digital Innovation
            </span>
        </p>

        <div className="flex flex-col items-center space-y-8 animate-fade-in-delay-2">
            <button
            onClick={handleExploreClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-primary rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,103,65,0.3)] active:scale-95 overflow-hidden"
            >
            <span className="absolute inset-0 bg-gradient-to-r from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
            <span className="relative flex items-center">
                Explore Our Solutions
                <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
                </svg>
            </span>
            </button>

            <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-foreground/70">
                Scroll to discover
            </span>
            <div className="animate-bounce">
                <svg
                className="w-5 h-5 text-foreground/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
                </svg>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
);
};

export default HeroSection;
