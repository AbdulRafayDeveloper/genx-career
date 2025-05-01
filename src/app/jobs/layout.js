import React from "react";
import axios from "axios";

export async function generateMetadata() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/seo-page?pageName=Jobs`
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
                    canonical: "/jobs",
                },
            };
        }
    } catch (error) {
        console.log("Error fetching SEO data:", error);
    }

    console.log("Falling back to default metadata");
    // Fallback metadata if API call fails
    return {
        title: "Jobs Page",
        description: "Jobs",
        keywords: "Jobs",
        robots: "index, follow",
        alternates: {
            canonical: "/jobs",
        },
    };
}

const Layout = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
