import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function ContentForm({ content = null, section, onCancel }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        section: content?.section || section,
        key: content?.key || '',
        value: content?.value || '',
        metadata: content?.metadata || {},
        order: content?.order || 0,
        is_active: content?.is_active ?? true,
        content_type: content?.content_type || 'text',
        image: null,
    });

    const [metadataJson, setMetadataJson] = useState(
        content?.metadata ? JSON.stringify(content.metadata, null, 2) : '{}'
    );

    const [isImageType, setIsImageType] = useState(
        content?.content_type === 'image' || 
        (content?.key && (content.key.includes('image') || content.key.includes('logo')))
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('section', data.section);
            formData.append('key', data.key);
            formData.append('value', data.value);
            
            // Send metadata as string - backend will handle JSON parsing
            const metadataToSend = metadataJson && metadataJson.trim() !== '' ? metadataJson : '{}';
            formData.append('metadata', metadataToSend);
            
            formData.append('order', data.order);
            formData.append('is_active', data.is_active ? '1' : '0');
            formData.append('content_type', isImageType ? 'image' : 'text');
            
            if (data.image) {
                formData.append('image', data.image);
            }
            
            // Debug: Log form data
            console.log('Form data being sent:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            console.log('Content ID:', content?.id);
            
            if (content) {
                // For updates, use post with _method PATCH for FormData uploads
                formData.append('_method', 'PATCH');
                
                router.post(route('cms.content.update', content.id), formData, {
                    forceFormData: true,
                    onSuccess: (page) => {
                        console.log('Update successful:', page);
                        alert('Content updated successfully!');
                        reset();
                        onCancel();
                        // Reload the page to see changes
                        window.location.reload();
                    },
                    onError: (errors) => {
                        console.error('Update failed:', errors);
                        alert('Failed to update content: ' + JSON.stringify(errors));
                    }
                });
            } else {
                router.post(route('cms.content.store'), formData, {
                    forceFormData: true,
                    onSuccess: (page) => {
                        console.log('Create successful:', page);
                        alert('Content created successfully!');
                        reset();
                        onCancel();
                        // Reload the page to see changes
                        window.location.reload();
                    },
                    onError: (errors) => {
                        console.error('Create failed:', errors);
                        alert('Failed to create content: ' + JSON.stringify(errors));
                    }
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error submitting form: ' + error.message);
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
                            <div className="flex items-center space-x-4 mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isImageType}
                                        onChange={(e) => setIsImageType(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">This is an image field</span>
                                </label>
                            </div>
                            
                            {isImageType ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {content?.value && content.value.startsWith('/assets/') && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Current image:</p>
                                            <img 
                                                src={content.value} 
                                                alt="Current" 
                                                className="mt-1 h-20 w-20 object-cover rounded border"
                                            />
                                        </div>
                                    )}
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Value</label>
                                    <textarea
                                        value={data.value}
                                        onChange={(e) => setData('value', e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required={!isImageType}
                                        placeholder="Enter the content value"
                                    />
                                    {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                                </div>
                            )}
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
