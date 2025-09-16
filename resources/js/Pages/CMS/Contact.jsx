import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContactForm from './Contact/form';
import { Head } from '@inertiajs/react';

export default function Contact({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);

    // Extract contact content for preview
    const title = contents.find(content => content.key === 'title')?.value || 'Contact Us';
    const subtitle = contents.find(content => content.key === 'description')?.value || 'Tertarik dengan layanan kami? Hubungi kami sekarang untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.';
    const address = contents.find(content => content.key === 'address')?.value || 'Your address here';
    const email = contents.find(content => content.key === 'email')?.value || 'your@email.com';
    const phone = contents.find(content => content.key === 'phone')?.value || '+1 234 567 8900';

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Contact Section - CMS" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Contact Section</h1>
                                    <p className="text-gray-600">Manage contact information and details</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Contact Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-3">📞</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No contact content yet</h3>
                                    <p className="text-gray-600 mb-3">Get started by adding your contact information.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Setup Contact Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Current Content Summary */}
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Title:</span>
                                                <p className="text-gray-900 mt-0.5">{title}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Email:</span>
                                                <p className="text-gray-900 mt-0.5">{email}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Phone:</span>
                                                <p className="text-gray-900 mt-0.5">{phone}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Address:</span>
                                                <p className="text-gray-900 mt-0.5">{address}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className="text-sm font-medium text-gray-600">Description:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">{subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Live Preview Section */}
                            <div className="mt-6 border-t pt-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-lg overflow-hidden">
                                    {/* Background Effects */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold text-center mb-4 text-white">
                                            {title}
                                        </h2>
                                        <p className="text-center text-gray-200 mb-8 max-w-2xl mx-auto">
                                            {subtitle}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                                                <div className="text-4xl mb-4">📍</div>
                                                <h3 className="text-xl font-semibold mb-4 text-white">Address</h3>
                                                <p className="text-gray-200">{address}</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                                                <div className="text-4xl mb-4">📧</div>
                                                <h3 className="text-xl font-semibold mb-4 text-white">Email</h3>
                                                <p className="text-gray-200">{email}</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                                                <div className="text-4xl mb-4">📞</div>
                                                <h3 className="text-xl font-semibold mb-4 text-white">Phone</h3>
                                                <p className="text-gray-200">{phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Guide */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Edit Mode:</strong> Click "Edit Contact Content" to modify all contact information at once</p>
                                    <p><strong>Fields Available:</strong> Title, Description, Email, Phone, Address</p>
                                    <p><strong>Live Updates:</strong> Changes are immediately reflected on the landing page</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContactForm
                    contents={contents}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
