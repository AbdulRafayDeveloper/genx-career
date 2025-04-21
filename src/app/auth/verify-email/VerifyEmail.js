"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing token.");
            return;
        }

        const verifyEmail = async () => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.status === 200) {
                    toast.success("Email verified successfully!");
                    setIsVerified(true);
                } else {
                    toast.error(res.data.message || "Verification failed.");
                }
            } catch (err) {
                console.error("Verification error:", err);
                toast.error(err.response?.data?.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} theme="light" />

            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
                {/* Background Image */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('/images/design.png')" }}
                ></div>

                {/* Main Container */}
                <main className="w-full max-w-xl p-8 relative z-10 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-purple-800 font-serif">
                            Email Verification
                        </h1>
                        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                            {loading
                                ? "We are verifying your email. This will only take a moment..."
                                : isVerified
                                    ? "Your email address has been successfully verified! You can now access your account and enjoy all features."
                                    : "Please wait while we confirm your email address."}
                        </p>
                    </div>

                    {/* Success Icon & Button */}
                    {!loading && isVerified && (
                        <div className="text-center mt-8">
                            <div className="mb-6">
                                <img
                                    src="/images/check_5610944.png"
                                    alt="Verified"
                                    className="mx-auto w-24 h-24 animate-fade-in"
                                />
                            </div>

                            <Link
                                href="/auth/login"
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-7 rounded-lg shadow transition"
                            >
                                Go to Login
                            </Link>
                        </div>
                    )}
                </main>

                {/* Decorative Waves */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                    <svg
                        viewBox="0 0 1440 320"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block w-full h-[50vh]"
                        style={{ transform: "translateY(30%)" }}
                    >
                        <path
                            fill="white"
                            d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,192C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Optional: Add fade-in animation */}
            <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </>
    );
};

export default VerifyEmail;
