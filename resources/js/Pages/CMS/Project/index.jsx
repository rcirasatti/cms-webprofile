import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ProjectForm from './form';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProjectTable({ auth, projects }) {
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const { delete: deleteProject } = useForm();

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

    return (
        <SidebarLayout>
            <Head title="Projects Section - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Projects Section</h1>
                            <p className="text-gray-600">Manage project content and showcase your work</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingProject(null);
                                setShowForm(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Add New Project
                        </button>
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
                                {projects.map((project) => (
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
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No projects found. Click "Add New Project" to create one.
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
                <ProjectForm
                    project={editingProject}
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
