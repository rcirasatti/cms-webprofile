import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';

export default function DashboardWithSidebar({ stats = {} }) {
    const [showActivitiesModal, setShowActivitiesModal] = useState(false);
    // Default stats if not provided
    const defaultStats = {
        totalPortfolios: 0,
        totalProjects: 0,
        totalClients: 0,
        totalContent: 0,
        activeContent: 0,
        recentActivities: []
    };

    const actualStats = { ...defaultStats, ...stats };

    const quickStats = [
        {
            name: 'Total Portfolios',
            value: actualStats.totalPortfolios,
            icon: '�️',
            color: 'bg-blue-500',
            description: 'Portfolio items'
        },
        {
            name: 'Total Projects',
            value: actualStats.totalProjects,
            icon: '📁',
            color: 'bg-green-500',
            description: 'Project showcases'
        },
        {
            name: 'Total Clients',
            value: actualStats.totalClients,
            icon: '🤝',
            color: 'bg-purple-500',
            description: 'Client partnerships'
        },
        {
            name: 'Active Content',
            value: actualStats.activeContent,
            icon: '✅',
            color: 'bg-yellow-500',
            description: 'Published items'
        },
    ];

    // Show 3 most recent activities (not last 3)
    const recentActivities = actualStats.recentActivities.length > 0
        ? actualStats.recentActivities.slice(0, 3)
        : [
            { action: 'Welcome to OmahIoT CMS Dashboard', time: 'Just now', icon: '�' },
            { action: 'Smart home system initialized', time: 'Today', icon: '⚙️' },
        ];

    const sections = [
        {
            name: 'Portfolios',
            route: 'cms.portfolio',
            description: 'Showcase IoT projects and smart home solutions',
            icon: '🖼️',
            color: 'bg-green-500',
        },
        {
            name: 'Projects',
            route: 'cms.project',
            description: 'Manage smart home and IoT implementations',
            icon: '🏠',
            color: 'bg-blue-500',
        },
        {
            name: 'Clients',
            route: 'cms.client',
            description: 'Track client partnerships and collaborations',
            icon: '🤝',
            color: 'bg-purple-500',
        },
    ];

    return (
        <SidebarLayout>
            <Head title="Dashboard - OmahIoT CMS" />

            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-lg shadow-lg p-6 mb-6">
                {/* Background gradient similar to hero section - darkened for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,72%,35%)] via-[hsl(148,41%,45%)]/40 to-[hsl(146,51%,75%)]"></div>
                <div className="absolute inset-0 bg-black/20"></div> {/* Overlay to improve text contrast */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20"></div>
                
                {/* Content */}
                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-xl">
                            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[hsl(146,51%,91%)] to-white">OmahIoT</span>! 🏠
                        </h1>
                        <p className="text-white font-medium drop-shadow-md">Manage your smart home content and IoT systems dashboard.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-6xl text-white drop-shadow-lg">🏡</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickStats.map((stat, index) => {
                    const colors = [
                        { bg: 'bg-gradient-to-br from-[hsl(148,41%,58%)] to-[hsl(148,41%,45%)]', border: 'border-primary/20', accent: 'text-primary', shadow: 'hover:shadow-primary/15' },
                        { bg: 'bg-gradient-to-br from-[hsl(210,72%,35%)] to-[hsl(210,72%,25%)]', border: 'border-secondary/20', accent: 'text-secondary', shadow: 'hover:shadow-secondary/15' },
                        { bg: 'bg-gradient-to-br from-[hsl(148,41%,52%)] to-[hsl(210,72%,30%)]', border: 'border-primary/25', accent: 'text-primary', shadow: 'hover:shadow-primary/20' },
                        { bg: 'bg-gradient-to-br from-[hsl(146,51%,75%)] to-[hsl(148,41%,58%)]', border: 'border-primary/30', accent: 'text-primary', shadow: 'hover:shadow-primary/25' }
                    ];
                    const color = colors[index % colors.length];
                    return (
                        <div key={stat.name} className={`bg-white rounded-xl shadow-sm border ${color.border} hover:shadow-xl ${color.shadow} transition-all duration-300 overflow-hidden group hover:scale-[1.03] hover:-translate-y-1`}>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${color.bg} group-hover:shadow-lg flex items-center justify-center text-white text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-2xl font-bold text-gray-900 group-hover:${color.accent} transition-colors duration-300`}>{stat.value}</div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className={`text-sm font-semibold text-gray-900 group-hover:${color.accent} transition-colors duration-300`}>{stat.name}</h3>
                                    <p className="text-xs text-gray-600">{stat.description}</p>
                                </div>
                            </div>
                            <div className={`h-1 ${color.bg} group-hover:h-2 transition-all duration-300`}></div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                            <div className="flex items-center space-x-3">
                                <div className="text-sm text-gray-500">All time</div>
                                <button
                                    onClick={() => setShowActivitiesModal(true)}
                                    className="text-sm text-secondary font-semibold hover:text-secondary-dark hover:underline transition-colors duration-300 flex items-center"
                                >
                                    View All <span className="ml-1">→</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/5 hover:shadow-md transition-all duration-300 group hover:scale-[1.02]">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary/15 group-hover:bg-secondary/25 group-hover:shadow-sm rounded-full flex items-center justify-center text-sm border border-secondary/20 group-hover:border-secondary/40 transition-all duration-300 group-hover:scale-110">
                                        {activity.icon || '📝'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href={route('cms.portfolio')}
                                className="flex items-center justify-between p-3 bg-secondary/8 hover:bg-secondary/15 hover:shadow-lg rounded-lg transition-all duration-300 group border border-secondary/20 hover:border-secondary/40 hover:scale-[1.02]"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-secondary group-hover:bg-secondary/90 group-hover:shadow-md rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 group-hover:scale-110">
                                        🖼️
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">Add Portfolio</span>
                                </div>
                                <div className="text-secondary group-hover:text-secondary/80 group-hover:translate-x-2 transition-all duration-300">
                                    →
                                </div>
                            </Link>

                            <Link
                                href={route('cms.project')}
                                className="flex items-center justify-between p-3 bg-secondary/8 hover:bg-secondary/15 hover:shadow-lg rounded-lg transition-all duration-300 group border border-secondary/20 hover:border-secondary/40 hover:scale-[1.02]"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-secondary group-hover:bg-secondary/90 group-hover:shadow-md rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 group-hover:scale-110">
                                        📁
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">Add Project</span>
                                </div>
                                <div className="text-secondary group-hover:text-secondary/80 group-hover:translate-x-2 transition-all duration-300">
                                    →
                                </div>
                            </Link>

                            <Link
                                href={route('cms.client')}
                                className="flex items-center justify-between p-3 bg-secondary/8 hover:bg-secondary/15 hover:shadow-lg rounded-lg transition-all duration-300 group border border-secondary/20 hover:border-secondary/40 hover:scale-[1.02]"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-secondary group-hover:bg-secondary/90 group-hover:shadow-md rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 group-hover:scale-110">
                                        🤝
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">Add Client</span>
                                </div>
                                <div className="text-secondary group-hover:text-secondary/80 group-hover:translate-x-2 transition-all duration-300">
                                    →
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Modal */}
            {showActivitiesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">All Activities</h2>
                                <button
                                    onClick={() => setShowActivitiesModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Total: {actualStats.recentActivities.length} activities
                            </p>
                        </div>
                        <div className="p-6 max-h-96 overflow-y-auto">
                            <div className="space-y-4">
                                {actualStats.recentActivities.length > 0 ? (
                                    actualStats.recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                                            <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-lg border border-secondary/20">
                                                {activity.icon || '📝'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">📝</div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
                                        <p className="text-gray-500">Activities will appear here when you make changes to your content.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowActivitiesModal(false)}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
