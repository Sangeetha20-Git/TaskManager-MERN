import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
} from "../common/PasswordVisibilityIcon";

export default function Login({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  switchToSignup,
  error,
  setError,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email?.trim() || !password?.trim()) {
      setError("Please enter Email and Password.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">

      {/* Main Authentication Container */}
      <div className="min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">

        {/* LOGIN */}
        <div className="w-full flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            {/* Taskly Logo */}
            <div className="text-center mb-8">

              <div className="flex justify-center items-center gap-3 mb-3">

                {/* Logo Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">

                  <div className="w-8 h-8 rounded-lg border-4 border-white flex items-center justify-center">

                    <span className="text-white text-xl font-bold">
                      ✓
                    </span>

                  </div>

                </div>

                <h1 className="text-5xl font-bold text-indigo-900 tracking-tight">
                  Taskly
                </h1>

              </div>

              <p className="text-gray-500 text-lg">
                Organize your thoughts,
                <br />
                get things done.
              </p>

            </div>


            {/* Login Card */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-7">

              {/* Login / Signup Tabs */}
              <div className="grid grid-cols-2 bg-gray-50 rounded-xl p-1 mb-7">

                <button
                  type="button"
                  className="py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={switchToSignup}
                  className="py-3 rounded-lg text-gray-600 hover:text-indigo-600 transition"
                >
                  Sign Up
                </button>

              </div>


              {/* LOGIN FORM */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                    {error}
                  </div>
                )}


                {/* Email */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ✉
                    </span>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);

                        if (error) {
                          setError("");
                        }
                      }}
                      className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    />

                  </div>

                </div>


                {/* Password */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      🔒
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);

                        if (error) {
                          setError("");
                        }
                      }}
                      className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
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


                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition duration-200"
                >
                  Login
                </button>


                {/* Divider */}
                <div className="flex items-center gap-3">

                  <div className="flex-1 h-px bg-gray-200" />

                  <span className="text-gray-400 text-sm">
                    or
                  </span>

                  <div className="flex-1 h-px bg-gray-200" />

                </div>


                {/* Signup */}
                <p className="text-center text-gray-500">

                  Don't have an account?

                  <button
                    type="button"
                    onClick={switchToSignup}
                    className="ml-2 text-indigo-600 font-semibold hover:text-indigo-800"
                  >
                    Sign Up
                  </button>

                </p>

              </form>

            </div>


            {/* Bottom message */}
            <div className="text-center mt-7">

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