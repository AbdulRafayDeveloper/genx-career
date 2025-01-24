"use client";
import App from "./lineGraph";
import Header from "./header";
import { useState } from "react";
import { LuUsers } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BsPercent } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { BsBullseye } from "react-icons/bs";

const RightSide = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount(count + 1);

  return (
    <div className="sm:ml-64 rounded-lg max-w-full lg:max-w-[1200px]">
      <div className="p-2">
        {/* Header */}
        <Header />
        {/* Body */}
        <div className="mt-10 rounded-xl p-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Total Jobs",
                icon: <LuUsers color="purple" size={20} />,
                color: "#E3F5FF",
              },
              {
                label: "Total Users",
                icon: <MdOutlineAccountBalance color="purple" size={20} />,
                color: "#fefae0",
              },
              {
                label: "Total Queries",
                icon: <BiMoneyWithdraw color="purple" size={20} />,
                color: "#d9dcd6",
              },
              {
                label: "Total Cv Matchers",
                icon: <BsPercent color="purple" size={18} />,
                color: "#faedcd",
              },
              {
                label: "Total Cv Creators",
                icon: <RiMoneyPoundCircleLine color="purple" size={20} />,
                color: "#ffe5ec",
              },
              {
                label: "Total Cv Templates",
                icon: <BsBullseye color="purple" size={20} />,
                color: "#d5f2e3",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 border w-full max-w-[350px] md:max-w-full lg:max-w-[400px] border-gray-200 rounded-lg shadow-lg`}
                style={{ backgroundColor: item.color }}
              >
                <div className="flex justify-between" onClick={incrementCount}>
                  <div>
                    <h5 className="mb-2 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {count}
                    </h5>
                    <p className="mb-3 text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                  </div>
                  <div className="p-1 bg-white w-10 h-10 rounded-xl flex justify-center items-center">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Graph */}
        <App />
      </div>
    </div>
  );
};

export default RightSide;
