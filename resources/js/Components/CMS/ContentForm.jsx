import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ContentForm({ content = null, section, onCancel }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        section: content?.section || section,
        key: content?.key || '',
        value: content?.value || '',
        metadata: content?.metadata || {},
        order: content?.order || 0,
        is_active: content?.is_active ?? true,
    });

    const [metadataJson, setMetadataJson] = useState(
        content?.metadata ? JSON.stringify(content.metadata, null, 2) : '{}'
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            const parsedMetadata = JSON.parse(metadataJson);
            setData('metadata', parsedMetadata);
            
            if (content) {
                patch(route('cms.content.update', content.id), {
                    onSuccess: () => {
                        reset();
                        onCancel();
                    }
                });
            } else {
                post(route('cms.content.store'), {
                    onSuccess: () => {
                        reset();
                        onCancel();
                    }
                });
            }
        } catch (error) {
            alert('Invalid JSON in metadata field');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {content ? 'Edit Content' : 'Add New Content'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Section</label>
                            <input
                                type="text"
                                value={data.section}
                                onChange={(e) => setData('section', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                readOnly={!!content}
                            />
                            {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Key</label>
                            <input
                                type="text"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                placeholder="e.g., title, subtitle, description"
                            />
                            {errors.key && <p className="text-red-500 text-sm mt-1">{errors.key}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Value</label>
                            <textarea
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                placeholder="Enter the content value"
                            />
                            {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Metadata (JSON)
                                <span className="text-gray-500 text-xs"> - Optional: for images, links, etc.</span>
                            </label>
                            <textarea
                                value={metadataJson}
                                onChange={(e) => setMetadataJson(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                placeholder='{"image": "/path/to/image.jpg", "alt": "Image description"}'
                            />
                            {errors.metadata && <p className="text-red-500 text-sm mt-1">{errors.metadata}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Order</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                />
                                {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.value === 'true')}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                {errors.is_active && <p className="text-red-500 text-sm mt-1">{errors.is_active}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : (content ? 'Update' : 'Create')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
