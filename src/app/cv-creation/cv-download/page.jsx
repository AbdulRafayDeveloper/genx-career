import React, { Suspense } from "react";
import CVDownload from "./CVDownload.js";

const Page = () => {
  console.log("cv download");
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10 text-gray-500">Loading...</div>
      }
    >
      <CVDownload />
    </Suspense>
  );
};

export default Page;
