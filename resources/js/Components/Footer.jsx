import React from "react";
import {
    Github,
    Instagram,
    Linkedin,
    MapPin,
    Phone,
    Mail,
    Youtube,
} from "lucide-react";

const Footer = ({ content = [], isPreview = false }) => {
    const currentYear = new Date().getFullYear();

    // Helper function to get content value by key
    const getContentValue = (key, defaultValue = "") => {
        const contentArray = Array.isArray(content) ? content : []; // content is already the footer array
        const item = contentArray.find((item) => item.key === key);
        return item ? item.value : defaultValue;
    };

    const copyright = getContentValue(
        "copyright",
        `© ${currentYear} OmahIoT. All rights reserved.`
    );
    const socialInstagram = getContentValue(
        "social_instagram",
        "https://www.instagram.com/omahiot/"
    );
    const socialLinkedin = getContentValue(
        "social_linkedin",
        "https://www.linkedin.com/company/cv-omah-iot"
    );
    const socialYoutube = getContentValue(
        "social_youtube",
        "https://www.youtube.com/@omahiot3953"
    );
    const tagline = getContentValue("tagline", "Connect With Our Thinks.");
    const address = getContentValue(
        "address",
        "Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277"
    );
    const phone = getContentValue("phone", "+62 8127-6253-242");
    const email = getContentValue("email", "omahiot@gmail.com");
    const mapsUrl = getContentValue(
        "maps_url",
        "https://maps.app.goo.gl/eDAVoRHqWmoYPwfb6"
    );
    const mapsEmbed = getContentValue("maps_embed", "");

    return (
        <footer className={`bg-gradient-to-br from-[hsl(210,72%,25%)] via-[hsl(148,41%,58%)] to-[hsl(210,72%,25%)] ${isPreview ? 'pt-4 pb-2' : 'pt-8 pb-4'} relative overflow-hidden`}>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(148,41%,58%)]/10 via-transparent to-[hsl(210,72%,25%)]/10"></div>
            </div>

            <div className={`${isPreview ? 'px-4' : 'container mx-auto px-4'} relative`}>
                {/* Main Content Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${isPreview ? 'gap-4 pb-3' : 'gap-6 pb-6'}`}>
                    {/* Left Side - Company Info */}
                    <div className="flex flex-col items-center lg:items-start space-y-4">
                        {/* Logo and Tagline */}
                        <div className="text-center lg:text-left">
                            <div className={`${isPreview ? 'h-6 mb-1' : 'h-8 mb-2'}`}>
                                <img
                                    src="/assets/images/logo_omahiot.png"
                                    alt="OmahIoT Logo"
                                    className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <p className={`${isPreview ? 'text-xs' : 'text-sm'} text-white/70 max-w-md mb-3`}>
                                {tagline}
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className={`${isPreview ? 'space-y-1' : 'space-y-2'} text-center lg:text-left`}>
                            <div className={`flex items-center justify-center lg:justify-start gap-2 ${isPreview ? 'text-xs' : 'text-xs'} text-white/60`}>
                                <MapPin className={`${isPreview ? 'w-3 h-3' : 'w-3 h-3'} flex-shrink-0`} />
                                <span>{address}</span>
                            </div>
                            <div className={`flex items-center justify-center lg:justify-start gap-2 ${isPreview ? 'text-xs' : 'text-xs'} text-white/60`}>
                                <Phone className={`${isPreview ? 'w-3 h-3' : 'w-3 h-3'} flex-shrink-0`} />
                                <span>{phone}</span>
                            </div>
                            <div className={`flex items-center justify-center lg:justify-start gap-2 ${isPreview ? 'text-xs' : 'text-xs'} text-white/60`}>
                                <Mail className={`${isPreview ? 'w-3 h-3' : 'w-3 h-3'} flex-shrink-0`} />
                                <span>{email}</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex justify-center lg:justify-start gap-4 pt-2">
                            {socialInstagram && (
                                <a
                                    href={socialInstagram}
                                    className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 transform"
                                    aria-label="Instagram"
                                >
                                    <Instagram className={`${isPreview ? 'w-4 h-4' : 'w-5 h-5'}`} />
                                </a>
                            )}
                            {socialLinkedin && (
                                <a
                                    href={socialLinkedin}
                                    className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 transform"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className={`${isPreview ? 'w-4 h-4' : 'w-5 h-5'}`} />
                                </a>
                            )}
                            {socialYoutube && (
                                <a
                                    href={socialYoutube}
                                    className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 transform"
                                    aria-label="YouTube"
                                >
                                    <Youtube className={`${isPreview ? 'w-4 h-4' : 'w-5 h-5'}`} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Maps */}
                    <div className={`${isPreview ? 'space-y-2' : 'space-y-3'}`}>
                        {/* Map Container with enhanced styling */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-300">
                                <iframe
                                    src={
                                        mapsEmbed ||
                                        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.677076283!2d110.4445869!3d-7.057509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ea05820d3dd%3A0x16c41b874ec723a9!2sJl.+Turus+Asri+IV+No.6%2C+Bulusan%2C+Kec.+Tembalang%2C+Kota+Semarang%2C+Jawa+Tengah+50277!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid"
                                    }
                                    width="50%"
                                    height="100"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={`w-full ${isPreview ? 'h-[120px]' : 'h-[180px]'} grayscale hover:grayscale-0 transition-all duration-500`}
                                    title="Lokasi OmahIoT"
                                ></iframe>

                                {/* Overlay for better visual integration */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Map Action Button */}
                        <div className="text-center lg:text-left">
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 ${isPreview ? 'px-2 py-1' : 'px-3 py-2'} bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20`}
                            >
                                <MapPin className={`${isPreview ? 'w-3 h-3' : 'w-3 h-3'}`} />
                                <span className={`${isPreview ? 'text-xs' : 'text-xs'} font-medium`}>
                                    Buka di Google Maps
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`${isPreview ? 'pt-2 mt-2' : 'pt-4 mt-4'} relative`}>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <p className={`text-center ${isPreview ? 'text-xs' : 'text-xs'} text-white/60 hover:text-white/80 transition-colors duration-300`}>
                        {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
