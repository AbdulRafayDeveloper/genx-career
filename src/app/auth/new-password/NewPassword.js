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
    const [errors, setErrors] = useState({});

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
        setErrors((prevError) => ({
            ...prevError,
            [name]: ""
        }))
    };

    const validateForm = () => {
        const newError = {};
        if (formData.newPassword == "") {
            newError.newPassword = "New Password is required"
        } else if (formData.newPassword.length < 8) {
            newError.newPassword = "New Password should be at least 8 characters";
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(formData.newPassword)
        ) {
            newError.newPassword =
                "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        if (formData.confirmNewPassword == "") {
            newError.confirmNewPassword = "Confirm Password is required"
        } else if (formData.newPassword !== formData.confirmNewPassword) {
            newError.confirmNewPassword = "Confirm Password must be same as New Password"
        }
        return newError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (Object.keys(isValid).length > 0) {
            setErrors(isValid);
            return;
        }
        setErrors({}); // Clear previous errors

        // if (!validateForm()) return;

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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute inset-x-0 left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-4">
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-gray-400"
                                                    >
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="size-5"
                                                    >
                                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.newPassword && (
                                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute inset-x-0 left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-4">
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-gray-400"
                                                    >
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="size-5"
                                                    >
                                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.confirmNewPassword && (
                                            <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                                        )}
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
                                                    <p className="text-white text-lg">Please wait</p>
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
