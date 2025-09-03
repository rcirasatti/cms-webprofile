import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContentForm from '@/Components/CMS/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Client({ auth, contents }) {
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

    const clientItems = contents.filter(content => content.key.startsWith('client_'));

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Clients Section - CMS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Clients Section</h1>
                                    <p className="text-gray-600">Manage client logos and information</p>
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
                                        Add Client
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {contents.map((content) => (
                                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
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
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        {content.metadata.logo && (
                                                            <p><strong>Logo:</strong> {content.metadata.logo}</p>
                                                        )}
                                                        {content.metadata.website && (
                                                            <p><strong>Website:</strong> {content.metadata.website}</p>
                                                        )}
                                                        {content.metadata.description && (
                                                            <p><strong>Description:</strong> {content.metadata.description}</p>
                                                        )}
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
                                <div className="bg-white p-8 rounded-lg">
                                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                                        {contents.find(c => c.key === 'title')?.value || 'Our Clients'}
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                                        {clientItems.map((client, index) => (
                                            <div key={index} className="text-center">
                                                <div className="h-16 mb-2 flex items-center justify-center">
                                                    {client.metadata?.logo ? (
                                                        <img 
                                                            src={client.metadata.logo} 
                                                            alt={client.value}
                                                            className="h-full w-auto filter grayscale hover:grayscale-0 transition duration-300"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling.style.display = 'block';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className="h-16 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                                        Logo
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">{client.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Guide */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Key examples:</strong> title, client_1, client_2, etc.</p>
                                    <p><strong>Metadata format:</strong> {"{"}"logo": "/path/to/logo.png", "website": "https://client.com", "description": "Client description"{"}"}</p>
                                    <p><strong>Tip:</strong> Use meaningful keys like client_1, client_2 for individual clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="client"
                    onCancel={handleCloseForm}
                />
            )}
        </AuthenticatedLayout>
    );
}
