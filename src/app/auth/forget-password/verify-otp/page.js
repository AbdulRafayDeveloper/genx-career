import React, { Suspense } from "react";
import VerifyOtpPage from "./VerifyOtpPage";

const Page = () => {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
            <VerifyOtpPage />
        </Suspense>
    );
};

export default Page;
