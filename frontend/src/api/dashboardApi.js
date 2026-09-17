const API_URL = "https://task-manager-mern-three-azure.vercel.app";


// ========================================
// GET DASHBOARD STATS
// ========================================

export const getDashboardStats = async () => {

    const token = localStorage.getItem("token");


    const response = await fetch(
        `${API_URL}/api/dashboard/stats`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to fetch dashboard statistics"
        );

    }


    return data;
};