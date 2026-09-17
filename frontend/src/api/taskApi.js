const API_URL = "import.meta.env.VITE_API_URL";


// ========================================
// GET TOKEN
// ========================================

const getToken = () => {
    return localStorage.getItem("token");
};


// ========================================
// GET ALL TASKS
// ========================================

export const getTasks = async (filters = {}) => {

    const token = getToken();

    const query = new URLSearchParams();


    if (filters.priority) {
        query.append("priority", filters.priority);
    }

    if (filters.category) {
        query.append("category", filters.category);
    }

    if (filters.status) {
        query.append("status", filters.status);
    }

    if (filters.search) {
        query.append("search", filters.search);
    }

    if (filters.dueFrom) {
        query.append("dueFrom", filters.dueFrom);
    }

    if (filters.dueTo) {
        query.append("dueTo", filters.dueTo);
    }


    const queryString = query.toString();

    const url = queryString
        ? `${API_URL}/api/tasks?${queryString}`
        : `${API_URL}/api/tasks`;


    const response = await fetch(url, {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`
        }
    });


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch tasks"
        );

    }


    return data;
};


// ========================================
// CREATE TASK
// ========================================

export const createTask = async (taskData) => {

    const token = getToken();


    const response = await fetch(
        `${API_URL}/api/tasks`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(taskData)
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to create task"
        );

    }


    return data;
};


// ========================================
// UPDATE TASK
// ========================================

export const updateTask = async (taskId, taskData) => {

    const token = getToken();


    const response = await fetch(
        `${API_URL}/api/tasks/${taskId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(taskData)
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to update task"
        );

    }


    return data;
};


// ========================================
// DELETE TASK
// ========================================

export const deleteTask = async (taskId) => {

    const token = getToken();


    const response = await fetch(
        `${API_URL}/api/tasks/${taskId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to delete task"
        );

    }


    return data;
};