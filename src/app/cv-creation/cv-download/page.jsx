import React, { Suspense } from "react";
import CVDownload from "./CVDownload.js"; // Assuming your actual component is in the same folder

const Page = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
      <CVDownload />
    </Suspense>
  );
};

export default Page;
