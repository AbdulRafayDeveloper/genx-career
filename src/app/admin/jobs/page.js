"use client";
import React from "react";
import JobListing from "../components/jobListing";
import LeftSideBar from "../components/sidebar";
const JobsListing = () => {
  return (
    <>
      <LeftSideBar />
      <JobListing />
    </>
  );
};

export default JobsListing;
