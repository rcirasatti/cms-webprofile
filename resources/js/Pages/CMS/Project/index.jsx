import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ProjectForm from './form';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProjectTable({ auth, projects }) {
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const { delete: deleteProject } = useForm();

    // UI state for search and pagination
    const [query, setQuery] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleEdit = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleDelete = (project) => {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(route('cms.projects.destroy', project.id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProject(null);
    };

    // Projects are now passed directly from the controller

    const projectList = Array.isArray(projects) ? projects : [];
    const filtered = projectList.filter(p => (p.title || '').toLowerCase().includes(query.toLowerCase()));
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const startIndex = (currentPage - 1) * perPage;
    const paginated = filtered.slice(startIndex, startIndex + perPage);

    return (
        <SidebarLayout>
            <Head title="Projects Section - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Projects Section</h1>
                            <p className="text-gray-600">Manage project content and showcase your work</p>

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

                        <div className="flex items-center ml-auto">
                            <div className="flex flex-col items-end space-y-2">
                                <button
                                    onClick={() => {
                                        setEditingProject(null);
                                        setShowForm(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                                >
                                    Add New Project
                                </button>

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                                    placeholder="Search projects..."
                                    className="border rounded-md px-3 py-2 text-sm w-56"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Projects Table */}
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
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginated.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {project.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {project.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {project.category || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.image_path ? (
                                                <img 
                                                    src={project.image_path} 
                                                    alt={project.title}
                                                    className="h-10 w-16 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">No image</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                project.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {project.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="text-indigo-600 hover:text-indigo-900 p-1"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                    </svg>
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="text-red-600 hover:text-red-900 p-1"
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
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No projects found. Click "Add New Project" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">Showing {Math.min(startIndex+1, total)} - {Math.min(startIndex + paginated.length, total)} of {total} projects</div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                                disabled={currentPage === 1}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <div className="text-sm">
                                Page {currentPage} / {totalPages}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Form Modal */}
            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
