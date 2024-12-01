"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="relative w-full rounded-lg  bg-gray-400 bg-opacity-30 p-20"
      role="contentinfo"
    >
      <div className="w-full px-8 mx-auto max-w-7xl">
        <div className="grid justify-between grid-cols-1 gap-4 md:grid-cols-2">
          <h5 className="mb-6 text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            GenX Career
          </h5>
          <div className="grid justify-between grid-cols-3 gap-4">
            <nav>
              <p className="block mb-1 text-base font-semibold text-slate-800">
                Navigate To
              </p>
              <ul>
                <li>
                  <Link
                    href="#"
                    className="block text-slate-600 py-1 hover:text-slate-500 text-sm"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block text-slate-600 py-1 hover:text-slate-500 text-sm"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block text-slate-600 py-1 hover:text-slate-500 text-sm"
                  >
                    CV Creation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block text-slate-600 py-1 hover:text-slate-500 text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-slate-200 md:flex-row md:justify-between">
          <p className="block mb-4 text-sm text-center text-slate-500 md:mb-0">
            Copyright © 2024
            <Link href="https://material-tailwind.com/">Material Tailwind</Link>
            . All Rights Reserved.
          </p>
          <div className="flex gap-4 text-slate-600 sm:justify-center">
            <Link
              href="#"
              className="block transition-opacity text-inherit hover:opacity-80"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              className="block transition-opacity text-inherit hover:opacity-80"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.682 0 2.938-.011 4.041-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857-.182-.467-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              className="block transition-opacity text-inherit hover:opacity-80"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2c2.643 0 2.988.01 4.043.06 1.056.049 1.791.218 2.427.465a4.91 4.91 0 011.772 1.153A4.91 4.91 0 0120 5.47c.247.636.416 1.363.465 2.427.048 1.055.06 1.4.06 4.043v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.91 4.91 0 01-1.153 1.772 4.91 4.91 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.055.048-1.4.06-4.043.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.91 4.91 0 01-1.772-1.153 4.91 4.91 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.023-.06-1.387-.06-4.043v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.91 4.91 0 011.153-1.772A4.91 4.91 0 015.47 4.19c.636-.247 1.363-.416 2.427-.465C9.012 2.01 9.357 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
