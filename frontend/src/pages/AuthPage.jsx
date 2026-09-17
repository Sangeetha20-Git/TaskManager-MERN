import { useState } from "react";

import { loginUser, signupUser } from "../api/authApi";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";


export default function AuthPage({ setLoggedIn }) {

  // =====================================================
  // LOGIN / SIGNUP
  // =====================================================

  const [isLogin, setIsLogin] = useState(true);


  // =====================================================
  // FORM DATA
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // =====================================================
  // ERROR
  // =====================================================

  const [error, setError] = useState("");


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async () => {
    try {

      setError("");

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      setLoggedIn(true);

    } catch (error) {

      setError(error.message);

    }
  };


  // =====================================================
  // SIGNUP
  // =====================================================

  const handleSignup = async () => {
    try {

      setError("");

      await signupUser(name, email, password);

      setName("");
      setEmail("");
      setPassword("");

      setError("");

      setIsLogin(true);

    } catch (error) {

      setError(error.message);

    }
  };


  // =====================================================
  // SWITCH TO LOGIN
  // =====================================================

  const switchToLogin = () => {
    setIsLogin(true);
    setError("");
  };


  // =====================================================
  // SWITCH TO SIGNUP
  // =====================================================

  const switchToSignup = () => {
    setIsLogin(false);
    setError("");
  };


  // =====================================================
  // LOGIN UI
  // =====================================================

  if (isLogin) {
    return (
      <Login
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onLogin={handleLogin}
        switchToSignup={switchToSignup}
        error={error}
        setError={setError}
      />
    );
  }


  // =====================================================
  // SIGNUP UI
  // =====================================================

  return (
    <Signup
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      onSignup={handleSignup}
      switchToLogin={switchToLogin}
      error={error}
      setError={setError}
    />
  );
}
