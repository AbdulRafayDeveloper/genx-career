import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GenX Career – Find Jobs, Match Your CV & Build CVs Instantly",
  description:
    "GenX Career is your all‑in‑one career hub: search thousands of job listings, automatically match your CV to roles, and create stunning CVs in minutes.",
  keywords: [
    "job search",
    "CV matching",
    "CV builder",
    "job matching",
    "career development",
    "applicant tracking",
    "GenX Career platform",
    "professional CV",
    "CV creation"
  ],
  robots: {
    index: true,
    follow: true
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
