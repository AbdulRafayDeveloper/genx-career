"use client";

import React, { useState, use, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const steps = ["Personal Info", "Education", "Experience & Skills"];

const Page = () => {
  // const resolvedParams = use(params);
  const router = useRouter();
  // const id = resolvedParams?.id;
  const { name } = useParams();
  console.log("Name :", name);
  const [isGenerating, setIsGenerating] = useState(false);

  const isImageInputEnabled = name === "template1" || name === "template3";
  console.log(isImageInputEnabled);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    interests: [""],
    languages: [{ language: "", proficiency: "" }],
    education: [{ degree: "", institution: "", cgpa: "", year: "" }],
    certificates: [{ name: "", date: "" }],
    experience: [{ title: "", company: "", description: "" }],
    projects: [{ name: "", technologies: [""], link: "" }],
    skills: [""],
    imageUrl: "N/A",
    templateName: "",
    color: "#2563eb",
    templateName: "",
  });

  useEffect(() => {
    if (name) {
      setFormData((prev) => ({ ...prev, templateName: `${name}` }));
      console.log(`template${name}`);
    }
  }, [name]);

  const [errors, setErrors] = useState({
    imageUrl: "",
    name: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
    },
    languages: [{ language: "", proficiency: "" }],
    education: [{ degree: "", institution: "", cgpa: "", year: "" }],
    skills: "",
  });

  const handleNext = async () => {
    const newErrors = {
      imageUrl: "",
      name: "",
      summary: "",
      contact: {
        email: "",
        phone: "",
        location: "",
      },
      languages: [],
      education: [],
      skills: "",
    };

    let isValid = true;

    // Step 0: Personal Info
    if (activeStep === 0) {
      if (!formData.imageUrl) {
        newErrors.imageUrl = "Profile image is required.";
        isValid = false;
      }

      if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
      }

      if (!formData.summary.trim()) {
        newErrors.summary = "Summary is required.";
        isValid = false;
      }

      if (!formData.contact.email.trim()) {
        newErrors.contact.email = "Email is required.";
        isValid = false;
      }

      if (!formData.contact.phone.trim()) {
        newErrors.contact.phone = "Phone number is required.";
        isValid = false;
      }

      if (!formData.contact.location.trim()) {
        newErrors.contact.location = "Location is required.";
        isValid = false;
      }

      newErrors.languages = formData.languages.map((lang) => {
        const entry = { language: "", proficiency: "" };
        if (!lang.language.trim()) {
          entry.language = "Language is required.";
          isValid = false;
        }
        if (!lang.proficiency.trim()) {
          entry.proficiency = "Proficiency is required.";
          isValid = false;
        }
        return entry;
      });
    }

    // Step 1: Education & Skills
    if (activeStep === 1) {
      newErrors.education = formData.education.map((edu) => {
        const entry = { degree: "", institution: "", cgpa: "", year: "" };
        if (!edu.degree.trim()) {
          entry.degree = "Degree is required.";
          isValid = false;
        }
        if (!edu.institution.trim()) {
          entry.institution = "institution is required.";
          isValid = false;
        }
        if (!edu.cgpa.trim()) {
          entry.cgpa = "CGPA is required.";
          isValid = false;
        } else {
          const cgpaVal = parseFloat(edu.cgpa);
          if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 4) {
            entry.cgpa = "CGPA must be a number between 0 and 4.0";
            isValid = false;
          }
        }

        if (!edu.year.trim()) {
          entry.year = "Year is required.";
          isValid = false;
        } else if (!/^\d{4}-\d{4}$/.test(edu.year)) {
          entry.year = "Year format should be like 2021-2025";
          isValid = false;
        }

        return entry;
      });

      if (formData.skills.some((skill) => !skill.trim())) {
        newErrors.skills = "Skill fields must be filled.";
        isValid = false;
      }
    }
    // Add this inside your handleNext function under step 2 validation:
    if (activeStep === 2) {
      // Initialize new error arrays
      newErrors.experience = [];
      newErrors.projects = [];
      newErrors.certificates = [];

      // Validate Experience
      formData.experience.forEach((exp) => {
        const entry = { title: "", company: "", description: "" };
        const hasAny =
          exp.title.trim() || exp.company.trim() || exp.description.trim();
        const hasAll =
          exp.title.trim() && exp.company.trim() && exp.description.trim();

        if (hasAny && !hasAll) {
          if (!exp.title.trim()) entry.title = "Job title is required.";
          if (!exp.company.trim()) entry.company = "Company name is required.";
          if (!exp.description.trim())
            entry.description = "Description is required.";
          isValid = false;
        }

        newErrors.experience.push(entry);
      });

      // Validate Projects
      // Validate Projects
      formData.projects.forEach((proj) => {
        const entry = { name: "", technologies: [], link: "" };

        const hasAny =
          proj.name.trim() ||
          proj.link.trim() ||
          proj.technologies.some((tech) => tech.trim());

        const hasAll =
          proj.name.trim() &&
          proj.link.trim() &&
          proj.technologies.every((tech) => tech.trim());

        if (hasAny && !hasAll) {
          if (!proj.name.trim()) entry.name = "Project name is required.";
          if (!proj.link.trim()) entry.link = "Project link is required.";
          entry.technologies = proj.technologies.map((tech) =>
            !tech.trim() ? "Technology is required." : ""
          );
          isValid = false;
        }

        newErrors.projects.push(entry);
      });

      // Validate Certificates
      formData.certificates.forEach((cert) => {
        const entry = { name: "", date: "" };
        const hasAny = cert.name.trim() || cert.date.trim();
        const hasAll = cert.name.trim() && cert.date.trim();

        if (hasAny && !hasAll) {
          if (!cert.name.trim()) entry.name = "Certificate name is required.";
          if (!cert.date.trim()) entry.date = "Certificate date is required.";
          isValid = false;
        }

        newErrors.certificates.push(entry);
      });
    }

    setErrors(newErrors);

    if (isValid) {
      if (activeStep === steps.length - 1) {
        const result = await Swal.fire({
          title: "Ready to generate your resume?",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff ",
          backdrop: `
            #013368
            url("/images/cat-space.gif")
            left top
            no-repeat
          `,
          confirmButtonText: "Yes, generate it!",
          cancelButtonText: "Cancel",
          showCancelButton: true,
        });

        if (result.isConfirmed) {
          setIsGenerating(true);

          const token = Cookies.get("token");
          if (!token) {
            console.log("Token not found");
            setLoading(false);
            toast.error("Please login again.");
            router.push("/auth/login");
            return;
          }

          console.log(formData);
          const cleanedData = {
            ...formData,
            experience: formData.experience.filter(
              (exp) =>
                exp.title.trim() || exp.company.trim() || exp.description.trim()
            ),
            projects: formData.projects.filter(
              (proj) =>
                proj.name.trim() ||
                proj.technologies.some((tech) => tech.trim())
            ),
            certificates: formData.certificates.filter(
              (cert) => cert.name.trim() || cert.date.trim()
            ),
          };

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`,
              cleanedData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log(response);
            // const { downloadUrl } = response.data;
            // router.push(`/cv-download?url=${encodeURIComponent(downloadUrl)}`);

            const downloadUrl = response?.data?.data?.downloadUrl;
            // router.push(`/cv-download?url=${encodeURIComponent(downloadUrl)}`);
            // ⚠️ Don't double encode — use downloadUrl as is
            console.log("Download URL:", downloadUrl);
            // store in cookie
            Cookies.set("downloadUrl", downloadUrl, { expires: 1 });
            router.push(`/cv-creation/cv-download`);
          } catch (error) {
            console.log("Error generating CV:", error);
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text:
                error.response.data.message ||
                "Something went wrong while generating your resume.",
            });
            setIsGenerating(false);
          }
        }
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (section, index, key, value) => {
    if (Array.isArray(formData[section])) {
      const updated = [...formData[section]];
      updated[index][key] = value;
      setFormData((prev) => ({ ...prev, [section]: updated }));
    } else if (typeof formData[section] === "object") {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [section]: value }));
    }
  };

  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, { language: "", proficiency: "" }],
    }));
  };

  const handleRemoveLanguage = (index) => {
    const updated = [...formData.languages];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, languages: updated }));
  };

  if (isGenerating) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f1f5f9]">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/design.png')" }}
    >
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-[oklch(0.293_0.136_325.661)]">
            Build Your Professional CV
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Fill in your details step by step to generate a polished and
            professional resume.
          </p>
        </div>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "1.125rem",
                    fontWeight: 200,
                    color: "#374151",
                  },
                  "& .MuiStepIcon-root": {
                    fontSize: "2.5rem",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 5 }}>
          {activeStep === 0 && (
            <div className="grid grid-cols-1 gap-6 bg-white/90 rounded-2xl pt-12 pb-12 px-10 shadow-xl backdrop-blur-md">
              {isImageInputEnabled && (
                <>
                  <div className="flex justify-center items-center">
                    <div className="relative flex items-center flex-col gap-2">
                      {/* Profile Image Preview */}
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-300 shadow-sm relative group cursor-pointer">
                        {/* Hidden File Input */}
                        <input
                          id="profileImageUpload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData((prev) => ({
                                  ...prev,
                                  imageUrl: reader.result,
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />

                        {/* Label wraps the image */}
                        <label
                          htmlFor="profileImageUpload"
                          className="absolute inset-0 flex items-center justify-center"
                          title="Click to change photo"
                        >
                          <img
                            src={formData?.imageUrl || "/images/profile.jpg"}
                            alt="Profile Preview"
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition-transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-gray-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 010 2.828L9.414 13.414l-4.95 1.414a1 1 0 01-1.212-1.212l1.414-4.95L14.586 2.586a2 2 0 012.828 0zM15 4l1 1-9 9-1.5.5.5-1.5 9-9z" />
                            </svg>
                          </div>
                        </label>
                      </div>

                      <span className="text-sm text-gray-500">
                        Click icon to update photo
                      </span>

                      {errors.imageUrl && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                          {errors.imageUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="mt-6 flex flex-col items-start">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                      Select Template Color
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) =>
                          handleChange("color", null, null, e.target.value)
                        }
                        className="h-12 w-24 rounded-xl border border-gray-300 cursor-pointer bg-white"
                      />
                      <span className="text-sm text-gray-600">
                        {formData.color}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                  value={formData.name}
                  required
                  maxLength={20}
                  onChange={(e) =>
                    handleChange("name", null, null, e.target.value)
                  }
                />
                {errors.name && (
                  <p className="text-sm text-red-500 ">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="A motivated developer with a passion for building scalable applications..."
                  className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm resize-none h-28"
                  value={formData.summary}
                  required
                  maxLength={400}
                  onChange={(e) =>
                    handleChange("summary", null, null, e.target.value)
                  }
                />
                <p className="text-sm text-gray-500 ">
                  {formData.summary.length} / 400 characters
                </p>
                {errors.summary && (
                  <p className="text-sm text-red-500 ">{errors.summary}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Email", key: "email" },
                  { label: "Phone", key: "phone" },
                  { label: "Location", key: "location" },
                  { label: "LinkedIn", key: "linkedin" },
                  { label: "GitHub", key: "github" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                      {field.label}
                      {["email", "phone", "location"].includes(field.key) && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    <input
                      type="text"
                      placeholder={field.label}
                      className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                      maxLength={100}
                      value={formData.contact[field.key]}
                      onChange={(e) =>
                        handleChange("contact", null, field.key, e.target.value)
                      }
                    />

                    {/* Show error below the input */}
                    {["email", "phone", "location"].includes(field.key) &&
                      errors.contact[field.key] && (
                        <p className="text-sm text-red-500 ">
                          {errors.contact[field.key]}
                        </p>
                      )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Interest
                </label>
                <input
                  type="text"
                  placeholder="e.g. Football, Reading"
                  className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                  value={formData.interests[0]}
                  onChange={(e) => {
                    const updated = [...formData.interests];
                    updated[0] = e.target.value;
                    setFormData((prev) => ({ ...prev, interests: updated }));
                  }}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Languages <span className="text-red-500">*</span>
                </label>
                {formData.languages.map((lang, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    {/* Language Input */}

                    <div className="col-span-1">
                      <input
                        type="text"
                        placeholder="e.g. English"
                        className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                        value={lang.language}
                        maxLength={12}
                        onChange={(e) =>
                          handleChange(
                            "languages",
                            index,
                            "language",
                            e.target.value
                          )
                        }
                      />
                      {errors.languages[index]?.language && (
                        <p className="text-sm text-red-500 ">
                          {errors.languages[index].language}
                        </p>
                      )}
                    </div>

                    {/* Proficiency Dropdown */}
                    <div className="col-span-1">
                      <select
                        className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm text-gray-700"
                        value={lang.proficiency}
                        onChange={(e) =>
                          handleChange(
                            "languages",
                            index,
                            "proficiency",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select proficiency</option>
                        <option value="Professional">Professional</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                      </select>
                      {errors.languages[index]?.proficiency && (
                        <p className="text-sm text-red-500 ">
                          {errors.languages[index].proficiency}
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-2 flex justify-end">
                      {formData.languages.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm mr-4"
                          onClick={() => handleRemoveLanguage(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="grid grid-cols-1 gap-6 bg-white/90 rounded-2xl pt-12 pb-12 px-10 shadow-xl backdrop-blur-md">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Education <span className="text-red-500">*</span>
                </label>

                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Degree"
                      className="p-2 rounded-xl border border-gray-300 shadow-sm bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={edu.degree}
                      maxLength={30}
                      onChange={(e) =>
                        handleChange(
                          "education",
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                    />
                    {errors.education[index]?.degree && (
                      <p className="text-sm text-red-500">
                        {errors.education[index].degree}
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Institution"
                      className="p-2 rounded-xl border border-gray-300 shadow-sm bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={edu.institution}
                      maxLength={30}
                      onChange={(e) =>
                        handleChange(
                          "education",
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                    {errors.education[index]?.institution && (
                      <p className="text-sm text-red-500">
                        {errors.education[index].institution}
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="CGPA"
                      className="p-2 rounded-xl border border-gray-300 shadow-sm bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={edu.cgpa}
                      maxLength={12}
                      onChange={(e) =>
                        handleChange("education", index, "cgpa", e.target.value)
                      }
                    />
                    {errors.education[index]?.cgpa && (
                      <p className="text-sm text-red-500">
                        {errors.education[index].cgpa}
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Year (e.g. 2019 - 2023)"
                      className="p-2 rounded-xl border border-gray-300 shadow-sm bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={edu.year}
                      maxLength={11}
                      onChange={(e) =>
                        handleChange("education", index, "year", e.target.value)
                      }
                    />
                    {errors.education[index]?.year && (
                      <p className="text-sm text-red-500">
                        {errors.education[index].year}
                      </p>
                    )}
                    <div className="col-span-2 flex justify-end">
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => {
                            const updated = [...formData.education];
                            updated.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              education: updated,
                            }));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-blue-600 text-sm mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      education: [
                        ...prev.education,
                        { degree: "", institution: "", cgpa: "", year: "" },
                      ],
                    }))
                  }
                >
                  + Add another education entry
                </button>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Skills <span className="text-red-500">*</span>
                </label>

                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. React"
                      className="w-full p-2 rounded-xl border border-gray-300 shadow-sm bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={skill}
                      maxLength={15}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[index] = e.target.value;
                        setFormData((prev) => ({ ...prev, skills: updated }));
                      }}
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-500 ">{errors.skills}</p>
                    )}
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        className="text-red-500 text-sm"
                        onClick={() => {
                          const updated = [...formData.skills];
                          updated.splice(index, 1);
                          setFormData((prev) => ({ ...prev, skills: updated }));
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="text-blue-600 text-sm mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: [...prev.skills, ""],
                    }))
                  }
                >
                  + Add skill
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 gap-6 bg-white/90 rounded-2xl pt-12 pb-12 px-10 shadow-xl backdrop-blur-md">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Experience
                </label>

                {formData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 mb-4  p-4 rounded-xl"
                  >
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="p-2 rounded-xl border border-gray-300 bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200  "
                      value={exp.title}
                      maxLength={20}
                      onChange={(e) =>
                        handleChange(
                          "experience",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    {errors.experience?.[index]?.title && (
                      <p className="text-sm text-red-500 ">
                        {errors.experience[index].title}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Company"
                      className="p-2 rounded-xl border border-gray-300 bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={exp.company}
                      maxLength={30}
                      onChange={(e) =>
                        handleChange(
                          "experience",
                          index,
                          "company",
                          e.target.value
                        )
                      }
                    />
                    {errors.experience?.[index]?.company && (
                      <p className="text-sm text-red-500">
                        {errors.experience[index].company}
                      </p>
                    )}

                    <textarea
                      placeholder="Description / Responsibilities"
                      className="p-2 rounded-xl border border-gray-300  resize-none bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200 "
                      value={exp.description}
                      maxLength={60}
                      onChange={(e) =>
                        handleChange(
                          "experience",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    {errors.experience?.[index]?.description && (
                      <p className="text-sm text-red-500">
                        {errors.experience[index].description}
                      </p>
                    )}

                    <div className="flex justify-end">
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => {
                            const updated = [...formData.experience];
                            updated.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              experience: updated,
                            }));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-blue-600 text-sm mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: [
                        ...prev.experience,
                        { title: "", company: "", description: "" },
                      ],
                    }))
                  }
                >
                  + Add experience
                </button>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Projects
                </label>

                {formData.projects.map((proj, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 mb-6 p-4  bg-white "
                  >
                    <input
                      type="text"
                      placeholder="Project Name"
                      className="p-2 rounded-xl border border-gray-300  bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200"
                      value={proj.name}
                      onChange={(e) =>
                        handleChange("projects", index, "name", e.target.value)
                      }
                    />
                    {errors.projects?.[index]?.name && (
                      <p className="text-sm text-red-500 ">
                        {errors.projects[index].name}
                      </p>
                    )}

                    {/* Technologies - Multiple inputs */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Technologies Used
                      </label>
                      {proj.technologies?.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            placeholder={`Technology ${techIndex + 1}`}
                            className="p-2 rounded-xl border border-gray-300 w-full  bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200"
                            value={tech}
                            onChange={(e) => {
                              const updatedProjects = [...formData.projects];
                              updatedProjects[index].technologies[techIndex] =
                                e.target.value;
                              setFormData({
                                ...formData,
                                projects: updatedProjects,
                              });
                            }}
                          />
                          {errors.projects?.[index]?.technologies?.[
                            techIndex
                          ] && (
                            <p className="text-sm text-red-500 ">
                              {errors.projects[index].technologies[techIndex]}
                            </p>
                          )}
                          {proj.technologies.length > 1 && (
                            <button
                              type="button"
                              className="text-red-500 text-sm"
                              onClick={() => {
                                const updatedProjects = [...formData.projects];
                                updatedProjects[index].technologies.splice(
                                  techIndex,
                                  1
                                );
                                setFormData({
                                  ...formData,
                                  projects: updatedProjects,
                                });
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-blue-600 text-sm "
                        onClick={() => {
                          const updatedProjects = [...formData.projects];
                          updatedProjects[index].technologies.push("");
                          setFormData({
                            ...formData,
                            projects: updatedProjects,
                          });
                        }}
                      >
                        + Add Technology
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Project Link (Optional)"
                      className="p-2 rounded-xl border border-gray-300  bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:ring-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-1 transition-all duration-200"
                      value={proj.link}
                      onChange={(e) =>
                        handleChange("projects", index, "link", e.target.value)
                      }
                    />
                    {errors.projects?.[index]?.link && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.projects[index].link}
                      </p>
                    )}

                    <div className="flex justify-end">
                      {formData.projects.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => {
                            const updated = [...formData.projects];
                            updated.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              projects: updated,
                            }));
                          }}
                        >
                          Remove Project
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-blue-600 text-sm mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      projects: [
                        ...prev.projects,
                        { name: "", technologies: [""], link: "" },
                      ],
                    }))
                  }
                >
                  + Add Project
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide uppercase">
                  Certificates
                </label>

                {formData.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4"
                  >
                    <input
                      type="text"
                      placeholder="Certificate Title (e.g. Full Stack Web Dev - Coursera)"
                      className="p-2 rounded-xl border border-gray-300 bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:ring-[oklch(0.74_0.238_322.16)] transition-all duration-200"
                      value={cert.name}
                      maxLength={100}
                      onChange={(e) =>
                        handleChange(
                          "certificates",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />

                    {errors.certificates?.[index]?.name && (
                      <p className="text-sm text-red-500 ">
                        {errors.certificates[index].name}
                      </p>
                    )}
                    <input
                      type="month"
                      className="p-2 rounded-xl border border-gray-300 bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:ring-[oklch(0.74_0.238_322.16)] transition-all duration-200"
                      value={cert.date}
                      onChange={(e) =>
                        handleChange(
                          "certificates",
                          index,
                          "date",
                          e.target.value
                        )
                      }
                    />

                    {errors.certificates?.[index]?.date && (
                      <p className="text-sm text-red-500 ">
                        {errors.certificates[index].date}
                      </p>
                    )}
                    <div className="col-span-2 flex justify-end">
                      {formData.certificates.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => {
                            const updated = [...formData.certificates];
                            updated.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              certificates: updated,
                            }));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-blue-600 text-sm mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      certificates: [
                        ...prev.certificates,
                        { name: "", date: "" },
                      ],
                    }))
                  }
                >
                  + Add certificate
                </button>
              </div>
            </div>
          )}

          <Box mt={6} className="flex justify-between pb-16">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              className="bg-[oklch(0.293_0.136_325.661)] hover:bg-[oklch(0.293_0.136_325.661)]"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Page;
