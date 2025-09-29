import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useToast } from '../../../Components/ui/Toast';

export default function PortfolioForm({ portfolio, onCancel }) {
    const formKey = portfolio ? `edit-${portfolio.id}` : 'create';
    const { showSuccess, showError } = useToast();

    const { data, setData, post, put, patch, processing, errors, reset } = useForm({
        title: portfolio?.title || '',
        description: portfolio?.description || '',
        category: portfolio?.category || '',
        image: null,
        is_active: portfolio?.is_active ?? true,
        order: portfolio?.order || 0,
        tags: Array.isArray(portfolio?.tags) ? portfolio.tags : [],
        features: Array.isArray(portfolio?.features) ? portfolio.features : [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('order', data.order);
        
        // Add tags as JSON
        formData.append('tags', JSON.stringify(data.tags));
        
        // Add features as JSON
        formData.append('features', JSON.stringify(data.features));

        if (data.image) {
            formData.append('image', data.image);
        }

        if (portfolio) {
            patch(route('cms.portfolios.update', portfolio.id), {
                data: formData,
                onSuccess: () => {
                    showSuccess('Portfolio updated successfully!');
                    onCancel();
                },
                onError: (errors) => {
                    showError('Failed to update portfolio. Please check your inputs.');
                }
            });
        } else {
            post(route('cms.portfolios.store'), {
                data: formData,
                onSuccess: () => {
                    showSuccess('Portfolio created successfully!');
                    onCancel();
                },
                onError: (errors) => {
                    showError('Failed to create portfolio. Please check your inputs.');
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {portfolio ? 'Edit Portfolio' : 'Add New Portfolio'}
                    </h3>

                    <form key={formKey} onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                <option value="IoT Solution">IoT Solution</option>
                                <option value="Digital Solution">Digital Solution</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Technologies/Tags
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['IoT', 'Smart Monitoring', 'Aquaculture', 'Mobile App', 'Web Development', 'AI/ML', 'Digital Solution', 'Consulting'].map((tag) => (
                                    <label key={tag} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.tags.includes(tag)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData('tags', [...data.tags, tag]);
                                                } else {
                                                    setData('tags', data.tags.filter(t => t !== tag));
                                                }
                                            }}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{tag}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Key Features/Advantages
                            </label>
                            {data.features.map((feature, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => {
                                            const newFeatures = [...data.features];
                                            newFeatures[index] = e.target.value;
                                            setData('features', newFeatures);
                                        }}
                                        placeholder="Enter a key feature"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newFeatures = data.features.filter((_, i) => i !== index);
                                            setData('features', newFeatures);
                                        }}
                                        className="ml-2 px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setData('features', [...data.features, ''])}
                                className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100"
                            >
                                Add Feature
                            </button>
                            {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setData('image', e.target.files[0])}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {portfolio?.image_path && (
                                <div className="mt-2">
                                    <img
                                        src={portfolio.image_path}
                                        alt="Current"
                                        className="h-20 w-20 object-cover rounded"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Current image</p>
                                </div>
                            )}
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Order
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                            {errors.order && <p className="text-red-500 text-xs mt-1">{errors.order}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm text-gray-700">Active</span>
                            </label>
                            {errors.is_active && <p className="text-red-500 text-xs mt-1">{errors.is_active}</p>}
                        </div>

                        <div className="flex justify-end space-x-3">
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
                                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 hover:shadow-lg hover:scale-105 focus:outline-none disabled:opacity-50 transition-all duration-300"
                            >
                                {processing ? 'Saving...' : (portfolio ? 'Update' : 'Create')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
