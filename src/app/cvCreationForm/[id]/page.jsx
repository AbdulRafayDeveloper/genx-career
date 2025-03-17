"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    education: [{ degree: "", institute: "", cgpa: "", year: "" }],
    experience: [{ title: "", company: "", description: "" }],
    skills: [""],
    projects: [{ name: "", technology: "", link: "" }],
    certificates: [{ institute: "", title: "", startDate: "", endDate: "" }],
    languages: [{ language: "", proficiency: "" }],
    interests: [""],
    contact: { email: "", phone: "", location: "", linkedin: "", github: "" },
    imageUrl: "",
    templateName: "",
    color: "",
  });

  const handleChange = (e, section, index, field) => {
    const updatedData = { ...formData };
    if (index !== undefined && field) {
      updatedData[section][index][field] = e.target.value;
    } else if (index !== undefined) {
      updatedData[section][index] = e.target.value;
    } else {
      updatedData[section] = e.target.value;
    }
    setFormData(updatedData);
  };

  const addField = (section) => {
    const defaultFields = {
      education: { degree: "", institute: "", cgpa: "", year: "" },
      experience: { title: "", company: "", description: "" },
    };
    setFormData({
      ...formData,
      [section]: [...formData[section], defaultFields[section]],
    });
  };

  const handleNext = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-6 md:p-10 max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-[#6B21A8]">
            CV Creation Form
          </h1>

          {currentStep === 1 && (
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Summary"
                value={formData.summary}
                onChange={(e) => handleChange(e, "summary")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {formData.education.map((edu, idx) => (
                <div key={idx} className="space-y-3 border p-4 rounded-lg">
                  <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleChange(e, "education", idx, "degree")
                    }
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                  <input
                    placeholder="Institute"
                    value={edu.institute}
                    onChange={(e) =>
                      handleChange(e, "education", idx, "institute")
                    }
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                  <input
                    placeholder="CGPA"
                    value={edu.cgpa}
                    onChange={(e) => handleChange(e, "education", idx, "cgpa")}
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                  <input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleChange(e, "education", idx, "year")}
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("education")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                + Add Education
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="space-y-3 border p-4 rounded-lg">
                  <input
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) =>
                      handleChange(e, "experience", idx, "title")
                    }
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(e, "experience", idx, "company")
                    }
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(e, "experience", idx, "description")
                    }
                    className="w-full p-2 border rounded-lg focus:ring-purple-500"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("experience")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                + Add Experience
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <input
                placeholder="Email"
                value={formData.contact.email}
                onChange={(e) => handleChange(e, "contact", "email")}
                className="w-full p-3 border rounded-lg focus:ring-purple-500"
                required
              />
              <input
                placeholder="Phone"
                value={formData.contact.phone}
                onChange={(e) => handleChange(e, "contact", "phone")}
                className="w-full p-3 border rounded-lg focus:ring-purple-500"
                required
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
