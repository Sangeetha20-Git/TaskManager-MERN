const API_URL = "https://task-manager-mern-three-azure.vercel.app";


// ========================================
// LOGIN
// ========================================

export const loginUser = async (email, password) => {

    const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Login failed"
        );

    }


    return data;
};


// ========================================
// SIGNUP
// ========================================

export const signupUser = async (
    name,
    email,
    password
) => {

    const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Signup failed"
        );

    }


    return data;
};


// ========================================
// GET CURRENT USER
// ========================================

export const getMe = async () => {

    const token = localStorage.getItem("token");


    const response = await fetch(
        `${API_URL}/api/auth/me`,
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
            "Failed to get user information"
        );

    }


    return data;
};


export const changePassword = async (
    currentPassword,
    newPassword
) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/auth/change-password`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to change password"
        );
    }

    return data;
};