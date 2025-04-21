"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PreviewCV() {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        if (url) {
            setPdfUrl(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
        }
    }, [url]);

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
