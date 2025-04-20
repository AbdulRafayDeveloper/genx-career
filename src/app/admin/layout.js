// import React from "react";

// export const metadata = {
//     title: "Admin Panel - GenX Career",
//     description: "Admin dashboard for managing GenX Career platform content.",
//     keywords: "Admin, Dashboard, GenX Career, Management",
//     robots: "noindex, nofollow", // Prevent search engines from indexing this page
// };

// const AdminLayout = ({ children }) => {
//     return (
//         <div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default AdminLayout;

// src/app/admin/layout.js
export const metadata = {
    title: "Admin Panel - GenX Career",
    description: "Admin dashboard for managing GenX Career platform content.",
    keywords: "Admin, Dashboard, GenX Career, Management",
    robots: "noindex, nofollow",
};

const AdminLayout = ({ children }) => {
    return <main>{children}</main>;
};

export default AdminLayout;
