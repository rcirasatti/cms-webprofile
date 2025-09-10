import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

export default function SidebarLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Open sidebar by default on large screens, closed on mobile
    useEffect(() => {
        const setByWidth = () => setSidebarOpen(window.innerWidth >= 1024);
        setByWidth();
        window.addEventListener('resize', setByWidth);
        return () => window.removeEventListener('resize', setByWidth);
    }, []);

    const dashboardSections = [
        { name: 'Dashboard', route: 'dashboard', icon: '📊' },
    ];

    const websiteSections = [
        { name: 'Hero Section', route: 'cms.hero', icon: '🚀' },
        { name: 'About Section', route: 'cms.about', icon: 'ℹ️' },
        { name: 'Projects', route: 'cms.project', icon: '📁' },
        { name: 'Portfolio', route: 'cms.portfolio', icon: '🖼️' },
        { name: 'Clients', route: 'cms.client', icon: '🤝' },
        { name: 'Contact', route: 'cms.contact', icon: '📞' },
        { name: 'Navbar', route: 'cms.navbar', icon: '🔝' },
        { name: 'Footer', route: 'cms.footer', icon: '🔻' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar - Full Width from Left Edge - Fixed */}
            <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between h-16 items-center pl-2 pr-4 sm:pr-6 lg:pr-8">
                        {/* Left: absolute toggle + logo (toggle is at left edge) */}
                        <div className="flex items-center">
                            {/* Toggle button placed inline to ensure visibility */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                aria-label="Toggle sidebar"
                                className="mr-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 z-50"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {sidebarOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>

                            <div className="flex items-center">
                                <Link href="/" className="flex items-center">
                                    <ApplicationLogo className="w-8 h-8" />
                                    <span className="ml-2 text-xl font-bold text-gray-800">CMS Admin</span>
                                </Link>
                            </div>
                        </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                            target="_blank"
                        >
                            View Website
                        </Link>
                        {user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                                        <span className="mr-2">{user.name}</span>
                                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <Link
                                href={route('login')}
                                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar - Below Navbar */}
                <aside className={`bg-white shadow-md fixed left-0 top-16 bottom-0 overflow-y-auto z-40 transition-transform duration-300 ease-in-out w-64 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="py-4 px-3 relative">                       

                        {/* Desktop collapse button (lg) */}
                        <div className="hidden lg:block absolute right-3 top-3">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Collapse sidebar"
                                className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Dashboard Section */}
                        <ul className="space-y-2 mb-6">
                            {dashboardSections.map((section) => (
                                <li key={section.route}>
                                    <Link
                                        href={route(section.route)}
                                        className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${
                                            route().current(section.route) ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                                        }`}
                                    >
                                        <span className="w-6 h-6 flex items-center justify-center mr-2 text-xl">
                                            {section.icon}
                                        </span>
                                        <span>{section.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Website Sections - with clear separator */}
                        <div className="border-t pt-4">
                            <div className="px-2 mb-3 bg-gray-100 py-2 rounded-md">
                                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                    Website Sections
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {websiteSections.map((section) => (
                                    <li key={section.route}>
                                        <Link
                                            href={route(section.route)}
                                            className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${
                                                route().current(section.route) ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                                            }`}
                                        >
                                            <span className="w-6 h-6 flex items-center justify-center mr-2 text-xl">
                                                {section.icon}
                                            </span>
                                            <span>{section.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content - Adjusts based on sidebar state */}
                <main className={`w-full transition-all duration-300 ease-in-out pt-16 ${
                    sidebarOpen ? 'lg:ml-64' : 'ml-0'
                }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </main>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
            </div>
        </div>
    );
}
