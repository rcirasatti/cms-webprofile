import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import NavbarForm from './form';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Navbar({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Navbar Section - CMS" />

            <div className="p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Navbar Section</h1>
                                    <p className="text-gray-600">Manage navigation bar and logo</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Navbar Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-3">🧭</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No navbar content yet</h3>
                                    <p className="text-gray-600 mb-3">Get started by adding your navbar content.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Setup Navbar Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Current Content Summary */}
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Logo Text:</span>
                                                <p className="text-gray-900 mt-0.5">{contents.find(c => c.key === 'logo_text')?.value || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Logo Image:</span>
                                                <p className="text-gray-900 mt-0.5 text-sm break-all">
                                                    {contents.find(c => c.key === 'logo_image')?.value || 'No image set'}
                                                </p>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-6 border-t pt-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="bg-white shadow-lg rounded-lg p-4">
                                    <nav className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                                {contents.find(c => c.key === 'logo_image')?.value ? (
                                                    <img 
                                                        src={contents.find(c => c.key === 'logo_image').value} 
                                                        alt="Logo"
                                                        className="w-full h-full object-cover rounded"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'block';
                                                        }}
                                                    />
                                                ) : null}
                                                <span className="text-xs text-gray-500">Logo</span>
                                            </div>
                                            <span className="text-xl font-bold text-gray-800">
                                                {contents.find(c => c.key === 'logo_text')?.value || 'Your Company'}
                                            </span>
                                        </div>
                                        <div className="hidden md:flex space-x-8">
                                            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                                            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                                            <a href="#" className="text-gray-600 hover:text-blue-600">Projects</a>
                                            <a href="#" className="text-gray-600 hover:text-blue-600">Portfolio</a>
                                            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                            {/* Content Guide */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Common keys:</strong> logo_text, logo_image, menu_item_1, menu_item_2</p>
                                    <p><strong>Logo metadata:</strong> {"{"}"alt": "Company Logo", "width": "32", "height": "32"{"}"}</p>
                                    <p><strong>Tip:</strong> Use logo_text for text logo and logo_image for image logo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {showForm && (
                <NavbarForm
                    contents={contents}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
