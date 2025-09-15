import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/ui/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Navbar({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const { delete: deleteContent } = useForm();

    const handleEdit = (content) => {
        setEditingContent(content);
        setShowForm(true);
    };

    const handleDelete = (content) => {
        if (confirm('Are you sure you want to delete this content?')) {
            deleteContent(route('cms.content.destroy', content.id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingContent(null);
    };

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Navbar Section - CMS" />

            <div className="p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Navbar Section</h1>
                                    <p className="text-gray-600">Manage navigation bar and logo</p>
                                </div>
                                                    </div>

                            <div className="space-y-4">
                                {contents.map((content) => (
                                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                                                        {content.key}
                                                    </span>
                                                    <span className="text-sm text-gray-500">Order: {content.order}</span>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        content.is_active 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {content.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 mb-2 font-medium">{content.value}</p>
                                                {content.metadata && Object.keys(content.metadata).length > 0 && (
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Metadata:</strong> {JSON.stringify(content.metadata)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                <button
                                                    onClick={() => handleEdit(content)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(content)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Preview Section */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
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
                <ContentForm
                    content={editingContent}
                    section="navbar"
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
