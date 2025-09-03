import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Sections({ auth, sections }) {
    const sectionIcons = {
        hero: '🌟',
        about: 'ℹ️',
        project: '🚀',
        portfolio: '💼',
        client: '👥',
        contact: '📞',
        navbar: '🧭',
        footer: '📄'
    };

    const sectionDescriptions = {
        hero: 'Manage hero section content including titles, subtitles, and call-to-action buttons',
        about: 'Edit about section information and company description',
        project: 'Add, edit, or remove projects from your portfolio',
        portfolio: 'Manage portfolio items and showcase your work',
        client: 'Update client information and testimonials',
        contact: 'Manage contact information and details',
        navbar: 'Configure navigation menu and logo',
        footer: 'Edit footer content and social media links'
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="CMS Sections" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-800">Content Management System</h1>
                                <p className="text-gray-600 mt-2">Manage your landing page content by section</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sections.map((section) => (
                                    <Link
                                        key={section}
                                        href={route('cms.' + section)}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50"
                                    >
                                        <div className="flex items-start">
                                            <span className="text-3xl mr-4">
                                                {sectionIcons[section] || '📝'}
                                            </span>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                                                    {section}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {sectionDescriptions[section] || `Manage ${section} section content`}
                                                </p>
                                                <div className="mt-3">
                                                    <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                                                        Edit Content
                                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Quick Actions</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Preview Landing Page
                                    </Link>
                                    <Link
                                        href="/api/landing-page"
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        View API Data
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
