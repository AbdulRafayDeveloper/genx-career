"use client";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const Page = () => {
  const [results, setResults] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("cvResults");
    if (data) {
      setResults(JSON.parse(data));
    }
  }, []);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  const formatText = (text) => {
    const lines = text.split("\n");
    let firstHeading = true; // To track the first heading

    return lines.map((line, index) => {
      if (line.trim().length === 0) {
        return <br key={index} />;
      }

      if (line.endsWith(":")) {
        // Styling for headings
        const headingClass = firstHeading
          ? "font-bold text-purple-900 text-4xl mt-6 border-purple-200 pb-3"
          : "font-bold text-purple-700 text-3xl border-b-2 border-purple-200 pb-2";
        firstHeading = false; // Mark the first heading as processed
        return (
          <h4 key={index} className={headingClass}>
            {line}
          </h4>
        );
      }

      if (/^\d+\./.test(line)) {
        // Styling for numbered points
        return (
          <div
            key={index}
            className="ml-6 my-4 flex items-start gap-2 text-gray-700 text-lg"
          >
            <span className="font-semibold text-purple-700">
              {line.split(".")[0]}.
            </span>
            <p>{line.slice(line.indexOf(".") + 1)}</p>
          </div>
        );
      }

      // Styling for regular text
      return (
        <p
          key={index}
          className="text-gray-700 my-4 pl-4 leading-relaxed text-lg"
        >
          {line}
        </p>
      );
    });
  };

  const extractRatingAndDetails = (text) => {
    const ratingMatch = text.match(/(?:One-word rating|Rating): (.+)/);
    const rating = ratingMatch ? ratingMatch[1].trim() : "Not Available";
    const details = text.replace(ratingMatch ? ratingMatch[0] : "", "").trim();
    return { rating, details };
  };

  const getEmojiForRating = (rating) => {
    const emojiMap = {
      "Not Good": {
        emoji: (
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f972/512.webp"
            alt="Face holding back tears"
            width="100"
            height="100"
          />
        ),
        text: "Not Good",
      },
      Good: {
        emoji: (
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f642/512.webp"
            alt="Smiling face"
            width="100"
            height="100"
          />
        ),
        text: "Good",
      },
      Best: {
        emoji: (
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.webp"
            alt="Star-struck face"
            width="100"
            height="100"
          />
        ),
        text: "Best",
      },
    };
    return emojiMap[rating] || { emoji: <span>❓</span>, text: "Unknown" };
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg/bg.jpg')",
        }}
      ></div>
      <div className="relative z-10 scrollbar-hidden">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />

        {/* Job Listing Section */}
        <div className="flex h-screen w-screen mt-28">
          <div className="flex flex-col lg:flex-row gap-6 px-4 w-full bg-opacity-50 justify-center">
            {/* Left Column (Rating) */}
            <div className="flex-grow max-h-screen overflow-y-auto rounded-lg p-4 shadow  bg-opacity-50 flex flex-col items-center justify-center text-center hidden lg:flex">
              {results && typeof results === "string" ? (
                <>
                  <h2 className="text-5xl font-bold text-purple-200 mb-4">
                    Rating
                  </h2>
                  <div className=" p-4 rounded text-purple-200">
                    {(() => {
                      const { emoji, text } = getEmojiForRating(
                        extractRatingAndDetails(results).rating
                      );
                      return (
                        <>
                          <div className="mb-2">{emoji}</div>
                          <p className="text-lg font-semibold">{text}</p>
                        </>
                      );
                    })()}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading...</p>
                </div>
              )}
            </div>

            {/* Right Column (Details) */}
            <div className="flex-grow lg:w-2/3 max-h-screen overflow-y-auto border rounded-lg p-4 shadow bg-white bg-opacity-80 pr-12 pb-12 scrollbar-hidden pl-12">
              <div className="pb-4 pt-4">
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-purple-500 text-4xl pr-4"
                ></FontAwesomeIcon>
                <span className="text-purple-950 text-4xl font-semibold">
                  CV Matching Results
                </span>
              </div>

              <div className="bg-purple-900 rounded bg-opacity-50 pb-20 pt-16 flex flex-col items-center justify-start relative h-auto">
                {/* Heading */}
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 z-10 text-center px-4">
                  Craft Your Perfect CV in Minutes!
                </h2>

                {/* Button */}
                <button className="bg-purple-500 text-white py-2 px-8 sm:px-10 rounded-full mb-24 z-10 hover:bg-purple-900 hover:text-white text-sm sm:text-base">
                  Generate!
                </button>

                {/* Image */}
                <img
                  src="/images/image.png"
                  alt="CV Image"
                  className="absolute bottom-0 transform -translate-x-1/2 left-1/2 w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 z-0"
                />
              </div>

              {results && typeof results === "string" ? (
                <>
                  <div className=" p-4 rounded text-sm text-gray-800">
                    {formatText(extractRatingAndDetails(results).details)}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
