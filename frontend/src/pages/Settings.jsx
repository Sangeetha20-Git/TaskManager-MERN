import { useState } from "react";
import { changePassword } from "../api/authApi";


// ========================================
// EYE ICON
// ========================================

function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
            />

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    );
}


// ========================================
// EYE OFF ICON
// ========================================

function EyeOffIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.47 0 2.84-.302 4.08-.84"
            />

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.228 6.228A10.45 10.45 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.47 10.47 0 0 1-2.356 3.946"
            />

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.228 6.228 3 3m3.228 3.228 12.544 12.544M9.88 9.88a3 3 0 0 0 4.24 4.24"
            />
        </svg>
    );
}


// ========================================
// SETTINGS
// ========================================

export default function Settings() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Controls password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // ========================================
    // CHANGE PASSWORD
    // ========================================

    const handleChangePassword = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        // Check empty fields

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setError(
                "Please fill in all password fields."
            );

            return;
        }


        // Check password length

        if (newPassword.length < 8) {
            setError(
                "New password must be at least 8 characters."
            );

            return;
        }


        // Check matching passwords

        if (newPassword !== confirmPassword) {
            setError(
                "New passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);

            const data = await changePassword(
                currentPassword,
                newPassword
            );

            setMessage(data.message);


            // Clear fields after success

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">


            {/* ========================================
                HEADER
            ======================================== */}

            <div className="px-6 py-5 border-b border-slate-200">

                <h1 className="text-2xl font-bold text-slate-800">
                    Settings
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Manage your account settings
                </p>

            </div>


            {/* ========================================
                PASSWORD SECTION
            ======================================== */}

            <div className="p-6">

                <div className="max-w-xl">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Change Password
                    </h2>

                    <p className="text-sm text-slate-500 mt-1 mb-6">
                        Update your password to keep your account secure.
                    </p>


                    {/* ========================================
                        ERROR
                    ======================================== */}

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}


                    {/* ========================================
                        SUCCESS
                    ======================================== */}

                    {message && (
                        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
                            {message}
                        </div>
                    )}


                    {/* ========================================
                        FORM
                    ======================================== */}

                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-5"
                    >


                        {/* ========================================
                            CURRENT PASSWORD
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Current Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={currentPassword}
                                    onChange={(event) =>
                                        setCurrentPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter current password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        pr-11
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />


                                {/* Eye button */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                        transition
                                    "
                                    aria-label={
                                        showCurrentPassword
                                            ? "Hide current password"
                                            : "Show current password"
                                    }
                                >
                                    {showCurrentPassword ? (
                                        <EyeOffIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* ========================================
                            NEW PASSWORD
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(event) =>
                                        setNewPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter new password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        pr-11
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />


                                {/* Eye button */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                        transition
                                    "
                                    aria-label={
                                        showNewPassword
                                            ? "Hide new password"
                                            : "Show new password"
                                    }
                                >
                                    {showNewPassword ? (
                                        <EyeOffIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* ========================================
                            CONFIRM PASSWORD
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm New Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Confirm new password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        pr-11
                                        text-sm
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />


                                {/* Eye button */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                        hover:text-slate-600
                                        transition
                                    "
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* ========================================
                            BUTTON
                        ======================================== */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-blue-300
                                text-white
                                font-semibold
                                px-5
                                py-2.5
                                rounded-lg
                                transition
                            "
                        >
                            {loading
                                ? "Changing Password..."
                                : "Change Password"
                            }
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}