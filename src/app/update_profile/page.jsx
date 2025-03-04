"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProfileUpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com"); // Pre-filled, non-editable
  const [avatar, setAvatar] = useState("/images/photo.jpg"); // Default profile image

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate profile update API call
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been successfully updated.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/design.png')" }}
      ></div>

      <main className="w-full max-w-lg p-8  z-10 relative">
        {/* Avatar Upload */}
        <button
          onClick={() => router.push("/")}
          className="fixed top-4 left-4 p-2 bg-white bg-opacity-80 rounded-full text-purple-600 shadow-md hover:bg-opacity-100 transition z-50"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-8 h-8"
          ></FontAwesomeIcon>
        </button>

        <div className="flex flex-col items-center relative">
          <div className="relative w-32 h-32">
            <img
              src={avatar}
              alt="Profile Avatar"
              className="w-44 h-32 rounded-full object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 cursor-pointer hover:bg-purple-700 transition"
              title="Change Avatar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className=" space-y-2">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm bg-gray-50"
              required
            />
          </div>

          {/* Email Field (non-editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm border border-white text-sm bg-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </main>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-[50vh] translate-y-[40%] lg:translate-y-[30%]"
        >
          <path
            fill="white"
            d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,192C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
