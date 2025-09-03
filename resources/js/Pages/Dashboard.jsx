import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const quickStats = [
        { name: 'Total Sections', value: '8', icon: '📝' },
        { name: 'Active Content', value: '24', icon: '✅' },
        { name: 'Draft Content', value: '3', icon: '📄' },
        { name: 'Last Updated', value: 'Today', icon: '⏰' },
    ];

    const recentActivities = [
        { action: 'Updated hero title', time: '2 minutes ago' },
        { action: 'Added new project', time: '15 minutes ago' },
        { action: 'Modified about section', time: '1 hour ago' },
        { action: 'Updated contact info', time: '3 hours ago' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Welcome to CMS Dashboard!</h1>
                                    <p className="text-gray-600 mt-2">Manage your landing page content easily.</p>
                                </div>
                                <div className="flex space-x-3">
                                    <Link
                                        href="/"
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View Landing Page
                                    </Link>
                                    <Link
                                        href={route('cms.sections')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Manage Content
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {quickStats.map((stat) => (
                            <div key={stat.name} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-2xl">{stat.icon}</span>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Quick Actions */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route('cms.hero')}
                                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-2xl mr-3">🌟</span>
                                        <div>
                                            <p className="font-medium text-gray-900">Edit Hero Section</p>
                                            <p className="text-sm text-gray-600">Update main banner content</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('cms.about')}
                                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-2xl mr-3">ℹ️</span>
                                        <div>
                                            <p className="font-medium text-gray-900">Manage About</p>
                                            <p className="text-sm text-gray-600">Update company information</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('cms.project')}
                                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-2xl mr-3">🚀</span>
                                        <div>
                                            <p className="font-medium text-gray-900">Add Projects</p>
                                            <p className="text-sm text-gray-600">Showcase your work</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('cms.contact')}
                                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-2xl mr-3">📞</span>
                                        <div>
                                            <p className="font-medium text-gray-900">Update Contact</p>
                                            <p className="text-sm text-gray-600">Manage contact information</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-xs text-gray-600">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href={route('cms.sections')}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        View all sections →
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
