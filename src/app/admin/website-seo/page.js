'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSideBar from '../components/sidebar';
import Header from '../components/header';

export default function SeoFormPage() {
    const router = useRouter();
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [pageName, setPageName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [indexable, setIndexable] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [recordId, setRecordId] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((v) => !v);

    const pageOptions = [
        { value: 'Jobs', label: 'Jobs' },
        { value: 'CvMatching', label: 'CvMatching' },
        { value: 'CvCreation', label: 'CvCreation' },
        { value: 'Register', label: 'Register' },
        { value: 'Login', label: 'Login' },
        { value: 'About', label: 'About' }
    ];

    // fetch existing SEO for selected page
    useEffect(() => {
        if (!pageName) return;
        const fetch = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seo-page?pageName=${pageName}`);
                if (res.data.status === 200 && res.data.data) {
                    const e = res.data.data;
                    setTitle(e.title);
                    setDescription(e.description);
                    setKeywords(e.keywords.join(', '));
                    setIndexable(e.index);
                    setRecordId(e._id);
                    setIsEdit(true);
                } else {
                    // not found → clear form
                    setTitle('');
                    setDescription('');
                    setKeywords('');
                    setIndexable(false);
                    setRecordId(null);
                    setIsEdit(false);
                }
            } catch (err) {
                // 404 or other → treat as new
                setTitle('');
                setDescription('');
                setKeywords('');
                setIndexable(false);
                setRecordId(null);
                setIsEdit(false);
            }
        };
        fetch();
    }, [pageName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pageName) { toast.error('Please select a page.'); return; }
        if (!title.trim()) { toast.error('Title is required.'); return; }
        if (!description.trim()) { toast.error('Description is required.'); return; }
        const kwArray = keywords.split(',').map((k) => k.trim()).filter(Boolean);
        if (kwArray.length === 0) { toast.error('At least one keyword is required.'); return; }

        setLoading(true);
        try {
            const payload = { pageName, title, description, keywords: kwArray, index: indexable };
            let res;

            console.log('Payload:', payload);
            console.log('Record ID:', recordId);
            if (isEdit && recordId) {
                res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seo/${recordId}`, payload, {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                });
            } else {
                res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seo`, payload, {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                });
            }
            console.log('Response:', res);
            console.log('Response:', res.data);
            console.log('Response:', res.data.data);
            if (res.data.status === 200) {
                toast.success(res.data.message || 'Saved successfully.');
                // redirect back to list after a moment
                setTimeout(() => router.push('/admin/website-seo'), 1500);
            } else {
                toast.error(res.data.message || 'Save failed.');
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Save failed');
        }
        setLoading(false);
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="overflow-y-auto min-h-screen">
                {/* Mobile toggle */}
                <button
                    ref={buttonRef}
                    onClick={toggleSidebar}
                    className="p-2 m-2 text-gray-600 sm:hidden"
                >
                    ☰
                </button>

                {/* Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`fixed top-0 left-0 w-64 h-full bg-white shadow transform transition-transform
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                >
                    <LeftSideBar section="Website SEO" />
                </aside>

                {/* Main */}
                <div className="sm:ml-64">
                    <Header title={isEdit ? 'Edit SEO' : 'Add SEO'} toggleSidebar={toggleSidebar} />

                    <main className="p-6 my-12">
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow"
                        >
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Page</label>
                                    <select
                                        value={pageName}
                                        onChange={(e) => setPageName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="" disabled>
                                            — Select page —
                                        </option>
                                        {pageOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Keywords <span className="text-sm text-gray-500">(comma‑separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="indexable"
                                        type="checkbox"
                                        checked={indexable}
                                        onChange={(e) => setIndexable(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="indexable" className="font-medium">
                                        Index this page?
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {loading ? 'Please wait…' : isEdit ? 'Update SEO' : 'Add SEO'}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}
