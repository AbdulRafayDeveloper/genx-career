"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    console.log("Token from query:", token);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [otpExpired, setOtpExpired] = useState(false);
    const inputRefs = useRef([]);

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

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleResendOtp = async () => {
        try {
            // Call your resend OTP API here using the token
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resend-otp`, { token });

            if (response.status !== 200) {
                toast.error("Failed to resend OTP. Please try again.");
                return;
            }
            toast.success("OTP resent successfully!");
            setTimer(60);
            setOtpExpired(false);
            setOtp(["", "", "", "", "", ""]);
        } catch (err) {
            toast.error("Failed to resend OTP.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }

        console.log("Entered OTP: ", enteredOtp);
        console.log("Token: ", token);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyotp`,
                { userOtp: enteredOtp },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                toast.error("Invalid OTP or expired. Please try again.");
                return;
            }

            console.log("OTP verified successfully: ", response);
            console.log("OTP verified successfully: ", response.data);
            console.log("OTP verified successfully: ", response.data.data);

            const otpVerifiedToken = response.data.data;

            toast.success("OTP verified! Redirecting...");
            setTimeout(() => {
                router.push(`/auth/new-password?token=${otpVerifiedToken}`);
            }, 2000);
        } catch (err) {
            toast.error("Invalid OTP or expired. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
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
                                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                                />
                            ))}
                        </div>

                        {/* Timer and Expiry Message */}
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

                        {/* Resend OTP */}
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
                            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md"
                            disabled={otpExpired}
                        >
                            Verify OTP
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOtpPage;
