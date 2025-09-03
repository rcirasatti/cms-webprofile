import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContentForm from '@/Components/CMS/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Hero({ auth, contents }) {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Hero Section - CMS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Hero Section</h1>
                                    <p className="text-gray-600">Manage hero section content</p>
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
                                        Add New Content
                                    </button>
                                </div>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🌟</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hero content yet</h3>
                                    <p className="text-gray-600 mb-4">Get started by adding your first hero content item.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Hero Content
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {contents.map((content) => (
                                        <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                                                    <p className="text-gray-900 mb-2">{content.value}</p>
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
                            )}

                            {/* Preview Section */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
                                    <h1 className="text-4xl font-bold mb-4">
                                        {contents.find(c => c.key === 'title')?.value || 'Hero Title'}
                                    </h1>
                                    <p className="text-xl mb-6">
                                        {contents.find(c => c.key === 'subtitle')?.value || 'Hero Subtitle'}
                                    </p>
                                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                                        {contents.find(c => c.key === 'button_text')?.value || 'Call to Action'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="hero"
                    onCancel={handleCloseForm}
                />
            )}
        </AuthenticatedLayout>
    );
}
