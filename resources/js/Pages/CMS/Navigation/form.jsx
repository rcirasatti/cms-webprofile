import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Alert from '../../../Components/ui/Alert';

export default function NavbarForm({ contents, onCancel }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const initialLogoImage =
        contents.find((c) => c.key === "logo_image")?.value || "";
    const { data, setData, post, processing, errors } = useForm({
        logo_text: contents.find((c) => c.key === "logo_text")?.value || "",
        logo_image: initialLogoImage,
    });

    const [previewUrl, setPreviewUrl] = useState(initialLogoImage);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("cms.navbar.update"), {
            onSuccess: () => {
                setAlertMessage("Navbar content updated successfully!");
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

            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-medium text-gray-900">
                            Edit Navbar Content
                        </h3>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Logo Content */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-blue-800 mb-3">
                                🧭 Logo & Branding
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Logo Text
                                    </label>
                                    <input
                                        type="text"
                                        value={data.logo_text}
                                        onChange={(e) =>
                                            setData("logo_text", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Your Company Name"
                                    />
                                    {errors.logo_text && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.logo_text}
                                        </p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Logo Image (file upload)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files &&
                                                e.target.files[0];
                                            setData(
                                                "logo_image",
                                                file || ""
                                            );
                                            if (file) {
                                                const url =
                                                    URL.createObjectURL(file);
                                                setPreviewUrl(url);
                                            } else {
                                                setPreviewUrl(
                                                    initialLogoImage || ""
                                                );
                                            }
                                        }}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.logo_image && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.logo_image}
                                        </p>
                                    )}

                                    {previewUrl ? (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-600 mb-1">
                                                Preview:
                                            </p>
                                            <img
                                                src={previewUrl}
                                                alt="Logo preview"
                                                className="w-full max-w-xs max-h-24 object-contain rounded-md border"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 mt-2">
                                            No logo image selected
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