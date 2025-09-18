import React, { useState } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import AboutForm from "./form";
import AboutSection from "@/Components/sections/AboutSection";
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
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Live Preview
                                </h2>
                                <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-y-auto border shadow-sm">
                                    <AboutSection content={contents} isPreview={true} />
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
