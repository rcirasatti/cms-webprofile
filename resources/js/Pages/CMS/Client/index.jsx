import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ClientForm from './form';
import { Head, Link, useForm } from '@inertiajs/react';
import { useToast } from '@/Components/ui/Toast';

export default function ClientTable({ auth, clients }) {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingClient, setDeletingClient] = useState(null);
    const { delete: deleteClient } = useForm();
    const { showSuccess, showError } = useToast();

    // UI state for search and pagination
    const [query, setQuery] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleEdit = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDelete = (client) => {
        setDeletingClient(client);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingClient) {
            deleteClient(route('cms.clients.destroy', deletingClient.id), {
                onSuccess: () => {
                    showSuccess('Client deleted successfully!');
                    setShowDeleteModal(false);
                    setDeletingClient(null);
                },
                onError: () => {
                    showError('Failed to delete client. Please try again.');
                }
            });
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeletingClient(null);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingClient(null);
    };

    // Filter clients by search query (name)
    const filtered = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const startIndex = (currentPage - 1) * perPage;
    const paginated = filtered.slice(startIndex, startIndex + perPage);

    return (
        <SidebarLayout>
            <Head title="Clients - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
                            <p className="text-gray-600">Manage client logos and information</p>

                            {/* Per-page selector under subtitle (left) */}
                            <div className="mt-3">
                                <select
                                    value={perPage}
                                    onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                    className="border rounded-md px-3 py-2 text-sm w-15"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 ml-auto">
                            <div className="flex flex-col items-end space-y-2">
                                <button
                                    onClick={() => {
                                        setEditingClient(null);
                                        setShowForm(true);
                                    }}
                                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 hover:shadow-lg hover:scale-105 focus:outline-none transition-all duration-300"
                                >
                                    Add New Client
                                </button>

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                                    placeholder="Search clients..."
                                    className="border rounded-md px-3 py-2 text-sm w-56"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Clients Table */}
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
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
                                    {paginated.map((client) => (
                                        <tr key={client.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {client.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {client.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.logo_path ? (
                                                <img 
                                                    src={client.logo_path} 
                                                    alt={client.name}
                                                    className="h-10 w-16 object-contain"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">No logo</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                client.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {client.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(client)}
                                                    className="text-indigo-600 hover:text-indigo-900 hover:scale-110 p-1 transition-all duration-300"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(client)}
                                                    className="text-red-600 hover:text-red-900 hover:scale-110 p-1 transition-all duration-300"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                
                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No clients found. Click "Add New Client" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">Showing {Math.min(startIndex+1, total)} - {Math.min(startIndex + paginated.length, total)} of {total} clients</div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                                disabled={currentPage === 1}
                                className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                                Prev
                            </button>

                            <div className="text-sm">
                                Page {currentPage} / {totalPages}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Form Modal */}
            {showForm && (
                <ClientForm
                    client={editingClient}
                    onCancel={handleCloseForm}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deletingClient && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Client</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete "<strong>{deletingClient.name}</strong>"? 
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 px-4 py-3">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:shadow-md hover:scale-105 focus:outline-none transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
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
