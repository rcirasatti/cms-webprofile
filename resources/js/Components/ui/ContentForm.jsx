import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ContentForm({ content = null, section, onCancel }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        section: content?.section || section || '',
        key: content?.key || '',
        value: content?.value || '',
        metadata: content?.metadata || '',
        order: content?.order || 0,
        is_active: content?.is_active ?? true,
        content_type: content?.content_type || 'text',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content) {
            patch(route('cms.content.update', content.id), {
                onSuccess: () => {
                    reset();
                    onCancel();
                },
            });
        } else {
            post(route('cms.content.store'), {
                onSuccess: () => {
                    reset();
                    onCancel();
                },
            });
        }
    };

    return (
        <Modal show={true} onClose={onCancel} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {content ? 'Edit Content' : 'Add New Content'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="section" value="Section" />
                        <TextInput
                            id="section"
                            type="text"
                            value={data.section}
                            onChange={(e) => setData('section', e.target.value)}
                            className="mt-1 block w-full"
                            readOnly={!!content}
                        />
                        <InputError message={errors.section} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="key" value="Key" />
                        <TextInput
                            id="key"
                            type="text"
                            value={data.key}
                            onChange={(e) => setData('key', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.key} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="content_type" value="Content Type" />
                        <select
                            id="content_type"
                            value={data.content_type}
                            onChange={(e) => setData('content_type', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="url">URL</option>
                        </select>
                        <InputError message={errors.content_type} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="value" value="Value" />
                        {data.content_type === 'text' ? (
                            <textarea
                                id="value"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="3"
                            />
                        ) : (
                            <TextInput
                                id="value"
                                type="text"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                className="mt-1 block w-full"
                            />
                        )}
                        <InputError message={errors.value} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="metadata" value="Metadata (JSON)" />
                        <textarea
                            id="metadata"
                            value={data.metadata}
                            onChange={(e) => setData('metadata', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="2"
                            placeholder='{"alt": "Image description", "class": "custom-class"}'
                        />
                        <InputError message={errors.metadata} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="order" value="Order" />
                        <TextInput
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value))}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.order} className="mt-2" />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <SecondaryButton onClick={onCancel}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {content ? 'Update' : 'Create'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}