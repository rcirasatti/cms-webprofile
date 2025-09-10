import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import HeroForm from '@/Components/CMS/HeroForm';
import { Head } from '@inertiajs/react';

export default function Hero({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);

    // Extract hero content for preview
    const title = contents.find(content => content.key === 'title')?.value || 'Welcome to OmahIoT';
    const subtitle = contents.find(content => content.key === 'subtitle')?.value || 'Smart IoT Solutions for Modern Living';
    const buttonText = contents.find(content => content.key === 'button_text')?.value || 'Explore Solutions';

    const handleExploreClick = () => {
        // Preview action - could scroll or show message
        alert('This is a preview of how the hero section will appear on your landing page');
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <SidebarLayout>
            <Head title="Hero Section - CMS" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Hero Section</h1>
                                    <p className="text-gray-600">Manage hero section content</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Hero Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-3">🌟</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No hero content yet</h3>
                                    <p className="text-gray-600 mb-3">Get started by adding your first hero content item.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Setup Hero Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Current Content Summary */}
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Title:</span>
                                                <p className="text-gray-900 mt-0.5">{title}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Subtitle:</span>
                                                <p className="text-gray-900 mt-0.5">{subtitle}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Button Text:</span>
                                                <p className="text-gray-900 mt-0.5">{buttonText}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Background Image:</span>
                                                <p className="text-gray-900 mt-0.5 text-sm break-all">
                                                    {contents.find(c => c.key === 'background_image')?.value || 'No image set'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                  
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-6 border-t pt-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="relative h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c2c1f]/80 via-background/90 to-background pt-6 rounded-lg">
                                    {/* Background Effects */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3A2F]/30 via-background/50 to-background"></div>
                                        <div className="absolute w-full h-full opacity-30">
                                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A6741]/40 rounded-full mix-blend-multiply filter blur-[128px] animate-float-slow"></div>
                                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C3A2F]/40 rounded-full mix-blend-multiply filter blur-[128px] animate-float"></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-[128px] animate-float-delayed"></div>
                                        </div>
                                        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-30"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="container mx-auto px-4 text-center relative z-10 h-full flex items-center justify-center">
                                        <div className="space-y-6 animate-fade-in max-w-4xl">
                                            <div className="relative inline-block">
                                                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                                                    {title.includes('OmahIoT') ? (
                                                        <>
                                                            {title.replace('OmahIoT', '').trim()}{" "}
                                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white animate-gradient">
                                                                OmahIoT
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#4CAF50] to-white animate-gradient">
                                                            {title}
                                                        </span>
                                                    )}
                                                </h1>
                                            </div>

                                            <p className="text-base md:text-lg font-medium mb-4 max-w-3xl mx-auto text-white/80 animate-fade-in-delay-1 leading-relaxed">
                                                {subtitle}
                                            </p>

                                            <div className="flex flex-col items-center space-y-4 animate-fade-in-delay-2">
                                                <button
                                                    onClick={handleExploreClick}
                                                    className="group relative px-6 py-3 bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-primary rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,103,65,0.3)] active:scale-95 overflow-hidden"
                                                >
                                                    <span className="absolute inset-0 bg-gradient-to-r from-[#4A6741]/20 via-primary/20 to-[#2C3A2F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                                                    <span className="relative flex items-center">
                                                        {buttonText}
                                                        <svg
                                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

                                                <div className="flex flex-col items-center space-y-1">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <HeroForm
                    contents={contents}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
