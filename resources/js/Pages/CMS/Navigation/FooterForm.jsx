import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from '../../../Components/ui/Toast';

export default function FooterForm({ contents, onCancel }) {
    const { showSuccess, showError } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        copyright: contents.find((c) => c.key === "copyright")?.value || "",
        tagline: contents.find((c) => c.key === "tagline")?.value || "",
        address: contents.find((c) => c.key === "address")?.value || "",
        phone: contents.find((c) => c.key === "phone")?.value || "",
        email: contents.find((c) => c.key === "email")?.value || "",
        social_instagram: contents.find((c) => c.key === "social_instagram")?.value || "",
        social_linkedin: contents.find((c) => c.key === "social_linkedin")?.value || "",
        social_youtube: contents.find((c) => c.key === "social_youtube")?.value || "",
        maps_url: contents.find((c) => c.key === "maps_url")?.value || "",
        maps_embed: contents.find((c) => c.key === "maps_embed")?.value || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("cms.footer.update"), {
            onSuccess: () => {
                showSuccess("Footer content updated successfully!");
                setTimeout(() => {
                    onCancel();
                    window.location.reload();
                }, 2000);
            },
            onError: (errors) => {
                console.error("Update failed:", errors);
                showError("Failed to update footer content. Please try again.");
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="flex items-center justify-center min-h-full p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Edit Footer Content
                            </h3>
                            <button
                                onClick={onCancel}
                                className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Company Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-4">Company Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Copyright Text
                                    </label>
                                    <input
                                        type="text"
                                        value={data.copyright}
                                        onChange={(e) => setData("copyright", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="© 2025 Your Company. All rights reserved."
                                    />
                                    {errors.copyright && (
                                        <p className="text-red-500 text-xs mt-1">{errors.copyright}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tagline}
                                        onChange={(e) => setData("tagline", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Connect With Our Thinks."
                                    />
                                    {errors.tagline && (
                                        <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-4">Contact Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Company address"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData("phone", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="+62 812-xxxx-xxxx"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="contact@company.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-4">Social Media Links</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Instagram URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.social_instagram}
                                        onChange={(e) => setData("social_instagram", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://instagram.com/yourcompany"
                                    />
                                    {errors.social_instagram && (
                                        <p className="text-red-500 text-xs mt-1">{errors.social_instagram}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        💼 LinkedIn URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.social_linkedin}
                                        onChange={(e) => setData("social_linkedin", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://linkedin.com/company/yourcompany"
                                    />
                                    {errors.social_linkedin && (
                                        <p className="text-red-500 text-xs mt-1">{errors.social_linkedin}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        📺 YouTube URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.social_youtube}
                                        onChange={(e) => setData("social_youtube", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://youtube.com/@yourcompany"
                                    />
                                    {errors.social_youtube && (
                                        <p className="text-red-500 text-xs mt-1">{errors.social_youtube}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-gray-800 mb-4">Google Maps Integration</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🗺️ Google Maps URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.maps_url}
                                        onChange={(e) => setData("maps_url", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://maps.app.goo.gl/xxxxxxxxx"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Direct link to open Google Maps in new tab</p>
                                    {errors.maps_url && (
                                        <p className="text-red-500 text-xs mt-1">{errors.maps_url}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🗺️ Google Maps Embed URL
                                    </label>
                                    <textarea
                                        value={data.maps_embed}
                                        onChange={(e) => setData("maps_embed", e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Embedded Google Maps iframe src URL</p>
                                    {errors.maps_embed && (
                                        <p className="text-red-500 text-xs mt-1">{errors.maps_embed}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:shadow-md hover:scale-105 focus:outline-none transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {processing ? "Updating..." : "Update Footer"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}