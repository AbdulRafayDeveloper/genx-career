"use client";
import Link from "next/link";

const Header = () => {
  return (
    <div className="pt-6">
      <nav className="bg-white fixed w-full max-w-[1200px] z-20 top-0 left-1/2 transform -translate-x-1/2 border-b border-gray-200 mt-6 rounded-full shadow-2xl bg-opacity-70">
        <div className="flex items-center justify-center w-full p-4">
          <div className="flex justify-center items-center w-full md:w-auto md:order-1">
            <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex space-x-8 font-medium text-gray-900 md:flex-row">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white bg-[#8b5eb4] rounded md:bg-transparent md:text-[#9866C7] md:p-0"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Cv Creation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Contact us
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/auth/register"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Register
                  </Link>
                  <span className="mx-2 text-gray-500">/</span>
                  <Link
                    href="/auth/login"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
