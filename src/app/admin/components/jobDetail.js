"use client";
import React from "react";
import { useParams } from "next/navigation";
import { data1 } from "./data";
import Header from "./header";

const JobDetail = () => {
  const { id } = useParams();
  const jobDetails = data1.find((item) => item.id === parseInt(id));

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-2 sm:ml-64 rounded-lg">
      <Header />
      <div className="p-6 bg-gray-50 shadow-md rounded-md max-w-5xl mx-auto mt-4">
        {/* Job Title */}
        <h1 className="text-2xl font-bold " style={{ color: "purple" }}>
          {jobDetails.title}
        </h1>
        <div className="flex items-center space-x-4 mt-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            Posted on: {jobDetails.jobPostDate}
          </span>          
        </div>

        {/* Row 1: Other Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 mt-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Job Title:
              </span>
              <span className="text-gray-600 text-sm">{jobDetails.title}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Company Name:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.companyName}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Location:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.location}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Country:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.country}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Salary:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.salary} ({jobDetails.salaryCurrency})
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Minimum Annual Salary:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.minAnnualSalary}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Maximum Annual Salary:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.maxAnnualSalary}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Industry:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.industry}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Employment Status:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.employment_statuses.join(", ")}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Remote:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.remote ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Hybrid:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.hybrid ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Seniority:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.seniority}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Founded Year:
              </span>
              <span className="text-gray-600 text-sm">
                {jobDetails.foundedYear}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-700 w-1/2">
                Company Website:
              </span>
              <a
                href={jobDetails.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit Site
              </a>
            </div>
          </div>
        </div>

        {/* Description in Single Row */}
        <div className="grid grid-cols-1 gap-y-4 mt-6">
          <div>
            <span className="font-semibold text-sm text-gray-700">
              Description:
            </span>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              {jobDetails.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
