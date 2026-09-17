import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
} from "../common/PasswordVisibilityIcon";

export default function Signup({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onSignup,
  switchToLogin,
  error,
  setError,
}) {
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Controls password visibility
  const [showPassword, setShowPassword] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid =
    Object.values(passwordRules).every(Boolean);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Password does not meet the required criteria.");
      return;
    }

    setError("");
    onSignup();
  };


  return (
    <div className="min-h-screen w-full bg-slate-50">

      {/* Main Authentication Container */}
      <div className="min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">

        {/* SIGN UP */}
        <div className="w-full flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            {/* Taskly Logo */}
            <div className="text-center mb-6">

              <div className="flex justify-center items-center gap-3 mb-3">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">

                  <div className="w-8 h-8 rounded-lg border-4 border-white flex items-center justify-center">

                    <span className="text-white text-xl font-bold">
                      ✓
                    </span>

                  </div>

                </div>

                <h1 className="text-5xl font-bold text-indigo-900">
                  Taskly
                </h1>

              </div>

              <p className="text-gray-500 text-lg">
                Organize your thoughts,
                <br />
                get things done.
              </p>

            </div>


            {/* Signup Card */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-7">

              {/* Tabs */}
              <div className="grid grid-cols-2 bg-gray-50 rounded-xl p-1 mb-6">

                <button
                  type="button"
                  onClick={switchToLogin}
                  className="py-3 rounded-lg text-gray-600 hover:text-indigo-600 transition"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold"
                >
                  Sign Up
                </button>

              </div>


              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>

              <p className="text-gray-500 mb-5">
                Start organizing your tasks today.
              </p>


              <form onSubmit={handleSubmit} className="space-y-4">


                {/* Name */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-200 py-3.5 px-4 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    required
                  />

                </div>


                {/* Email */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 py-3.5 px-4 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    required
                  />

                </div>


                {/* Password */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      className="w-full border border-gray-200 py-3.5 px-4 pr-12 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                      value={password}
                      onFocus={() =>
                        setPasswordTouched(true)
                      }
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordTouched(true);

                        if (error) {
                          setError("");
                        }
                      }}
                      required
                    />

                    {/* Password Visibility Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-gray-600
                        transition
                      "
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </button>

                  </div>

                </div>


                {/* Password Help */}
                <p className="text-gray-500 text-xs">
                  Use at least 8 characters with uppercase, lowercase,
                  number, and special character.
                </p>


                {/* Password Rules */}
                {passwordTouched && (

                  <div className="text-sm border border-gray-200 rounded-xl p-3 bg-gray-50">

                    <p className="font-semibold mb-2 text-gray-700">
                      Password must contain:
                    </p>

                    <p
                      className={
                        passwordRules.length
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {passwordRules.length ? "✔" : "✖"}
                      {" "}Minimum 8 characters
                    </p>

                    <p
                      className={
                        passwordRules.uppercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {passwordRules.uppercase ? "✔" : "✖"}
                      {" "}One uppercase letter
                    </p>

                    <p
                      className={
                        passwordRules.lowercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {passwordRules.lowercase ? "✔" : "✖"}
                      {" "}One lowercase letter
                    </p>

                    <p
                      className={
                        passwordRules.number
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {passwordRules.number ? "✔" : "✖"}
                      {" "}One number
                    </p>

                    <p
                      className={
                        passwordRules.special
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {passwordRules.special ? "✔" : "✖"}
                      {" "}One special character
                    </p>

                  </div>

                )}


                {/* Error */}
                {error && (

                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                    {error}
                  </div>

                )}


                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={!isPasswordValid}
                  className={`w-full py-3.5 rounded-xl text-white font-semibold text-lg shadow-lg transition ${
                    isPasswordValid
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Create Account
                </button>


                {/* Login */}
                <p className="text-center text-gray-500">

                  Already have an account?

                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-indigo-600 font-semibold ml-2 hover:text-indigo-800"
                  >
                    Login
                  </button>

                </p>

              </form>

            </div>


            {/* Bottom message */}
            <div className="text-center mt-5">

              <p className="text-indigo-900 font-[cursive] text-lg">
                Plan ✓ &nbsp; Focus ✓ &nbsp; Achieve ✓
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}