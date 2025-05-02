"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";


const NewPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { newPassword, confirmNewPassword } = formData;

        if (!newPassword || !confirmNewPassword) {
            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "All fields are required.",
            });
            return false;
        }

        if (newPassword.length < 8) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "New password must be at least 8 characters long.",
            });
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "New password and confirm password do not match.",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password`,
                { newPassword: formData.newPassword, confirmPassword: formData.confirmNewPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Password : ", response);
            console.log("Password : ", response.data);
            console.log("Password : ", response.data.data);

            if (response.status === 200) {
                toast.success(response.data.message || "Password updated successfully!");
                setTimeout(() => {
                    setLoading(false);
                    router.push("/auth/login");
                }, 2000);
            } else {
                toast.error(response.data.message || "Failed to update password. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.response.data.message || "Invalid OTP or expired. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="relative">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
                // style={{ backgroundImage: "url('/images/design.png')" }}
                ></div>
                <div className="font-[sans-serif] relative z-10">
                    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                        <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
                            <button
                                onClick={() => router.push("/")}
                                className="absolute top-6 left-6 p-4 bg-white bg-opacity-80 rounded-full text-purple-600 font-semibold hover:underline"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
                            </button>
                            <div className="hidden xl:block md:block lg:block">
                                <img src="/images/logoImg.jpg" className="rounded object-cover" />
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="max-w-md md:ml-auto w-full mt-10"
                            >
                                <h3 className="flex justify-center text-center items-center text-purple-900 font-serif text-3xl font-extrabold mb-8">
                                    Update Password
                                </h3>

                                <div className="space-y-4">

                                    <div>
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                                                <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                                            </svg>
                                            <input
                                                name="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full pl-10 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="New Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                            >
                                                {showNewPassword ? "👁️" : "👁‍🗨"}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                                                <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                                            </svg>
                                            <input
                                                name="confirmNewPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmNewPassword}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="Confirm New Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                            >
                                                {showConfirmPassword ? "👁️" : "👁‍🗨"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="!mt-8">
                                    <button
                                        type="submit"
                                        className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${loading ? "cursor-not-allowed bg-purple-300" : "hover:bg-purple-800"
                                            }`}
                                        disabled={loading}
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            {loading ? (
                                                <>
                                                    <p className="text-white text-sm">Please wait...</p>
                                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>

                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faPaperPlane} className="text-white size-4" />
                                                    <p className="text-white text-lg font-semibold">Update Password</p>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPassword;
