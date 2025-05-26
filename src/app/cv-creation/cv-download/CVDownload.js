"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CVDownload() {
    const searchParams = useSearchParams();
    // const url = searchParams.get("url");
    // const rawUrl = searchParams.get("url");
    const [pdfUrl, setPdfUrl] = useState("");

    // useEffect(() => {
    //     if (url) {
    //         setPdfUrl(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
    //     }
    // }, [url]);

    useEffect(() => {
        // console.log("rawUrl:", rawUrl);
        // // if (url) {
        // //     // ✅ Use the full URL directly
        // //     setPdfUrl(url);
        // // }
        // if (rawUrl) {
        //     // ✅ decode it once in case it's encoded
        //     const decodedUrl = decodeURIComponent(rawUrl);
        //     console.log("decodedUrl:", decodedUrl);
        //     setPdfUrl(decodedUrl);
        // }
        const downloadUrl = Cookies.get("downloadUrl");
        console.log("downloadUrl:", downloadUrl);
        if (downloadUrl) {
            // If the download URL is stored in cookies, use it
            setPdfUrl(downloadUrl);
        } else {
            console.error("No valid URL found for PDF download.");
        }
    }, []);

    if (!pdfUrl) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-[url('/images/Generate.jpg')] bg-cover bg-no-repeat bg-fixed">
            <div className="backdrop-blur-sm bg-white/30 min-h-screen p-10 flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-6 text-purple-950">
                    Your Resume Preview
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
    );
}
