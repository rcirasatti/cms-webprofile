import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/ui/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Footer({ auth, contents }) {
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

    const socialItems = contents.filter(content => content.key.startsWith('social_'));

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Footer Section - CMS" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="p-6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Footer Section</h1>
                            <p className="text-gray-600">Manage footer content and social media links</p>
                        </div>
                                           </div>

                    <div className="space-y-3">
                        {contents.map((content) => (
                            <div key={content.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow overflow-hidden">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 truncate max-w-[150px]">
                                                {content.key}
                                            </span>
                                            <span className="text-xs text-gray-500">Order: {content.order}</span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                content.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {content.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-gray-900 mb-2 font-medium text-sm break-words break-all">{content.value}</p>
                                        {content.metadata && Object.keys(content.metadata).length > 0 && (
                                            <div className="text-xs text-gray-600 truncate">
                                                <strong>Platform:</strong> {content.metadata.platform}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-1 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(content)}
                                            className="text-blue-600 hover:text-blue-800 p-1"
                                            title="Edit"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                            title="Delete"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Preview Section */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
                        <div className="bg-gray-900 text-white p-4 rounded-lg overflow-hidden">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <p className="text-gray-400 text-sm truncate flex-1">
                                    {contents.find(c => c.key === 'copyright')?.value || '© 2025 Your Company. All rights reserved.'}
                                </p>
                                <div className="flex space-x-3 flex-shrink-0">
                                    {socialItems.slice(0, 4).map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.value}
                                            className="text-gray-400 hover:text-white transition duration-300 text-lg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.metadata?.platform || 'Social Link'}
                                        >
                                            {social.metadata?.platform === 'facebook' && '📘'}
                                            {social.metadata?.platform === 'instagram' && '📷'}
                                            {social.metadata?.platform === 'twitter' && '🐦'}
                                            {social.metadata?.platform === 'linkedin' && '💼'}
                                            {social.metadata?.platform === 'youtube' && '📺'}
                                            {!social.metadata?.platform && '🔗'}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Guide */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Content Guide</h4>
                        <div className="text-xs text-blue-700 space-y-1">
                            <p><strong>Keys:</strong> copyright, social_facebook, social_instagram, etc.</p>
                            <p><strong>Metadata:</strong> {"{"}"platform": "facebook"{"}"}</p>
                            <p><strong>Tip:</strong> Use social_* pattern for links</p>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <ContentForm
                    content={editingContent}
                    section="footer"
                    onCancel={handleCloseForm}
                />
            )}
        </SidebarLayout>
    );
}
