"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CVDownload() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const token = Cookies.get("genx_access_token");
    if (!token) {
      toast.error(
        "You are not logged in. Please login first to create your CV.",
        {
          position: "top-right",
          autoClose: 3000, // 5 seconds so user can read
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 3500); // Wait slightly longer than toast so they can read
    }
  }, []);

  useEffect(() => {
    const downloadUrl = Cookies.get("downloadUrl");
    console.log("downloadUrl:", downloadUrl);
    if (downloadUrl) {
      // If the download URL is stored in cookies, use it
      setPdfUrl(downloadUrl);
    } else {
      console.log("No valid URL found for PDF download.");
    }
  }, []);

  if (!pdfUrl) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer position="top-center" />
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 p-3 bg-opacity-80 rounded-full text-white font-semibold hover:underline z-50"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
        <span className="text-base">Go to home page</span>
      </button>

      <div className="min-h-screen bg-[url('/bg/bg.jpg')] bg-cover bg-no-repeat bg-fixed">
        <div className="backdrop-blur-sm bg-white/30 min-h-screen p-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6 text-purple-50 mt-10">
            Preview Your Standout CV
          </h1>
          <iframe
            src={pdfUrl}
            width="100%"
            height="700px"
            className="border rounded-xl shadow-lg max-w-4xl"
          >
            <p>
              Your browser does not support PDFs. Please download the file to view
              it.
            </p>
          </iframe>
        </div>
      </div>
    </>
  );
}
