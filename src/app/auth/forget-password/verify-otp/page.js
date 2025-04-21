import React, { Suspense } from "react";
import VerifyOtpPage from "./VerifyOtpPage"; // Assuming your actual component is in the same folder

const Page = () => {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
            <VerifyOtpPage />
        </Suspense>
    );
};

export default Page;
