import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function AboutForm({ contents, onCancel }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
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
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare data to send
        const formData = {
            title: data.title,
            description: data.description,
            image: data.image,
            features_title: data.features_title,
            feature1_title: data.feature1_title,
            feature1_description: data.feature1_description,
            feature2_title: data.feature2_title,
            feature2_description: data.feature2_description,
            feature3_title: data.feature3_title,
            feature3_description: data.feature3_description,
            experience_number: data.experience_number,
            experience_text: data.experience_text,
        };

        router.post(route('cms.about.update'), formData, {
            onSuccess: () => {
                alert('About content updated successfully!');
                onCancel();
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
                alert('Failed to update content: ' + JSON.stringify(errors));
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-medium text-gray-900">Edit About Content</h3>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="/assets/images/about-us.jpg"
                                    />
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
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature title"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.feature2_description}
                                            onChange={(e) => setData('feature2_description', e.target.value)}
                                            rows={2}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature description"
                                        />
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
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature title"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.feature3_description}
                                            onChange={(e) => setData('feature3_description', e.target.value)}
                                            rows={2}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Feature description"
                                        />
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
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="5+"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                                    <input
                                        type="text"
                                        value={data.experience_text}
                                        onChange={(e) => setData('experience_text', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Years Experience"
                                    />
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
