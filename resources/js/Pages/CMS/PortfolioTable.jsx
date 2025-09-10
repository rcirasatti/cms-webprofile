import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import PortfolioForm from '@/Components/CMS/PortfolioForm';
import { Head, Link, useForm } from '@inertiajs/react';

export default function PortfolioTable({ auth, portfolios }) {
    const [showForm, setShowForm] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState(null);
    const [viewingPortfolio, setViewingPortfolio] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const { delete: deletePortfolio } = useForm();

    // Ensure portfolios is always an array
    const portfolioList = Array.isArray(portfolios) ? portfolios : [];

    const handleEdit = (portfolio) => {
        setEditingPortfolio(portfolio);
        setShowForm(true);
    };

    const handleView = (portfolio) => {
        setViewingPortfolio(portfolio);
        setShowViewModal(true);
    };

    const handleDelete = (portfolio) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            deletePortfolio(route('cms.portfolios.destroy', portfolio.id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingPortfolio(null);
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setViewingPortfolio(null);
    };

    return (
        <SidebarLayout>
            <Head title="Portfolios - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Portfolios</h1>
                            <p className="text-gray-600">Manage portfolio items and showcase projects</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingPortfolio(null);
                                setShowForm(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Add New Portfolio
                        </button>
                    </div>

                    {/* Portfolios Table */}
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
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
                                {portfolioList.map((portfolio) => (
                                    <tr key={portfolio.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {portfolio.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 font-medium">
                                                {portfolio.title}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {portfolio.description?.substring(0, 50)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {portfolio.category || 'No Category'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {portfolio.image_path ? (
                                                <img
                                                    src={portfolio.image_path}
                                                    alt={portfolio.title}
                                                    className="h-12 w-16 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">No image</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {portfolio.order}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                portfolio.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {portfolio.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleView(portfolio)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Detail
                                            </button>
                                            <button
                                                onClick={() => handleEdit(portfolio)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(portfolio)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {portfolioList.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No portfolios found. Create your first portfolio item!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Portfolio Form Modal */}
            {showForm && (
                <PortfolioForm
                    portfolio={editingPortfolio}
                    onCancel={handleCloseForm}
                />
            )}

            {/* Portfolio View Modal */}
            {showViewModal && viewingPortfolio && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
                        <div className="mt-3">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-medium text-gray-900">
                                    Portfolio Details
                                </h3>
                                <button
                                    onClick={handleCloseViewModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {viewingPortfolio.title}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {viewingPortfolio.category || 'No Category'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Order
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {viewingPortfolio.order}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            viewingPortfolio.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {viewingPortfolio.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>

                                {/* Image and Description */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image
                                        </label>
                                        {viewingPortfolio.image_path ? (
                                            <img
                                                src={viewingPortfolio.image_path}
                                                alt={viewingPortfolio.title}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                                                <span className="text-gray-500">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md max-h-32 overflow-y-auto">
                                            {viewingPortfolio.description}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Technologies/Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {viewingPortfolio.tags && viewingPortfolio.tags.length > 0 ? (
                                        viewingPortfolio.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No tags</span>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Key Features/Advantages
                                </label>
                                <div className="space-y-2">
                                    {viewingPortfolio.features && viewingPortfolio.features.length > 0 ? (
                                        viewingPortfolio.features.map((feature, index) => (
                                            <div key={index} className="flex items-start bg-gray-50 px-3 py-2 rounded-md">
                                                <div className="mr-3 mt-1 text-green-500">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-900">{feature}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No features</span>
                                    )}
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Created:</span> {new Date(viewingPortfolio.created_at).toLocaleString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Updated:</span> {new Date(viewingPortfolio.updated_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}

