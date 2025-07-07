'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSideBar from '../components/sidebar';
import Header from '../components/header';
import { HiArrowLeft } from 'react-icons/hi';

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
                    headers: { Authorization: `Bearer ${Cookies.get('genx_access_token')}` }
                });
            } else {
                res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seo`, payload, {
                    headers: { Authorization: `Bearer ${Cookies.get('genx_access_token')}` }
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
                <div className="p-2 w-full">
                    <div className="flex items-center justify-between">
                        {/* Mobile: Show sidebar toggle */}
                        <LeftSideBar />

                        {/* Title*/}
                        <p className="flex items-center text-[12px] md:text-2xl md:font-semibold ml-3">
                            <HiArrowLeft
                                className="cursor-pointer mr-2 mt-1"
                                onClick={() => router.back()}
                            />
                            Back
                        </p>

                        {/* Header component */}
                        <div className="ml-auto">
                            <Header appear={true} />
                        </div>
                    </div>
                </div>
                {/* Main */}
                <div className="sm:ml-64">
                    {/* <Header title={isEdit ? 'Edit SEO' : 'Add SEO'} toggleSidebar={toggleSidebar} /> */}

                    <main className="px-4 sm:px-6 md:px-10 py-12 bg-white min-h-screen">
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-purple-300"
                        >
                            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">SEO Configuration</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Page Select */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block font-semibold text-gray-700 mb-1">Page</label>
                                    <select
                                        value={pageName}
                                        onChange={(e) => setPageName(e.target.value)}
                                        required
                                        className="w-full p-3 border border-purple-400 focus:ring-2 focus:ring-purple-500 rounded-lg outline-none"
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

                                {/* Title */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="Enter the Title"
                                        className="w-full p-3 border border-purple-400 focus:ring-2 focus:ring-purple-500 rounded-lg outline-none"
                                    />
                                </div>

                                {/* Keywords */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-1">
                                        Keywords <span className="text-sm text-gray-500">(comma‑separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        required
                                        placeholder="Enter the Keywords"
                                        className="w-full p-3 border border-purple-400 focus:ring-2 focus:ring-purple-500 rounded-lg outline-none"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Enter the Description"
                                        rows="4"
                                        className="w-full p-3 border border-purple-400 focus:ring-2 focus:ring-purple-500 rounded-lg outline-none resize-none"
                                    />
                                </div>

                                {/* Indexable Checkbox */}
                                <div className="col-span-1 md:col-span-2 flex items-center space-x-3">
                                    <input
                                        id="indexable"
                                        type="checkbox"
                                        checked={indexable}
                                        onChange={(e) => setIndexable(e.target.checked)}
                                        className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                    />
                                    <label htmlFor="indexable" className="text-gray-700 font-medium">
                                        Index this page?
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
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
