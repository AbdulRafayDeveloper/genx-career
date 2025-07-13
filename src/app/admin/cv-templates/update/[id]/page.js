"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import LeftSideBar from "../../../components/sidebar";
import { useRouter } from "next/navigation";
import Header from "../../../components/header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";

export default function ApplianceForm() {
  const router = useRouter();
  const { id } = useParams();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [file, setFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("genx_access_token");

        if (!token) {
          console.log("Token not found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data response:", response);

        if (response.status !== 200) {
          console.log("Error fetching user data:", response.data.message);
          toast.error(
            response.data.message ||
              "Profile Information not found currently. Please try again later"
          );
          return;
        }

        const data = response.data.data;
        console.log("User data:", data);
        console.log("template name:", data.name);
        setSelectedTemplate(data.name);
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error(
          error.message ||
            "Profile Information not found currently. Please try again later"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = Cookies.get("genx_access_token");
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
      return;
    }

    const formData = new FormData();
    formData.append("name", selectedTemplate);
    formData.append("template", file);

    console.log("Form Data:", formData.get("name"), formData.get("file"));
    console.log("Token:", token);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setFile(null);
        toast.success(res.data.message || "Template updated successfully.");
        setTimeout(() => {
          router.push("/admin/cv-templates");
        }, 2500);
      } else {
        toast.error(res.data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      console.log("Error:", err);
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
            <div className="hidden lg:flex text-[12px] md:text-2xl md:font-semibold ml-3">
              <HiArrowLeft
                className="cursor-pointer mr-2 mt-1"
                onClick={() => router.back()}
              />
              Back
            </div>

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
                onSubmit={handleUpdate}
                className="max-w-xl mx-auto bg-gray-50 p-8 shadow-md rounded-xl space-y-6"
              >
                <div className="block lg:hidden w-full mt-4 ml-2">
                  <div className="flex items-center gap-2">
                    <HiArrowLeft
                      className="text-xl cursor-pointer text-gray-700"
                      onClick={() => router.back()}
                    />
                    <h1 className="text-xl font-bold "> Update CV Template</h1>
                  </div>
                </div>

                {/* Desktop: Heading only (keep existing layout) */}
                <div className="hidden lg:block">
                  <h1 className="text-xl font-bold "> Update CV Template</h1>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Select Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    disabled={true}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-purple-400"
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
                      <Image
                        src={"/upload-cv.png"}
                        height={45}
                        width={45}
                        alt="Upload Icon"
                      />
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
