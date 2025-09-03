import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContentForm from '@/Components/CMS/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Project({ auth, contents }) {
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

    const projectItems = contents.filter(content => content.key.startsWith('project_'));

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects Section - CMS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Projects Section</h1>
                                    <p className="text-gray-600">Manage project content and showcase your work</p>
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
                                        Add New Project
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {contents.map((content) => (
                                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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
                                                        {content.metadata.description && (
                                                            <p><strong>Description:</strong> {content.metadata.description}</p>
                                                        )}
                                                        {content.metadata.image && (
                                                            <p><strong>Image:</strong> {content.metadata.image}</p>
                                                        )}
                                                        {content.metadata.link && (
                                                            <p><strong>Link:</strong> {content.metadata.link}</p>
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
                                        {contents.find(c => c.key === 'title')?.value || 'Our Projects'}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {projectItems.map((project, index) => (
                                            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                    {project.metadata?.image ? (
                                                        <img 
                                                            src={project.metadata.image} 
                                                            alt={project.value}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <span className="text-gray-500">Project Image</span>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        {project.value}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        {project.metadata?.description || 'Project description'}
                                                    </p>
                                                    <a 
                                                        href={project.metadata?.link || '#'} 
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Learn More →
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Guide */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Key examples:</strong> title, project_1, project_2, etc.</p>
                                    <p><strong>Metadata format:</strong> {"{"}"description": "Project description", "image": "/path/to/image.jpg", "link": "#"{"}"}</p>
                                    <p><strong>Tip:</strong> Use meaningful keys like project_1, project_2 for individual projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="project"
                    onCancel={handleCloseForm}
                />
            )}
        </AuthenticatedLayout>
    );
}
