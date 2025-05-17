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
import Image from "next/image";


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
                            <div className="relative w-full mt-12 h-48 sm:h-64 md:h-80 lg:h-96 rounded-md overflow-hidden md:block lg:block xl:block hidden">
                                <Image
                                    src="/images/logo.png"
                                    alt="GenX Career Logo"
                                    fill
                                    className="object-fit object-center ml-3"
                                    priority
                                />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-purple-400 w-4 h-5">
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
                                                {showNewPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                                                        <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-purple-400 w-4 h-5">
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
                                                {showConfirmPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                                                        <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z" /></svg>
                                                )}
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
                                                    <p className="text-white text-lg">Please wait...</p>
                                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>

                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faPaperPlane} className="text-white size-3" />
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
