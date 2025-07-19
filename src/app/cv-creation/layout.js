import React from "react";
// import { getSeoData } from "@/lib/getSeoData";

// export async function generateMetadata() {
//     const data = await getSeoData("CvCreation");

//     if (data?.status === 200) {
//         const seo = data.data;
//         return {
//             title: seo.title,
//             description: seo.description,
//             keywords: seo.keywords.join(", "),
//             robots: seo.index ? "index, follow" : "noindex, nofollow",
//             alternates: {
//                 canonical: "/cv-creation",
//             },
//         };
//     }

//     return {
//         title: "CvCreation Page",
//         description: "CvCreation",
//         keywords: "CvCreation",
//         robots: "index, follow",
//         alternates: {
//             canonical: "/cv-creation",
//         },
//     };
// }

const Layout = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
