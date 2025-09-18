import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Alert from '../../../Components/ui/Alert';

export default function AboutForm({ contents, onCancel }) {
    const currentImage = contents.find(c => c.key === 'image')?.value || '';
    const [previewUrl, setPreviewUrl] = useState(currentImage);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: contents.find(c => c.key === 'title')?.value || '',
        description: contents.find(c => c.key === 'description')?.value || '',
        image: null, // File upload
        features_title: contents.find(c => c.key === 'features_title')?.value || '',
        feature1_title: contents.find(c => c.key === 'feature1_title')?.value || '',
        feature1_description: contents.find(c => c.key === 'feature1_description')?.value || '',
        feature2_title: contents.find(c => c.key === 'feature2_title')?.value || '',
        feature2_description: contents.find(c => c.key === 'feature2_description')?.value || '',
        feature3_title: contents.find(c => c.key === 'feature3_title')?.value || '',
        feature3_description: contents.find(c => c.key === 'feature3_description')?.value || '',
        experience_number: contents.find(c => c.key === 'experience_number')?.value || '',
        experience_text: contents.find(c => c.key === 'experience_text')?.value || '',
    });

    // Get current values for display
    const currentValues = {
        title: contents.find(c => c.key === 'title')?.value || '',
        description: contents.find(c => c.key === 'description')?.value || '',
        image: contents.find(c => c.key === 'image')?.value || '',
        features_title: contents.find(c => c.key === 'features_title')?.value || '',
        feature1_title: contents.find(c => c.key === 'feature1_title')?.value || '',
        feature1_description: contents.find(c => c.key === 'feature1_description')?.value || '',
        feature2_title: contents.find(c => c.key === 'feature2_title')?.value || '',
        feature2_description: contents.find(c => c.key === 'feature2_description')?.value || '',
        feature3_title: contents.find(c => c.key === 'feature3_title')?.value || '',
        feature3_description: contents.find(c => c.key === 'feature3_description')?.value || '',
        experience_number: contents.find(c => c.key === 'experience_number')?.value || '',
        experience_text: contents.find(c => c.key === 'experience_text')?.value || '',
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare FormData for file upload
        const formData = new FormData();

        // Add text data
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('features_title', data.features_title);
        formData.append('feature1_title', data.feature1_title);
        formData.append('feature1_description', data.feature1_description);
        formData.append('feature2_title', data.feature2_title);
        formData.append('feature2_description', data.feature2_description);
        formData.append('feature3_title', data.feature3_title);
        formData.append('feature3_description', data.feature3_description);
        formData.append('experience_number', data.experience_number);
        formData.append('experience_text', data.experience_text);

        // Add image file if selected
        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(route('cms.about.update'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setAlertMessage('About content updated successfully!');
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onCancel();
                    window.location.reload();
                }, 2000);
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
                setAlertMessage('Failed to update content. Please try again.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(currentImage);
        }
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
                    duration={3000}
                />
            )}

            <div className="flex items-center justify-center min-h-full p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Edit About Content</h3>
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
                        {/* Basic Information */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-blue-800 mb-3">📝 Basic Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="About Us"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter description about your company"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    
                                    {/* Image Preview */}
                                    {previewUrl && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                            <img
                                                src={previewUrl}
                                                alt="About image preview"
                                                className="max-w-xs max-h-48 object-cover rounded-lg shadow-md"
                                            />
                                            {currentImage && !data.image && (
                                                <p className="text-xs text-gray-500 mt-1">Current image</p>
                                            )}
                                            {data.image && (
                                                <p className="text-xs text-green-600 mt-1">New image selected</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-800 mb-3">✨ Features</h4>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Features Title</label>
                                <input
                                    type="text"
                                    value={data.features_title}
                                    onChange={(e) => setData('features_title', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Why Choose Us?"
                                />
                            </div>

                            {/* Feature 1 */}
                            <div className="mb-4 p-3 bg-white rounded border">
                                <h5 className="font-medium text-gray-800 mb-2">Feature 1</h5>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={data.feature1_title}
                                            onChange={(e) => setData('feature1_title', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature title"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.feature1_description}
                                            onChange={(e) => setData('feature1_description', e.target.value)}
                                            rows={2}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature description"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="mb-4 p-3 bg-white rounded border">
                                <h5 className="font-medium text-gray-800 mb-2">Feature 2</h5>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={data.feature2_title}
                                            onChange={(e) => setData('feature2_title', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                                            placeholder="Feature title"
                                        />
                                        {currentValues.feature2_title && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Current: <span className="font-medium">{currentValues.feature2_title}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.feature2_description}
                                            onChange={(e) => setData('feature2_description', e.target.value)}
                                            rows={2}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                                            placeholder="Feature description"
                                        />
                                        {currentValues.feature2_description && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Current: <span className="font-medium">{currentValues.feature2_description.substring(0, 80)}...</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="mb-4 p-3 bg-white rounded border">
                                <h5 className="font-medium text-gray-800 mb-2">Feature 3</h5>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={data.feature3_title}
                                            onChange={(e) => setData('feature3_title', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                                            placeholder="Feature title"
                                        />
                                        {currentValues.feature3_title && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Current: <span className="font-medium">{currentValues.feature3_title}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.feature3_description}
                                            onChange={(e) => setData('feature3_description', e.target.value)}
                                            rows={2}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                                            placeholder="Feature description"
                                        />
                                        {currentValues.feature3_description && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Current: <span className="font-medium">{currentValues.feature3_description.substring(0, 80)}...</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-purple-800 mb-3">🏆 Experience Badge</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                                    <input
                                        type="text"
                                        value={data.experience_number}
                                        onChange={(e) => setData('experience_number', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                        placeholder="5+"
                                    />
                                    {currentValues.experience_number && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Current: <span className="font-medium">{currentValues.experience_number}</span>
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                                    <input
                                        type="text"
                                        value={data.experience_text}
                                        onChange={(e) => setData('experience_text', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                                        placeholder="Years Experience"
                                    />
                                    {currentValues.experience_text && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Current: <span className="font-medium">{currentValues.experience_text}</span>
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
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
