import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import NavbarForm from './form';
import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function NavbarCMS({ auth, contents }) {
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
                                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
                                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        Setup Navbar Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Current Content Summary */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Current Content</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Logo Text:</span>
                                                <p className="text-gray-900 mt-1">{contents.find(c => c.key === 'logo_text')?.value || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Logo Image:</span>
                                                <p className="text-gray-900 mt-1 text-sm break-all">
                                                    {contents.find(c => c.key === 'logo_image')?.value || 'No image set'}
                                                </p>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview Section */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Live Preview</h2>
                                <div className="bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
                                    <Navbar content={contents} isPreview={true} />
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
