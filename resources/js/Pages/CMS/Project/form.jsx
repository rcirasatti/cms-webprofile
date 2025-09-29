import React from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from '../../../Components/ui/Toast';

export default function ProjectForm({ project, onCancel }) {
    const { showSuccess, showError } = useToast();
    const { data, setData, post, put, patch, processing, errors } = useForm({
        title: project?.title || "",
        category: project?.category || "",
        description: project?.description || "",
        image: null,
        is_active: project?.is_active ?? true,
        order: project?.order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("is_active", data.is_active ? "1" : "0");
        formData.append("order", data.order);

        if (data.image) {
            formData.append("image", data.image);
        }

        if (project) {
            patch(route("cms.projects.update", project.id), {
                data: formData,
                onSuccess: () => {
                    showSuccess('Project updated successfully!');
                    setTimeout(() => onCancel(), 1500);
                },
                onError: () => {
                    showError('Failed to update project. Please check your inputs.');
                }
            });
        } else {
            post(route("cms.projects.store"), {
                data: formData,
                onSuccess: () => {
                    showSuccess('Project created successfully!');
                    setTimeout(() => onCancel(), 1500);
                },
                onError: () => {
                    showError('Failed to create project. Please check your inputs.');
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {project ? "Edit Project" : "Add New Project"}
                    </h3>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="IoT Solution">
                                    IoT Solution
                                </option>
                                <option value="Digital Solution">
                                    Digital Solution
                                </option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {project?.image_path && (
                                <div className="mt-2">
                                    <img
                                        src={project.image_path}
                                        alt="Current image"
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                </div>
                            )}
                            {errors.image && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Active
                                </span>
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Order
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) =>
                                    setData("order", parseInt(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
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
                                {processing
                                    ? "Saving..."
                                    : project
                                    ? "Update"
                                    : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
