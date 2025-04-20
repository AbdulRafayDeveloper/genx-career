"use client";
import React from 'react';
import Link from 'next/link';
import '../app/globals.css';

const Page = () => {
    return (
        <div className="relative h-screen w-full bg-gray-100">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <img
                    src="/images/design.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 backdrop-blur-sm" />
            </div>

            {/* Content Box */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center animate-fade-in">
                    <h1 className="text-7xl font-extrabold text-purple-600 mb-4">404</h1>
                    <p className="text-xl text-gray-700 font-semibold mb-6">Oops! Page Not Found</p>
                    <p className="text-gray-500 mb-6">
                        The page you are looking for might have been removed or is temporarily unavailable.
                    </p>
                    <Link href="/" passHref>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-full transition duration-300 ease-in-out">
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
