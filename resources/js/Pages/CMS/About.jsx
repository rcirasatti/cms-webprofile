import React, { useState } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import AboutForm from "@/Components/CMS/AboutForm";
import { Head } from "@inertiajs/react";

export default function About({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('main');

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <SidebarLayout>
            <Head title="About Section - CMS" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        About Section
                                    </h1>
                                    <p className="text-gray-600">
                                        Manage about section content
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit About Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-3">
                                        ℹ️
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        No about content yet
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        Get started by editing your about content.
                                    </p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit About Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Tab Navigation */}
                                    <div className="border-b border-gray-200">
                                        <nav className="-mb-px flex space-x-8">
                                            <button
                                                onClick={() => setActiveTab('main')}
                                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                                    activeTab === 'main'
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                📝 Main Content
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('features')}
                                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                                    activeTab === 'features'
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                ✨ Features
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('media')}
                                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                                    activeTab === 'media'
                                                        ? 'border-blue-500 text-blue-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                🖼️ Media & Experience
                                            </button>
                                        </nav>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {activeTab === 'main' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Main Content</h3>
                                                <div className="grid md:grid-cols-1 gap-4">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">Title:</span>
                                                        <p className="text-gray-900 mt-1 font-medium">
                                                            {contents.find(c => c.key === 'title')?.value || 'Not set'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">Description:</span>
                                                        <p className="text-gray-900 mt-1 text-sm leading-relaxed">
                                                            {contents.find(c => c.key === 'description')?.value || 'Not set'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'features' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">✨ Features Content</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">Features Title:</span>
                                                        <p className="text-gray-900 mt-1">
                                                            {contents.find(c => c.key === 'features_title')?.value || 'Not set'}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        <div className="bg-white p-3 rounded border">
                                                            <span className="text-sm font-medium text-gray-600">Feature 1:</span>
                                                            <p className="text-gray-900 mt-1 text-sm">
                                                                <strong>{contents.find(c => c.key === 'feature1_title')?.value || 'Not set'}</strong>
                                                                {contents.find(c => c.key === 'feature1_description')?.value && (
                                                                    <span className="block text-gray-600 mt-1">
                                                                        {contents.find(c => c.key === 'feature1_description').value}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="bg-white p-3 rounded border">
                                                            <span className="text-sm font-medium text-gray-600">Feature 2:</span>
                                                            <p className="text-gray-900 mt-1 text-sm">
                                                                <strong>{contents.find(c => c.key === 'feature2_title')?.value || 'Not set'}</strong>
                                                                {contents.find(c => c.key === 'feature2_description')?.value && (
                                                                    <span className="block text-gray-600 mt-1">
                                                                        {contents.find(c => c.key === 'feature2_description').value}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="bg-white p-3 rounded border">
                                                            <span className="text-sm font-medium text-gray-600">Feature 3:</span>
                                                            <p className="text-gray-900 mt-1 text-sm">
                                                                <strong>{contents.find(c => c.key === 'feature3_title')?.value || 'Not set'}</strong>
                                                                {contents.find(c => c.key === 'feature3_description')?.value && (
                                                                    <span className="block text-gray-600 mt-1">
                                                                        {contents.find(c => c.key === 'feature3_description').value}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'media' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">🖼️ Media & Experience</h3>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">About Image:</span>
                                                        <div className="mt-2">
                                                            {contents.find(c => c.key === 'image')?.value ? (
                                                                <div className="flex items-center space-x-3">
                                                                    <img
                                                                        src={contents.find(c => c.key === 'image').value}
                                                                        alt="Current About"
                                                                        className="h-16 w-16 object-cover rounded border"
                                                                    />
                                                                    <div>
                                                                        <p className="text-sm text-gray-600">Image uploaded</p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {contents.find(c => c.key === 'image').value.split('/').pop()}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-500">No image uploaded</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">Experience Badge:</span>
                                                        <div className="mt-2 bg-white p-3 rounded border inline-block">
                                                            <p className="text-lg font-bold text-blue-600">
                                                                {contents.find(c => c.key === 'experience_number')?.value || 'Not set'}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                {contents.find(c => c.key === 'experience_text')?.value || 'Not set'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-6 border-t pt-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Live Preview
                                </h2>
                                <div className="py-8 bg-gradient-to-b from-background via-card to-background relative overflow-hidden rounded-lg h-[400px] overflow-y-auto">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 opacity-[0.02] pattern-grid [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
                                    </div>

                                    <div className="container mx-auto relative px-6">
                                        <div className="max-w-3xl mx-auto text-center mb-8">
                                            <div className="relative inline-block mb-3">
                                                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-50"></div>
                                                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-[#2C3A2F]">
                                                    {contents.find(
                                                        (c) => c.key === "title"
                                                    )?.value || "About Us"}
                                                </h2>
                                                {/* Decorative underline */}
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2C3A2F] to-[#4A6741] rounded-full"></div>
                                            </div>
                                            <p className="text-lg leading-relaxed mt-3 text-foreground/80 max-w-2xl mx-auto">
                                                {contents.find(
                                                    (c) =>
                                                        c.key === "description"
                                                )?.value ||
                                                    "We are a pioneering technology company dedicated to bringing innovative IoT solutions to agricultural, aquacultural, and urban sectors, making technology accessible and impactful for everyone."}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto">
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-semibold text-primary text-center md:text-left mb-2">
                                                    {contents.find(
                                                        (c) =>
                                                            c.key ===
                                                            "features_title"
                                                    )?.value ||
                                                        "Why Choose OmahIoT?"}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="group hover:bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-0.5 rounded-xl transition-all duration-300">
                                                        <div className="flex items-start space-x-4 p-3 rounded-xl bg-card backdrop-blur-sm transition-all duration-300">
                                                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                                                                <svg
                                                                    className="w-6 h-6 text-primary"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                                                                    {contents.find(
                                                                        (c) =>
                                                                            c.key ===
                                                                            "feature1_title"
                                                                    )?.value ||
                                                                        "Innovative IoT Solutions"}
                                                                </h4>
                                                                <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
                                                                    {contents.find(
                                                                        (c) =>
                                                                            c.key ===
                                                                            "feature1_description"
                                                                    )?.value ||
                                                                        "We design and develop custom IoT solutions that address real-world challenges in agriculture, aquaculture, and urban environments."}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="group flex items-start space-x-4 p-3 rounded-lg bg-background/50 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
                                                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                            <svg
                                                                className="w-5 h-5 text-primary"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-sm mb-1">
                                                                {contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "feature2_title"
                                                                )?.value ||
                                                                    "Expert Technical Team"}
                                                            </h4>
                                                            <p className="text-sm text-foreground/70">
                                                                {contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "feature2_description"
                                                                )?.value ||
                                                                    "Our team combines expertise in hardware design, software development, and data analytics to create comprehensive solutions."}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="group flex items-start space-x-4 p-3 rounded-lg bg-background/50 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
                                                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                            <svg
                                                                className="w-5 h-5 text-primary"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-sm mb-1">
                                                                {contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "feature3_title"
                                                                )?.value ||
                                                                    "Sustainable Development"}
                                                            </h4>
                                                            <p className="text-sm text-foreground/70">
                                                                {contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "feature3_description"
                                                                )?.value ||
                                                                    "We prioritize sustainability in our designs, helping clients reduce environmental impact while improving operational efficiency."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative mt-2 md:mt-0">
                                                <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 scale-105"></div>
                                                <div className="relative bg-card rounded-lg p-3 shadow-lg">
                                                    {contents.find(
                                                        (c) => c.key === "image"
                                                    )?.value ? (
                                                        <img
                                                            src={
                                                                contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "image"
                                                                ).value
                                                            }
                                                            alt={
                                                                contents.find(
                                                                    (c) =>
                                                                        c.key ===
                                                                        "title"
                                                                )?.value ||
                                                                "About Us"
                                                            }
                                                            className="w-full h-auto rounded-lg"
                                                            onError={(e) => {
                                                                e.target.style.display =
                                                                    "none";
                                                                e.target.nextElementSibling.style.display =
                                                                    "block";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                                                            <span className="text-gray-500">
                                                                About Image
                                                                Placeholder
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground p-2 rounded-lg shadow-lg">
                                                        <p className="font-bold text-base">
                                                            {contents.find(
                                                                (c) =>
                                                                    c.key ===
                                                                    "experience_number"
                                                            )?.value || "5+"}
                                                        </p>
                                                        <p className="text-xs">
                                                            {contents.find(
                                                                (c) =>
                                                                    c.key ===
                                                                    "experience_text"
                                                            )?.value ||
                                                                "Years Experience"}
                                                        </p>
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
                <AboutForm
                    contents={contents}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
