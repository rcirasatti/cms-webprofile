import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContactForm from './form';
import ContactSection from '@/Components/sections/ContactSection';
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
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Title:</span>
                                                <p className="text-gray-900 mt-1">{title}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Email:</span>
                                                <p className="text-gray-900 mt-1">{email}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Phone:</span>
                                                <p className="text-gray-900 mt-1">{phone}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Address:</span>
                                                <p className="text-gray-900 mt-1">{address}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <span className="text-sm font-medium text-gray-600">Description:</span>
                                            <p className="text-gray-900 mt-1 text-sm">{subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Live Preview Section */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-y-auto border shadow-sm">
                                    <ContactSection content={contents} isPreview={true} />
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
