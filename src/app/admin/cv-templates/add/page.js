"use client";

import { useState, useEffect, useRef } from "react";
import LeftSideBar from "../../components/sidebar";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function ApplianceForm() {
    const router = useRouter();
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [file, setFile] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get("token");
        if (!token) {
            console.log("Token not found");
            toast.error("Please login again.");
            router.push("/auth/login");
            return;
        }

        if (!file) {
            toast.error("Please upload a file.");
            return;
        }

        // check file extension

        const fileExtension = file.name.split(".").pop().toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png"];

        if (!allowedExtensions.includes(fileExtension)) {
            toast.error("Please upload a image file of type jpg, jpeg or png.");
            setFile(null);
            return;
        }

        if (!selectedTemplate) {
            toast.error("Please select a template.");
            return;
        }

        const formData = new FormData();
        formData.append("name", selectedTemplate);
        formData.append("template", file);

        console.log("Form Data:", formData.get("name"), formData.get("file"));
        console.log("Token:", token);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cvTemplate`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                setFile(null);
                setSelectedTemplate("");
                toast.success(res.data.message);
                setTimeout(() => {
                    router.push("/admin/cv-templates");
                }, 2500);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="overflow-y-auto scrollbar-hidden">
                <button
                    ref={buttonRef}
                    onClick={handleSidebarToggle}
                    aria-controls="separator-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>

                <aside
                    ref={sidebarRef}
                    id="separator-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <LeftSideBar section="Password Update" />
                </aside>

                {/* Main Content */}
                <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
                    {/* header */}
                    <Header />
                    <main className="flex-1">
                        {/* Form Section */}
                        <section className="p-8">
                            <form
                                onSubmit={handleSubmit}
                                className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-xl space-y-6"
                            >
                                <h2 className="text-2xl font-semibold text-center mb-4">Upload CV Template</h2>
                                <div>
                                    <label className="block mb-2 text-gray-700 font-medium">
                                        Select Template
                                    </label>
                                    <select
                                        value={selectedTemplate}
                                        onChange={(e) => setSelectedTemplate(e.target.value)}
                                        required
                                        className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        <option value="" disabled>
                                            -- Choose Template --
                                        </option>
                                        <option value="template1">Template 1</option>
                                        <option value="template2">Template 2</option>
                                        <option value="template3">Template 3</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-gray-700 font-medium">
                                        Upload Template Image
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center w-full px-4 py-8 text-gray-600 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                                            <FaUpload size={24} className="mb-2" />
                                            <span className="text-sm">Click to upload image</span>
                                            <input
                                                id="file"
                                                name="file"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />

                                            {file && (
                                                <span className="mt-2 text-sm text-gray-500">
                                                    {file.name}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="p-2 px-12 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-800 transition-colors duration-300"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

