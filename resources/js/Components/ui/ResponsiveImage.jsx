import React, { useState } from "react";

const ResponsiveImage = ({
    src,
    alt,
    className = "",
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    fallbackSrc = "/assets/images/placeholder.jpg",
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleError = (e) => {
        setError(true);
        if (fallbackSrc && e.target.src !== fallbackSrc) {
            e.target.src = fallbackSrc;
        }
    };

    return (
        <div className={`relative ${className}`}>
            {!loaded && !error && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite] opacity-50"></div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                sizes={sizes}
                className={`transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                } ${className}`}
                onLoad={handleLoad}
                onError={handleError}
            />
            {error && !src.includes(fallbackSrc) && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
                    <div className="text-center text-gray-500">
                        <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-sm">Image not available</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponsiveImage;
