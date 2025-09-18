import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Alert from '../../../Components/ui/Alert';

export default function HeroForm({ contents, onCancel }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const initialImage =
        contents.find((c) => c.key === "background_image")?.value || "";
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: contents.find((c) => c.key === "title")?.value || "",
        subtitle: contents.find((c) => c.key === "subtitle")?.value || "",
        button_text: contents.find((c) => c.key === "button_text")?.value || "",
        background_image: initialImage,
    });

    const [previewUrl, setPreviewUrl] = useState(initialImage);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use useForm.post so Inertia will automatically send multipart/form-data
        post(route("cms.hero.update"), {
            onSuccess: () => {
                setAlertMessage("Hero content updated successfully!");
                setShowSuccess(true);
                setTimeout(() => {
                    onCancel();
                    window.location.reload();
                }, 2000);
            },
            onError: (errors) => {
                console.error("Update failed:", errors);
                setAlertMessage("Failed to update content. Please try again.");
                setShowError(true);
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            {/* Success Alert */}
            {showSuccess && (
                <Alert 
                    type="success" 
                    message={alertMessage} 
                    onClose={() => setShowSuccess(false)}
                    autoClose={true}
                    duration={2000}
                />
            )}

            {/* Error Alert */}
            {showError && (
                <Alert 
                    type="error" 
                    message={alertMessage} 
                    onClose={() => setShowError(false)}
                    autoClose={true}
                    duration={4000}
                />
            )}

            <div className="flex items-center justify-center min-h-full p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Edit Hero Content
                            </h3>
                            <button
                                onClick={onCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Main Content */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-blue-800 mb-3">
                                🎯 Main Content
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Welcome to OmahIoT"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subtitle
                                    </label>
                                    <textarea
                                        value={data.subtitle}
                                        onChange={(e) =>
                                            setData("subtitle", e.target.value)
                                        }
                                        rows={3}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Smart IoT Solutions for Modern Living"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={data.button_text}
                                        onChange={(e) =>
                                            setData(
                                                "button_text",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Explore Solutions"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Background Image (file upload)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files &&
                                                e.target.files[0];
                                            setData(
                                                "background_image",
                                                file || ""
                                            );
                                            if (file) {
                                                const url =
                                                    URL.createObjectURL(file);
                                                setPreviewUrl(url);
                                            } else {
                                                setPreviewUrl(
                                                    initialImage || ""
                                                );
                                            }
                                        }}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />

                                    {previewUrl ? (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-600 mb-1">
                                                Preview:
                                            </p>
                                            <img
                                                src={previewUrl}
                                                alt="preview"
                                                className="w-full max-w-xs rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 mt-2">
                                            No image selected
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
