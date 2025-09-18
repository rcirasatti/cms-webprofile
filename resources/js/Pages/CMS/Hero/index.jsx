import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import HeroForm from './form';
import HeroSection from '@/Components/sections/HeroSection';
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
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Title:</span>
                                                <p className="text-gray-900 mt-1">{title}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Subtitle:</span>
                                                <p className="text-gray-900 mt-1">{subtitle}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Button Text:</span>
                                                <p className="text-gray-900 mt-1">{buttonText}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Background Image:</span>
                                                <p className="text-gray-900 mt-1 text-sm break-all">
                                                    {contents.find(c => c.key === 'background_image')?.value || 'No image set'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                  
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
                                    <HeroSection 
                                        handleExploreClick={handleExploreClick} 
                                        content={contents} 
                                        isPreview={true}
                                    />
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
