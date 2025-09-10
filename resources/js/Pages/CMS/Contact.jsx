import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/CMS/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Contact({ auth, contents }) {
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
            <Head title="Contact Section - CMS" />

            <div className="p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Contact Section</h1>
                                    <p className="text-gray-600">Manage contact information and details</p>
                                </div>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('cms.sections')}
                                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        ← Back to Sections
                                    </Link>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Contact Info
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {contents.map((content) => (
                                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
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
                                <div className="bg-gray-800 text-white p-8 rounded-lg">
                                    <h2 className="text-3xl font-bold text-center mb-8">
                                        {contents.find(c => c.key === 'title')?.value || 'Contact Us'}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">📍 Address</h3>
                                            <p>{contents.find(c => c.key === 'address')?.value || 'Your address here'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">📧 Email</h3>
                                            <p>{contents.find(c => c.key === 'email')?.value || 'your@email.com'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">📞 Phone</h3>
                                            <p>{contents.find(c => c.key === 'phone')?.value || '+1 234 567 8900'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Guide */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Common keys:</strong> title, address, email, phone, hours, map_embed</p>
                                    <p><strong>Tip:</strong> Use descriptive keys that identify the type of contact information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="contact"
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
