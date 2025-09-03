import { useEffect, useState } from 'react';
import axios from 'axios';
import PageForm from './PageForm';

function Dashboard() {
    const [pages, setPages] = useState([]);
    const [editingPage, setEditingPage] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = () => {
        axios.get('/api/pages').then(response => {
            setPages(response.data);
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            axios.delete(`/api/pages/${id}`).then(() => {
                fetchPages();
            });
        }
    };

    const handleEdit = (page) => {
        setEditingPage(page);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingPage(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        fetchPages();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl">CMS Dashboard</h1>
            <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Create New Page
            </button>
            {showForm && (
                <div className="mb-4">
                    <PageForm page={editingPage} onSuccess={handleFormSuccess} />
                    <button
                        onClick={() => setShowForm(false)}
                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}
            <ul className="space-y-2">
                {pages.map(page => (
                    <li key={page.id} className="flex justify-between items-center border p-2">
                        <span>{page.title} - {page.slug}</span>
                        <div>
                            <button
                                onClick={() => handleEdit(page)}
                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(page.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;