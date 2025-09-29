import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import FooterForm from './FooterForm';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function FooterCMS({ auth, contents, flash }) {
    const [showForm, setShowForm] = useState(false);
    const { delete: deleteContent } = useForm();

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const socialItems = contents.filter(content => content.key.startsWith('social_'));

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Footer Section - CMS" />

            <div className="p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        {/* Flash Messages */}
                        {flash?.type && (
                            <div className={`mb-4 p-4 rounded-lg ${
                                flash.type === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {flash.text}
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Footer Section</h1>
                                <p className="text-gray-600">Manage footer content, social media links, and contact information</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Edit Footer Content
                                </button>
                            </div>
                        </div>

                        {contents.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-gray-400 text-6xl mb-3">🦶</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No footer content yet</h3>
                                <p className="text-gray-600 mb-3">Get started by adding your footer content.</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Setup Footer Content
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Current Content Summary */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Current Content</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Company Info:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'tagline')?.value || 'Tagline not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Address:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'address')?.value?.substring(0, 50) || 'Address not set'}
                                                {contents.find(c => c.key === 'address')?.value?.length > 50 && '...'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Contact:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'phone')?.value || 'Phone not set'}
                                            </p>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'email')?.value || 'Email not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Social Media:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {socialItems.length > 0 ? `${socialItems.length} links configured` : 'No social links'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Google Maps:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'maps_url')?.value ? 'Configured' : 'Not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Copyright:</span>
                                            <p className="text-gray-900 mt-1 text-sm">
                                                {contents.find(c => c.key === 'copyright')?.value || 'Not set'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Preview Section */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                            <div className="bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
                                <Footer content={contents} isPreview={true} />
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>

            {showForm && (
                <FooterForm
                    contents={contents}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}