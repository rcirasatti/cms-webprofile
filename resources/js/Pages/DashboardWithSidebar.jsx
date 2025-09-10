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

    const recentActivities = actualStats.recentActivities.length > 0 ? actualStats.recentActivities.slice(-3) : [
        { action: 'Welcome to CMS Dashboard', time: 'Just now', icon: '🎉' },
        { action: 'System initialized successfully', time: 'Today', icon: '⚙️' },
    ];

    const sections = [
        {
            name: 'Portfolios',
            route: 'cms.portfolio',
            description: 'Manage portfolio items and case studies',
            icon: '🖼️',
            color: 'bg-blue-500',
        },
        {
            name: 'Projects',
            route: 'cms.project',
            description: 'Showcase projects and achievements',
            icon: '�',
            color: 'bg-green-500',
        },
        {
            name: 'Clients',
            route: 'cms.client',
            description: 'Manage client logos and partnerships',
            icon: '🤝',
            color: 'bg-purple-500',
        },
        {
            name: 'Content',
            route: 'cms.sections',
            description: 'Edit website content and sections',
            icon: '�',
            color: 'bg-yellow-500',
        },
    ];

    return (
        <SidebarLayout>
            <Head title="Dashboard" />

            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
                        <p className="text-blue-100">Here's what's happening with your CMS today.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-6xl opacity-20">📊</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl`}>
                                    {stat.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-gray-900">{stat.name}</h3>
                                <p className="text-xs text-gray-500">{stat.description}</p>
                            </div>
                        </div>
                        <div className={`h-1 ${stat.color}`}></div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                            <div className="flex items-center space-x-3">
                                <div className="text-sm text-gray-500">All time</div>
                                <button
                                    onClick={() => setShowActivitiesModal(true)}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View All →
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                                        {activity.icon || '📝'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href={route('cms.portfolio')}
                                className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
                                        🖼️
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Add Portfolio</span>
                                </div>
                                <div className="text-blue-500 group-hover:translate-x-1 transition-transform">
                                    →
                                </div>
                            </Link>

                            <Link
                                href={route('cms.project')}
                                className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">
                                        📁
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Add Project</span>
                                </div>
                                <div className="text-green-500 group-hover:translate-x-1 transition-transform">
                                    →
                                </div>
                            </Link>

                            <Link
                                href={route('cms.client')}
                                className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">
                                        🤝
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">Add Client</span>
                                </div>
                                <div className="text-purple-500 group-hover:translate-x-1 transition-transform">
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
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">All Activities</h2>
                                <button
                                    onClick={() => setShowActivitiesModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
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
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
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
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
