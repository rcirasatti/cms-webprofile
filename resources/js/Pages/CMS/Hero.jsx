import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/CMS/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Hero({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const { delete: deleteContent } = useForm();

    // Extract hero content for preview
    const title = contents.find(content => content.key === 'title')?.value || 'Welcome to OmahIoT';
    const subtitle = contents.find(content => content.key === 'subtitle')?.value || 'Smart IoT Solutions for Modern Living';
    const buttonText = contents.find(content => content.key === 'button_text')?.value || 'Explore Solutions';

    const handleExploreClick = () => {
        // Preview action - could scroll or show message
        alert('This is a preview of how the hero section will appear on your landing page');
    };

    const handleEdit = (content) => {
        setEditingContent(content);
        setShowForm(true);
    };

    const handleDelete = (content) => {
        if (confirm('Are you sure you want to delete this content?')) {
            deleteContent(route('cms.content.destroy', content.id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingContent(null);
    };

    return (
        <SidebarLayout>
            <Head title="Hero Section - CMS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Hero Section</h1>
                                    <p className="text-gray-600">Manage hero section content</p>
                                </div>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('cms.sections')}
                                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        ← Back to Sections
                                    </Link>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add New Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🌟</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hero content yet</h3>
                                    <p className="text-gray-600 mb-4">Get started by adding your first hero content item.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Hero Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {contents.map((content) => (
                                        <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {content.key}
                                                        </span>
                                                        <span className="text-sm text-gray-500">Order: {content.order}</span>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            content.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {content.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-900 mb-2">{content.value}</p>
                                                    {content.metadata && Object.keys(content.metadata).length > 0 && (
                                                        <div className="text-sm text-gray-600">
                                                            <strong>Metadata:</strong> {JSON.stringify(content.metadata)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2 ml-4">
                                                    <button
                                                        onClick={() => handleEdit(content)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(content)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-8 border-t pt-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h2>
                                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
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
                                        <div className="space-y-8 animate-fade-in max-w-4xl">
                                            <div className="relative inline-block">
                                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                                                    {title.includes('OmahIoT') ? (
                                                        <>
                                                            {title.replace('OmahIoT', '').trim()}{" "}
                                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#4CAF50] to-white animate-gradient">
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

                                            <p className="text-lg md:text-xl font-medium mb-8 max-w-3xl mx-auto text-white/80 animate-fade-in-delay-1 leading-relaxed">
                                                {subtitle}
                                            </p>

                                            <div className="flex flex-col items-center space-y-8 animate-fade-in-delay-2">
                                                <button
                                                    onClick={handleExploreClick}
                                                    className="group relative px-6 py-3 bg-gradient-to-r from-[#2C3A2F] via-[#4A6741] to-primary rounded-xl font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,103,65,0.3)] active:scale-95 overflow-hidden text-sm"
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

                                                                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview Label */}
                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                        PREVIEW
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="hero"
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
