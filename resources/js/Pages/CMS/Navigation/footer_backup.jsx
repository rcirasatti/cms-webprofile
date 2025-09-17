import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ContentForm from '@/Components/ui/ContentForm';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Footer({ auth, contents, flash }) {
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

            <div className="p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        {/* Flash Messages */}
                        {flash?.type && (
                            <div className={`mb-4 p-4 rounded-lg ${
                                flash.type === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {flash.text}
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Footer Section</h1>
                                <p className="text-gray-600">Manage footer content, social media links, and contact information</p>
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
                                    Add Footer Content
                                </button>
                            </div>
                        </div>

                        {contents.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-gray-400 text-6xl mb-3">🦶</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No footer content yet</h3>
                                <p className="text-gray-600 mb-3">Get started by adding your footer content.</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Setup Footer Content
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Current Content Summary */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Current Content</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Company Info:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'tagline')?.value || 'Tagline not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Address:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'address')?.value?.substring(0, 50) || 'Address not set'}
                                                {contents.find(c => c.key === 'address')?.value?.length > 50 && '...'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Contact:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'phone')?.value || 'Phone not set'}
                                            </p>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'email')?.value || 'Email not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Social Media:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {socialItems.length > 0 ? `${socialItems.length} links configured` : 'No social links'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Google Maps:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'maps_url')?.value ? 'Configured' : 'Not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">Copyright:</span>
                                            <p className="text-gray-900 mt-0.5 text-sm">
                                                {contents.find(c => c.key === 'copyright')?.value || 'Not set'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Individual Content Items */}
                                <div className="space-y-3 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800">📝 All Content Items</h3>
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
                                                    <p className="text-gray-900 mb-2 font-medium">
                                                        {content.value?.length > 100 
                                                            ? content.value.substring(0, 100) + '...'
                                                            : content.value || 'No value set'
                                                        }
                                                    </p>
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
                            </>
                        )}

                        {/* Preview Section */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
                            <div className="bg-gradient-to-br from-blue-900 via-green-600 to-blue-900 text-white p-6 rounded-lg overflow-hidden">
                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                                    {/* Left Side - Company Info */}
                                    <div className="space-y-3">
                                        {/* Logo and Tagline */}
                                        <div>
                                            <div className="h-6 mb-2">
                                                <img
                                                    src="/assets/images/logo_omahiot.png"
                                                    alt="OmahIoT Logo"
                                                    className="h-full w-auto object-contain brightness-0 invert opacity-90"
                                                />
                                            </div>
                                            <p className="text-sm text-white/70">
                                                {contents.find(c => c.key === 'tagline')?.value || 'Connect With Our Thinks.'}
                                            </p>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-1 text-xs">
                                            <p className="text-white/60">
                                                📍 {contents.find(c => c.key === 'address')?.value || 'Address not set'}
                                            </p>
                                            <p className="text-white/60">
                                                📞 {contents.find(c => c.key === 'phone')?.value || 'Phone not set'}
                                            </p>
                                            <p className="text-white/60">
                                                📧 {contents.find(c => c.key === 'email')?.value || 'Email not set'}
                                            </p>
                                        </div>

                                        {/* Social Media */}
                                        <div className="flex gap-3">
                                            {socialItems.slice(0, 4).map((social, index) => (
                                                <a
                                                    key={index}
                                                    href={social.value}
                                                    className="text-white/60 hover:text-white transition duration-300"
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

                                    {/* Right Side - Maps */}
                                    <div className="space-y-2">
                                        <div className="bg-white/10 rounded-lg p-2 h-24 flex items-center justify-center">
                                            <span className="text-white/60 text-xs">🗺️ Google Maps Preview</span>
                                        </div>
                                        {contents.find(c => c.key === 'maps_url')?.value && (
                                            <a
                                                href={contents.find(c => c.key === 'maps_url')?.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-white rounded text-xs hover:bg-white/20 transition-colors"
                                            >
                                                📍 Buka di Google Maps
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Copyright */}
                                <div className="pt-3 border-t border-white/20">
                                    <p className="text-center text-xs text-white/60">
                                        {contents.find(c => c.key === 'copyright')?.value || '© 2025 Your Company. All rights reserved.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Guide */}
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="text-lg font-medium text-blue-800 mb-2">Content Guide</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p><strong>Keys:</strong> copyright, tagline, address, phone, email, maps_url, maps_embed</p>
                                <p><strong>Social Keys:</strong> social_facebook, social_instagram, social_linkedin, social_youtube</p>
                                <p><strong>Metadata:</strong> {"{"}"platform": "facebook"{"}"}</p>
                                <p><strong>Tip:</strong> Use social_* pattern for social media links</p>
                            </div>
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