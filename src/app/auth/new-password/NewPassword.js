"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);

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
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/resetpassword`,
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
                toast.success("Password updated successfully!");
                setTimeout(() => {
                    setLoading(false);
                    router.push("/auth/login");
                }, 2000);
            } else {
                toast.error(response.data.message || "Failed to update password. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            toast.error( err.response.data.message || "Invalid OTP or expired. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="relative">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/design.png')" }}
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
                            <div>
                                <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-purple-900 font-serif">
                                    Seamless Update: Secure Your Password
                                </h2>
                                <p className="text-sm mt-6 text-gray-800">
                                    Immerse yourself in a hassle-free security update with our
                                    intuitively designed password reset form. Effortlessly update
                                    your password and secure your account.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="max-w-md md:ml-auto w-full"
                            >
                                <h3 className="text-purple-900 font-serif text-3xl font-extrabold mb-8">
                                    Update Password
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <input
                                            name="newPassword"
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            required
                                            className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                            placeholder="New Password"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="confirmNewPassword"
                                            type="password"
                                            value={formData.confirmNewPassword}
                                            onChange={handleChange}
                                            required
                                            className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                            placeholder="Confirm New Password"
                                        />
                                    </div>
                                </div>

                                <div className="!mt-8">
                                    <button
                                        type="submit"
                                        className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-purple-600 text-white hover:text-purple-500 focus:outline-none"
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Update Password"}
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
