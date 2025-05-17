"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jwtVerify } from 'jose';

const VerifyOtpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(() => searchParams.get("token") || "");
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_RESEND_TOKEN_SECRET_KEY);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(120);
    const [otpExpired, setOtpExpired] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        const getEmailFromToken = async () => {
            try {
                const { payload } = await jwtVerify(token, JWT_SECRET);
                console.log("payload:", payload);
                setEmail(payload.email);
                console.log("Email from token:", payload.email);
            } catch (err) {
                console.log("JWT Verify error:", err);
                toast.error("Invalid or expired token.");
            }
        };
        if (token) getEmailFromToken();
    }, [token]);

    useEffect(() => {
        if (timer === 0) {
            setOtpExpired(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 120) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleResendOtp = async () => {
        try {
            // console.log("Token:", token);
            // console.log("JWT_SECRET:", JWT_SECRET);
            // const { payload } = await jwtVerify(token, JWT_SECRET);
            // console.log("payload:", payload);
            // email = payload.email;
            console.log("Email from token:", email);

            if (!email) {
                toast.error("Email is required.");
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resend-otp`, { email });

            if (response.status !== 200) {
                toast.error(response.data.message || "Failed to resend OTP. Please try again.");
                return;
            }

            const newToken = response.data.data;
            setToken(newToken);
            router.replace(`/auth/forget-password/verify-otp?token=${newToken}`, { scroll: false });

            toast.success(response.data.message || "OTP resent successfully!");
            setTimer(120);
            setOtpExpired(false);
            setOtp(["", "", "", "", "", ""]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to resend OTP.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-otp`,
                { userOtp: enteredOtp },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                toast.error(response.data.message || "Invalid OTP or expired. Please try again.");
                setLoading(false);
                return;
            }

            const otpVerifiedToken = response.data.data;
            toast.success(response.data.message || "OTP verified! Redirecting...");

            setTimeout(() => {
                setLoading(false);
                router.push(`/auth/new-password?token=${otpVerifiedToken}`);
            }, 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP or expired. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBsicscfPq6Fw86u6OmNdPhhRt5WV8o-gS1A&s')" }}>
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md bg-opacity-50">
                    <h1 className="text-2xl font-bold text-center text-purple-900">Verify OTP</h1>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        An OTP has been sent to your email. Please enter the 6-digit code below.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
                        <div className="flex space-x-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    className="xl:w-12 xl:h-12 lg:w-10 lg:w-10 md:w-10 md:w-10 w-8 h-8  text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                                />
                            ))}
                        </div>

                        <div className="mt-4 text-sm text-gray-600 text-center">
                            {otpExpired ? (
                                <span className="text-red-500 font-medium">OTP expired!</span>
                            ) : (
                                <>
                                    OTP expires in{" "}
                                    <span className="font-semibold text-purple-700">{timer}s</span>
                                </>
                            )}
                        </div>

                        {otpExpired && (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="mt-3 text-purple-700 hover:underline text-sm font-medium"
                            >
                                Resend OTP
                            </button>
                        )}

                        <button
                            type="submit"
                            className={`mt-6 w-full font-semibold py-3 rounded-md transition ${otpExpired
                                ? "bg-gray-300 hover:bg-gray-400 text-white cursor-not-allowed"
                                : "bg-purple-800 hover:bg-purple-700 text-white"
                                }`}
                            disabled={otpExpired}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center gap-2 text-white text-lg font-semibold">
                                    <p>Please wait</p>
                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                                </div>
                            ) : (
                                <p className="text-center">Verify OTP</p>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOtpPage;
