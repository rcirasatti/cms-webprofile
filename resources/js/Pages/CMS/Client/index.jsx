import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/ui/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Client({ auth, contents }) {
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingContent, setDeletingContent] = useState(null);
    const { delete: deleteContent } = useForm();

    const handleEdit = (content) => {
        setEditingContent(content);
        setShowForm(true);
    };

    const handleDelete = (content) => {
        setDeletingContent(content);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingContent) {
            deleteContent(route('cms.content.destroy', deletingContent.id));
            setShowDeleteModal(false);
            setDeletingContent(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeletingContent(null);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingContent(null);
    };

    // Group clients by their ID number (client_1, client_2, etc.)
    const clientsMap = {};
    const otherContents = [];
    
    contents.forEach(content => {
        if (content.key.startsWith('client_')) {
            const match = content.key.match(/client_(\d+)_(.+)/);
            if (match) {
                const clientId = match[1];
                const field = match[2];
                
                if (!clientsMap[clientId]) {
                    clientsMap[clientId] = { id: clientId };
                }
                
                clientsMap[clientId][field] = content.value;
                clientsMap[clientId][`${field}_content_id`] = content.id;
                clientsMap[clientId][`${field}_content`] = content;
                if (content.metadata) {
                    clientsMap[clientId][`${field}_metadata`] = content.metadata;
                }
            } else if (content.key.match(/client_\d+$/)) {
                // Handle client_1, client_2 directly
                const clientId = content.key.replace('client_', '');
                
                if (!clientsMap[clientId]) {
                    clientsMap[clientId] = { id: clientId };
                }
                
                clientsMap[clientId]['name'] = content.value;
                clientsMap[clientId]['name_content_id'] = content.id;
                clientsMap[clientId]['name_content'] = content;
                
                if (content.metadata && content.metadata.logo) {
                    clientsMap[clientId]['logo'] = content.metadata.logo;
                }
            }
        } else {
            otherContents.push(content);
        }
    });
    
    // Convert to array for easier mapping
    const clients = Object.values(clientsMap);
    const title = contents.find(c => c.key === 'title')?.value || 'Our Clients';

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Clients Section - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
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
                                onClick={() => {
                                    setEditingContent(null);
                                    setShowForm(true);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add New Client
                            </button>
                        </div>
                    </div>

                    {/* Title Setting */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Section Title: {title}</h2>
                            </div>
                            <button
                                onClick={() => handleEdit(contents.find(c => c.key === 'title'))}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Edit Title
                            </button>
                        </div>
                    </div>

                    {/* Clients Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Logo
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clients.map((client) => {
                                    const content = client.name_content;
                                    return (
                                    <tr key={client.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {client.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {client.name || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.logo ? (
                                                <img 
                                                    src={client.logo} 
                                                    alt={client.name || `Client ${client.id}`}
                                                    className="h-10 w-16 object-contain rounded"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">No logo</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {content && (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    content.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {content.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(client.name_content)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.name_content)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )})}
                                {clients.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No clients found. Click "Add New Client" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="client"
                    onCancel={handleCloseForm}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deletingContent && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Content</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete content "<strong>{deletingContent.key}</strong>"? 
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 px-4 py-3">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
