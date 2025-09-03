import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function PageForm({ page = null, onSuccess }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: page?.title || '',
        content: page?.content || '',
        slug: page?.slug || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (page) {
            put(`/api/pages/${page.id}`, {
                onSuccess: () => onSuccess && onSuccess(),
            });
        } else {
            post('/api/pages', {
                onSuccess: () => onSuccess && onSuccess(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Slug</label>
                <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    rows="10"
                    required
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            </div>
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {page ? 'Update' : 'Create'} Page
            </button>
        </form>
    );
}
