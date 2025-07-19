export const dynamic = 'force-dynamic';
import React from "react";
import { getSeoData } from "../lib/getSeoData.js";

export async function generateMetadata() {
    const data = await getSeoData("About");

    if (data?.status === 200) {
        const seo = data.data;
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords.join(", "),
            robots: seo.index ? "index, follow" : "noindex, nofollow",
            alternates: {
                canonical: "/about",
            },
        };
    }

    return {
        title: "About Page",
        description: "About",
        keywords: "About",
        robots: "index, follow",
        alternates: {
            canonical: "/about",
        },
    };
}

const AboutLayout = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default AboutLayout;
