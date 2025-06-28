"use client";

import { useState, useEffect, useRef } from "react";
import LeftSideBar from "../../components/sidebar";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ApplianceForm() {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [file, setFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = Cookies.get("access_token");
    if (!token) {
      console.log("Token not found");
      setLoading(false);
      toast.error("Please login again.");
      router.push("/auth/login");
      return;
    }

    if (!file) {
      toast.error("Please upload a file.");
      setLoading(false);
      return;
    }

    // check file extension

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Please upload a image file of type jpg, jpeg or png.");
      setFile(null);
      setLoading(false);
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a template.");
      setLoading(false);
      return;
    }

    const allowedTemplates = ["template1", "template2", "template3"];

    if (!allowedTemplates.includes(selectedTemplate)) {
      toast.error("Invalid template selected.");
      setLoading(false);
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("name", selectedTemplate);
    formData.append("template", file);

    console.log("Form Data:", formData.get("name"), formData.get("file"));
    console.log("Token:", token);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setFile(null);
        setSelectedTemplate("");
        toast.success(res.data.message || "Template uploaded successfully.");
        setTimeout(() => {
          router.push("/admin/cv-templates");
        }, 2500);
      } else {
        toast.error(
          res.data.message || "Failed to upload template. Please try again."
        );
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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
        <div className="p-2 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile: Show sidebar toggle */}
            <LeftSideBar />

            {/* Title */}
            <p className="text-[12px] md:text-2xl md:font-semibold ml-3 md:ml-64">
              Welcome Back!
            </p>

            {/* Header component */}
            <div className="ml-auto">
              <Header appear={true} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
          {/* header */}
          {/* <Header /> */}
          <main className="flex-1">
            {/* Form Section */}
            <section className="p-8">
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-gray-100 p-8 shadow-lg shadow-purple-300 rounded-xl space-y-6"
              >
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Upload CV Template
                </h2>
                <div>
                  <label className="block mb-2 text-lg font-bold">
                    Select Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    required
                    className="w-full p-3 border-2 rounded-md outline-none border-purple-400"
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
                  <label className="block mb-2 text-lg font-bold">
                    Upload Template Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center w-full px-4 py-8 text-gray-600 bg-gray-50 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:border-gray-400">
                      <Image src={"/upload-cv.png"} height={45} width={45} />
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
                    className={`p-2 px-12 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-800 transition-colors duration-300 ${
                      loading
                        ? "cursor-not-allowed bg-purple-600"
                        : "hover:bg-purple-800"
                    }`}
                    disabled={loading}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      {loading ? (
                        <>
                          <p className="text-white text-lg font-semibold">
                            Please wait
                          </p>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <p className="text-white text-lg font-semibold">
                            Submit
                          </p>
                        </>
                      )}
                    </div>
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
