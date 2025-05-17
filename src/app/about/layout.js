import React from "react";
import axios from "axios";

export async function generateMetadata() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/seo-page?pageName=About`
        );
        const data = res.data;
        console.log("Data for Seo:", data);
        if (data.status === 200) {
            const seo = data.data;
            console.log("Fetched SEO data:", seo);
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
    } catch (error) {
        console.log("Error fetching SEO data:", error);
    }

    console.log("Falling back to default metadata");
    // Fallback metadata if API call fails
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
