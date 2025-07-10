"use client";

import React, { useState, use, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const steps = ["Personal Info", "Education", "Experience & Skills"];

const Page = () => {
  // const resolvedParams = use(params);
  const router = useRouter();
  // const id = resolvedParams?.id;
  const { name } = useParams();
  console.log("Name :", name);
  const [isGenerating, setIsGenerating] = useState(false);

  const isImageInputEnabled = name === "template1" || name === "template3";
  const isColorEnabled = false;
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
    const token = Cookies.get("genx_access_token");
    if (!token) {
      toast.error(
        "You are not logged in. Please login first to create your CV.",
        {
          position: "top-right",
          autoClose: 5000, // 5 seconds so user can read
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 5500); // Wait slightly longer than toast so they can read
    }
  }, []);

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
        linkedin: "",
        github: "",
      },
      interests: "",
      languages: [],
      education: [],
      skills: "",
      experience: [],
      projects: [],
      certificates: [],
    };

    let isValid = true;

    // Step 0: Personal Info
    if (activeStep === 0) {
      // Name validations
      if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
        isValid = false;
      } else if (formData.name.length > 30) {
        newErrors.name = "Name must be less than 30 characters.";
        isValid = false;
      }

      if (name === "template1" || name === "template3") {
        if (
          !formData.imageUrl ||
          formData.imageUrl.trim() === "" ||
          formData.imageUrl === "N/A"
        ) {
          newErrors.imageUrl = "Please upload a valid image.";
          isValid = false;
        }
      }

      // Summary validations
      if (!formData.summary.trim()) {
        newErrors.summary = "Summary is required.";
        isValid = false;
      } else if (formData.summary.length < 30) {
        newErrors.summary = "Summary must be at least 30 characters.";
        isValid = false;
      } else if (formData.summary.length > 400) {
        newErrors.summary = "Summary must be less than 400 characters.";
        isValid = false;
      }

      // Contact validations
      if (!formData.contact.phone || !formData.contact.phone.trim()) {
        newErrors.contact.phone = "Phone number is required.";
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.contact.email.trim()) {
        newErrors.contact.email = "Email is required.";
        isValid = false;
      } else if (!emailRegex.test(formData.contact.email)) {
        newErrors.contact.email = "Enter a valid email address.";
        isValid = false;
      }

      // Location validation
      if (!formData.contact.location.trim()) {
        newErrors.contact.location = "Location is required.";
        isValid = false;
      } else if (formData.contact.location.length < 3) {
        newErrors.contact.location = "Location must be at least 3 characters.";
        isValid = false;
      } else if (formData.contact.location.length > 35) {
        newErrors.contact.location =
          "Location must be less than 35 characters.";
        isValid = false;
      }

      // LinkedIn validation
      const urlRegex = /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i;
      if (
        formData.contact.linkedin &&
        !urlRegex.test(formData.contact.linkedin)
      ) {
        newErrors.contact.linkedin = "Enter a valid LinkedIn URL.";
        isValid = false;
      } else if (formData.contact.linkedin.length > 150) {
        newErrors.contact.linkedin =
          "LinkedIn URL must be less than 150 characters.";
        isValid = false;
      }

      // GitHub validation
      if (
        formData.contact.github &&
        !/^https?:\/\/(www\.)?github\.com\/.+/.test(formData.contact.github)
      ) {
        newErrors.contact.github = "Enter a valid GitHub URL.";
        isValid = false;
      } else if (formData.contact.github.length > 150) {
        newErrors.contact.github =
          "GitHub URL must be less than 150 characters.";
        isValid = false;
      }

      // Interest max length
      // if (formData.interests[0].length > 100) {
      //   newErrors.interests = "Interest should be less than 100 characters.";
      //   isValid = false;
      // }

      if (!formData.interests[0] || !formData.interests[0].trim()) {
        newErrors.interests = "Interest is required.";
        isValid = false;
      } else {
        const interestsArr = formData.interests[0]
          .split(",")
          .map((int) => int.trim())
          .filter((int) => int.length > 0); // Remove empty

        // Check max number of interests
        if (interestsArr.length > 10) {
          newErrors.interests = "You can enter up to 10 interests only.";
          isValid = false;
        }

        // Check each interest length
        for (const interest of interestsArr) {
          if (interest.length > 15) {
            newErrors.interests =
              "Each interest should be at most 15 characters.";
            isValid = false;
            break;
          }
        }
      }

      // Language validations
      newErrors.languages = formData.languages.map((lang) => {
        const entry = { language: "", proficiency: "" };
        if (!lang.language.trim()) {
          entry.language = "Language is required.";
          isValid = false;
        } else if (lang.language.length < 2 || lang.language.length > 20) {
          entry.language = "Language must be between 2 and 20 characters.";
          isValid = false;
        }

        if (!lang.proficiency.trim()) {
          entry.proficiency = "Proficiency is required.";
          isValid = false;
        }
        return entry;
      });

      if (formData.languages.length > 7) {
        newErrors.languagesGlobal = "You can add a maximum of 7 languages only.";
        isValid = false;
      }
    }

    // Step 1: Education & Skills
    if (activeStep === 1) {
      newErrors.education = formData.education.map((edu) => {
        const entry = { degree: "", institution: "", cgpa: "", year: "" };

        // Degree validation
        if (!edu.degree.trim()) {
          entry.degree = "Degree is required.";
          isValid = false;
        } else if (edu.degree.length < 2) {
          entry.degree = "Degree must be at least 2 characters.";
          isValid = false;
        } else if (edu.degree.length > 100) {
          entry.degree = "Degree must be less than 100 characters.";
          isValid = false;
        }

        // Institution validation
        if (!edu.institution.trim()) {
          entry.institution = "Institution is required.";
          isValid = false;
        } else if (edu.institution.length < 2) {
          entry.institution = "Institution must be at least 2 characters.";
          isValid = false;
        } else if (edu.institution.length > 100) {
          entry.institution = "Institution must be less than 100 characters.";
          isValid = false;
        }

        // CGPA validation
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

        // Year validation
        if (!edu.year.trim()) {
          entry.year = "Year is required.";
          isValid = false;
        } else if (!/^\d{4}-\d{4}$/.test(edu.year)) {
          entry.year = "Year format should be like 2021-2025";
          isValid = false;
        }

        return entry;
      });

      // Skills validation
      if (formData.skills.length > 12) {
        newErrors.skillsGlobal = "You can add a maximum of 12 skills only.";
        isValid = false;
      }

      newErrors.skills = formData.skills.map((skill) => {
        if (!skill.trim()) {
          isValid = false;
          return "Skill is required.";
        }
        return "";
      });
    }

    // Add this inside your handleNext function under step 2 validation:
    if (activeStep === 2) {
      newErrors.experience = [];
      newErrors.projects = [];
      newErrors.certificates = [];

      // ✅ Experience Validation (optional but all fields required if one is filled)
      formData.experience.forEach((exp) => {
        const entry = { title: "", company: "", description: "" };
        const hasAny =
          exp.title.trim() || exp.company.trim() || exp.description.trim();

        if (hasAny) {
          if (!exp.title.trim()) {
            entry.title = "Job title is required.";
            isValid = false;
          } else if (exp.title.length < 2 || exp.title.length > 30) {
            entry.title = "Job title must be 2–30 characters.";
            isValid = false;
          }

          if (!exp.company.trim()) {
            entry.company = "Company name is required.";
            isValid = false;
          } else if (exp.company.length < 2 || exp.company.length > 50) {
            entry.company = "Company must be 2–50 characters.";
            isValid = false;
          }

          if (!exp.description.trim()) {
            entry.description = "Description is required.";
            isValid = false;
          } else if (
            exp.description.length < 10 ||
            exp.description.length > 400
          ) {
            entry.description = "Description must be 10–400 characters.";
            isValid = false;
          }
        }

        newErrors.experience.push(entry);
      });

      // ✅ Projects Validation (optional, but if any field filled, all required)
      formData.projects.forEach((proj) => {
        const entry = { name: "", technologies: [], link: "" };
        const hasAny =
          proj.name.trim() || proj.technologies.some((tech) => tech.trim());

        if (hasAny) {
          // Validate name
          if (!proj.name.trim()) {
            entry.name = "Project name is required.";
            isValid = false;
          } else if (proj.name.length < 2 || proj.name.length > 30) {
            entry.name = "Project name must be 2–30 characters.";
            isValid = false;
          }

          entry.technologies = proj.technologies.map((tech) => {
            if (!tech.trim()) {
              isValid = false;
              return "Technology is required.";
            } else if (tech.length < 2 || tech.length > 30) {
              isValid = false;
              return "Technology must be between 2 and 30 characters.";
            }
            return "";
          });
        }

        // ✅ Always optional, but validate format if user enters link
        if (proj.link.trim()) {
          const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
          if (!urlRegex.test(proj.link.trim())) {
            entry.link = "Enter a valid project URL.";
            isValid = false;
          }
        }

        newErrors.projects.push(entry);
      });

      formData.certificates.forEach((cert) => {
        const entry = { name: "", date: "" };
        const hasAny = cert.name.trim() || cert.date.trim();

        if (hasAny) {
          // Name required
          if (!cert.name.trim()) {
            entry.name = "Certificate name is required.";
            isValid = false;
          } else if (cert.name.length < 2 || cert.name.length > 40) {
            entry.name = "Certificate name must be between 2 and 40 characters.";
            isValid = false;
          }

          // Date required
          if (!cert.date.trim()) {
            entry.date = "Certificate date is required.";
            isValid = false;
          }
        }

        newErrors.certificates.push(entry);
      });

      if (formData.experience.length > 5) {
        newErrors.experienceGlobal = "You can add a maximum of 5 experiences only.";
        isValid = false;
      }

      if (formData.projects.length > 7) {
        newErrors.projectsGlobal = "You can add a maximum of 7 projects only.";
        isValid = false;
      }

      if (formData.certificates.length > 7) {
        newErrors.certificatesGlobal = "You can add a maximum of 7 certificates only.";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      if (activeStep === steps.length - 1) {
        const result = await Swal.fire({
          title: "Ready to generate your CV?",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff ",
          backdrop: `
            #013368
            url("/bg/benefits.jpg")
            cover
            no-repeat
          `,
          confirmButtonText: "Yes, generate it!",
          cancelButtonText: "Cancel",
          showCancelButton: true,
        });

        if (result.isConfirmed) {
          setIsGenerating(true);

          const token = Cookies.get("genx_access_token");
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

          // Remove imageUrl when template2
          if (!(name === "template1" || name === "template3")) {
            delete cleanedData.imageUrl;
          }

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
                error?.response?.data?.message ||
                "Something went wrong while generating your CV.",
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

  return (
    <>
      {/* Back button */}
      <ToastContainer position="top-center" />
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-3 bg-opacity-80 rounded-[300px] text-purple-600 font-semibold hover:underline z-50"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-8 h-8" />
      </button>

      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
          <p className="mt-4 text-violet-800 text-lg font-medium">Your CV is being generated...</p>
        </div>
      )}
      <div
        className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg/bg.jpg')" }}
      >
        <div className="max-w-4xl mx-auto pt-12">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-white">
              Build Your Professional CV
            </h1>
            <p className="text-gray-50 mt-2 text-lg">
              Fill in your details step by step to generate a polished and
              professional CV.
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
                      color: "#ffff",
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
                              src={
                                formData?.imageUrl &&
                                  formData.imageUrl !== "N/A"
                                  ? formData.imageUrl
                                  : "/images/profile.jpg"
                              }
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
                    {isColorEnabled && (
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
                    )}

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

                      {field.key === "phone" ? (
                        <PhoneInput
                          country={"us"}
                          value={formData.contact.phone}
                          onChange={(rawPhone) =>
                            handleChange("contact", null, "phone", rawPhone)
                          }
                          onBlur={(e) =>
                            handleChange(
                              "contact",
                              null,
                              "phone",
                              e.target.value
                            )
                          }
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          containerClass="w-full"
                          inputClass="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={field.label}
                          className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                          maxLength={field.key === "location" ? 35 : 100}
                          value={formData.contact[field.key]}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              null,
                              field.key,
                              e.target.value
                            )
                          }
                        />
                      )}

                      {/* Show error below the input */}
                      {[
                        "email",
                        "phone",
                        "location",
                        "github",
                        "linkedin",
                      ].includes(field.key) &&
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
                    Interest<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Football, Reading (max 10 items, each max 15 chars)"
                    className="w-full p-2 rounded-xl bg-white border border-gray-300 focus:border-[oklch(0.74_0.238_322.16)] focus:outline-none focus:ring-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                    value={formData.interests[0]}
                    onChange={(e) => {
                      const updated = [...formData.interests];
                      updated[0] = e.target.value;
                      setFormData((prev) => ({ ...prev, interests: updated }));
                    }}
                  />
                  {errors.interests && (
                    <p className="text-sm text-red-500 ">{errors.interests}</p>
                  )}
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
                          <p className="text-sm text-red-500">
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
                          <p className="text-sm text-red-500">
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

                  <button
                    type="button"
                    className={`text-blue-600 text-sm mt-2 ${formData.languages.length >= 7 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={handleAddLanguage}
                    disabled={formData.languages.length >= 7}
                  >
                    + Add Language
                  </button>

                  {errors.languagesGlobal && (
                    <p className="text-sm text-red-500 mt-1">{errors.languagesGlobal}</p>
                  )}
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
                    <div key={index} className="flex flex-col gap-3 mb-6">
                      <div>
                        <input
                          type="text"
                          placeholder="Degree"
                          className="w-full p-2 rounded-xl border border-gray-300 shadow-sm bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:outline-none transition-all duration-200"
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
                          <p className="text-sm text-red-500 mt-1">
                            {errors.education[index].degree}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Institution"
                          className="w-full p-2 rounded-xl border border-gray-300 shadow-sm bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:outline-none transition-all duration-200"
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
                          <p className="text-sm text-red-500 mt-1">
                            {errors.education[index].institution}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="CGPA"
                          className="w-full p-2 rounded-xl border border-gray-300 shadow-sm bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:outline-none transition-all duration-200"
                          value={edu.cgpa}
                          maxLength={12}
                          onChange={(e) =>
                            handleChange(
                              "education",
                              index,
                              "cgpa",
                              e.target.value
                            )
                          }
                        />
                        {errors.education[index]?.cgpa && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.education[index].cgpa}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Year (e.g. 2019 - 2023)"
                          className="w-full p-2 rounded-xl border border-gray-300 shadow-sm bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:outline-none transition-all duration-200"
                          value={edu.year}
                          maxLength={11}
                          onChange={(e) =>
                            handleChange(
                              "education",
                              index,
                              "year",
                              e.target.value
                            )
                          }
                        />
                        {errors.education[index]?.year && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.education[index].year}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end">
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
                      {errors.skills && errors.skills[index] && (
                        <p className="text-sm text-red-500">{errors.skills[index]}</p>
                      )}

                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => {
                            const updated = [...formData.skills];
                            updated.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              skills: updated,
                            }));
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className={`text-blue-600 text-sm mt-2 ${formData.skills.length >= 12 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        skills: [...prev.skills, ""],
                      }))
                    }
                    disabled={formData.skills.length >= 12}
                  >
                    + Add skill
                  </button>

                  {errors.skillsGlobal && (
                    <p className="text-sm text-red-500 mt-1">{errors.skillsGlobal}</p>
                  )}

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
                        className={`p-2 rounded-xl border ${errors.experience?.[index]?.title
                          ? "border-red-500"
                          : "border-gray-300"
                          } bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                        value={exp.title}
                        maxLength={30}
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
                        <p className="text-sm text-red-500">
                          {errors.experience[index].title}
                        </p>
                      )}

                      <input
                        type="text"
                        placeholder="Company"
                        className={`p-2 rounded-xl border ${errors.experience?.[index]?.company
                          ? "border-red-500"
                          : "border-gray-300"
                          } bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                        value={exp.company}
                        maxLength={50}
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
                        className={`p-2 rounded-xl border ${errors.experience?.[index]?.description
                          ? "border-red-500"
                          : "border-gray-300"
                          } resize-none bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                        value={exp.description}
                        maxLength={400}
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
                    className={`text-blue-600 text-sm mt-2 ${formData.experience.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        experience: [
                          ...prev.experience,
                          { title: "", company: "", description: "" },
                        ],
                      }))
                    }
                    disabled={formData.experience.length >= 5}
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
                        maxLength={30}
                        className={`p-2 rounded-xl border ${errors.projects?.[index]?.name
                          ? "border-red-500"
                          : "border-gray-300"
                          } bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                        value={proj.name}
                        onChange={(e) =>
                          handleChange("projects", index, "name", e.target.value)
                        }
                      />
                      {errors.projects?.[index]?.name && (
                        <p className="text-sm text-red-500">
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
                              maxLength={30}
                              className={`p-2 rounded-xl border ${errors.projects?.[index]?.technologies?.[
                                techIndex
                              ]
                                ? "border-red-500"
                                : "border-gray-300"
                                } w-full bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                              value={tech}
                              onChange={(e) => {
                                const updatedProjects = [...formData.projects];
                                updatedProjects[index].technologies[techIndex] = e.target.value;
                                setFormData({
                                  ...formData,
                                  projects: updatedProjects,
                                });
                              }}
                            />
                            {errors.projects?.[index]?.technologies?.[
                              techIndex
                            ] && (
                                <p className="text-sm text-red-500">
                                  {errors.projects[index].technologies[techIndex]}
                                </p>
                              )}

                            {proj.technologies.length > 1 && (
                              <button
                                type="button"
                                className="text-red-500 text-sm"
                                onClick={() => {
                                  const updatedProjects = [
                                    ...formData.projects,
                                  ];
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
                        className={`p-2 rounded-xl border ${errors.projects?.[index]?.link
                          ? "border-red-500"
                          : "border-gray-300"
                          } bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 transition-all duration-200`}
                        value={proj.link}
                        onChange={(e) =>
                          handleChange(
                            "projects",
                            index,
                            "link",
                            e.target.value
                          )
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
                    className={`text-blue-600 text-sm mt-2 ${formData.projects.length >= 7 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        projects: [
                          ...prev.projects,
                          { name: "", technologies: [""], link: "" },
                        ],
                      }))
                    }
                    disabled={formData.projects.length >= 7}
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
                      {/* Name field + error wrapper */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          placeholder="Certificate Title (max 40 chars)"
                          className="p-2 rounded-xl border border-gray-300 bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:ring-[oklch(0.74_0.238_322.16)] transition-all duration-200"
                          value={cert.name}
                          maxLength={40}
                          onChange={(e) =>
                            handleChange("certificates", index, "name", e.target.value)
                          }
                        />
                        {errors.certificates?.[index]?.name && (
                          <p className="text-sm text-red-500">
                            {errors.certificates[index].name}
                          </p>
                        )}
                      </div>

                      {/* Date field + error wrapper */}
                      <div className="flex flex-col">
                        <input
                          type="month"
                          className="p-2 rounded-xl border border-gray-300 bg-white focus:border-[oklch(0.74_0.238_322.16)] focus:ring-1 focus:ring-[oklch(0.74_0.238_322.16)] transition-all duration-200"
                          value={cert.date}
                          onChange={(e) =>
                            handleChange("certificates", index, "date", e.target.value)
                          }
                        />
                        {errors.certificates?.[index]?.date && (
                          <p className="text-sm text-red-500">
                            {errors.certificates[index].date}
                          </p>
                        )}
                      </div>

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
                    className={`text-blue-600 text-sm mt-2 ${formData.certificates.length >= 7 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        certificates: [...prev.certificates, { name: "", date: "" }],
                      }))
                    }
                    disabled={formData.certificates.length >= 7}
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
    </>
  );
};

export default Page;
