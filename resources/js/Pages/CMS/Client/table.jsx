import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ClientForm from './form';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ClientTable({ auth, clients }) {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const { delete: deleteClient } = useForm();

    const handleEdit = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDelete = (client) => {
        if (confirm('Are you sure you want to delete this client?')) {
            deleteClient(route('cms.clients.destroy', client.id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingClient(null);
    };

    // Clients are now passed directly from the controller

    return (
        <SidebarLayout>
            <Head title="Clients - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
                            <p className="text-gray-600">Manage client logos and information</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingClient(null);
                                setShowForm(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Add New Client
                        </button>
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
                                {clients.map((client) => (
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
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleDelete(client)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                
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
                </div>
            </div>
            
            {/* Form Modal */}
            {showForm && (
                <ClientForm
                    client={editingClient}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
