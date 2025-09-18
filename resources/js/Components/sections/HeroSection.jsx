import React from "react";

const HeroSection = ({ handleExploreClick, content = [], isPreview = false }) => {
    // Helper to read value whether `content` is an array of {key,value} or an object
    const getValue = (key, altKey) => {
        if (Array.isArray(content)) {
            const found = content.find((c) => c.key === key || (altKey && c.key === altKey));
            return found?.value;
        }
        if (content && typeof content === 'object') {
            return content[key] ?? (altKey ? content[altKey] : undefined);
        }
        return undefined;
    };

    // Use CMS-provided values when available, otherwise fall back to hard-coded defaults
    const title = getValue('title', 'hero_title') || 'Welcome to OmahIoT';
    const subtitle = getValue('subtitle', 'hero_subtitle') || 'Transforming Ideas into Solutions with IoT and Digital Innovation';
    const buttonText = getValue('button_text', 'buttonText') || 'Explore Our Solutions';

return (
    <section
    id="home"
    className={`relative ${isPreview ? 'h-full' : 'min-h-screen'} flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(210,72%,25%)] via-[hsl(148,41%,58%)]/20 to-[hsl(146,51%,91%)] ${isPreview ? '' : 'pt-16'}`}
    >
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(60, 100%, 10%)]/60 via-[hsl(148,41%,58%)]/30 to-[hsl(146,51%,91%)]/80"></div>
        <div className="absolute w-full h-full opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(148,41%,58%)]/30 rounded-full mix-blend-multiply filter blur-[128px] animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(210,72%,25%)]/30 rounded-full mix-blend-multiply filter blur-[128px] animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[hsl(146,51%,91%)]/20 rounded-full mix-blend-multiply filter blur-[128px] animate-float-delayed"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
    </div>

    <div className="container mx-auto px-4 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
        <div className="relative inline-block">
            <h1 className={`${isPreview ? 'text-2xl md:text-3xl' : 'text-5xl md:text-7xl'} font-bold tracking-tight text-white drop-shadow-lg`}>
            {title.includes('OmahIoT') ? (
                <>
                {title.replace('OmahIoT', '').trim()}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[hsl(146,51%,91%)] to-white animate-gradient">
                    OmahIoT
                </span>
                </>
            ) : (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[hsl(146,51%,91%)] to-white animate-gradient">
                {title}
                </span>
            )}
            </h1>
        </div>

        <p className={`${isPreview ? 'text-base md:text-lg' : 'text-xl md:text-2xl'} font-medium mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in-delay-1 leading-relaxed drop-shadow-md`}>
            {subtitle}
        </p>

        <div className="flex flex-col items-center space-y-8 animate-fade-in-delay-2">
            <button
            onClick={handleExploreClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-[hsl(148,41%,58%)] via-[hsl(210,72%,25%)] to-[hsl(148,41%,58%)] rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_hsl(148,41%,58%,0.4)] active:scale-95 overflow-hidden backdrop-blur-sm"
            >
            <span className="absolute inset-0 bg-gradient-to-r from-[hsl(146,51%,91%)]/10 via-white/10 to-[hsl(146,51%,91%)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
            <span className="relative flex items-center font-semibold">
                {buttonText}
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
            <span className="text-sm text-black/80 drop-shadow-sm">
                Scroll to discover
            </span>
            <div className="animate-bounce">
                <svg
                className="w-5 h-5 text-black/80"
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
