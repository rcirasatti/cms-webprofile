import React from 'react';
import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function Activities({ activities = [] }) {
    return (
        <SidebarLayout>
            <Head title="Activities" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">All Activities</h1>
                        <div className="text-sm text-gray-500">
                            Total: {activities.length} activities
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-secondary/5 hover:shadow-md transition-all duration-300 border border-gray-100 group hover:scale-[1.01]">
                                    <div className="flex-shrink-0 w-10 h-10 bg-secondary/15 group-hover:bg-secondary/25 group-hover:shadow-sm rounded-full flex items-center justify-center text-lg border border-secondary/20 group-hover:border-secondary/40 transition-all duration-300 group-hover:scale-110">
                                        {activity.icon || '📝'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-secondary transition-colors duration-300">{activity.action}</p>
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
            </div>
        </SidebarLayout>
    );
}
