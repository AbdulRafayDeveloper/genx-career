import axios from "axios";

export async function getSeoData(pageName) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/seo-page?pageName=${pageName}`,
            {
                headers: {
                    'Cache-Control': 'no-store',
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching SEO data:", error);
        return null;
    }
}
