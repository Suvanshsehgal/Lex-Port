import React, { useState } from "react";
import Logo from "../assets/logo2.png";
import LoginImage from "../assets/Login.png"; 
import API from "../api";
import loader from "../assets/Loader1.gif";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSucessMessage("");
    setIsLoading(true);

    try {
      const res = await API.post("/register", {
        Username: username, 
        email,
        password,
      });
      setSucessMessage(res.data.message);
      console.log("Signup successful:", res.data);

      if (res.data?.data?.token) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        console.log("Token stored:", res.data.data.token);
        console.log("User stored:", res.data.data.user);
      }

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const code = err.response?.data?.code;
      const message = err.response?.data?.message;
      setIsLoading(false);

      switch (code) {
        case "USER_EXISTS":
          setErrorMessage("User already exists with this email or username.");
          break;
        case "MISSING_FIELDS":
          setErrorMessage("Please fill all fields.");
          break;
        default:
          setErrorMessage(message || "An unexpected error occurred during signup."); 
      }

      console.error("Signup error:", err.response?.data || err); 
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <img
              src={loader}
              alt="Loading..."
              className="w-16 h-16 animate-pulse"
            />
            <p className="mt-4 text-white text-lg font-medium">Registering the User...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${LoginImage})`,
          }}
        />

        {/* Overlay with reduced blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

        {/* Main content container */}
        {/* Adjusted padding-top for mobile to shift content up */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen pt-12 lg:pt-0">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 lg:gap-20">
            {/* Left side - Welcome text */}
            <div className="text-white text-center lg:text-left flex-1 max-w-md">
              {/* Logo Section */}
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start">
                  <img
                    src={Logo}
                    alt="LexPort Logo"
                    className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain rounded-sm"
                  />
                </div>
              </div>

              {/* Welcome message - Font sizes adjusted for mobile */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Welcome Back
                <br />
                to LexPort
              </h2>
              {/* Re-added the "Securely access your legal dashboard" line with adjusted font size */}
              <p className="text-base sm:text-lg text-white leading-relaxed"> {/* Changed from text-sm/sm:text-base */}
                Securely access your legal dashboard
                <br />
                and continue where you left off.
              </p>
            </div>

            {/* Right side - Signup form */}
            {/* Added mb-8 for mobile bottom margin, removed on large screens */}
            <div className="flex-1 max-w-sm w-full mb-8 lg:mb-0">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white text-center mb-8">
                  SIGN UP
                </h3>

                <div className="space-y-6">
                  {errorMessage && (
                    <div className="bg-red-500/20 border border-red-400 text-red-300 text-sm rounded-lg px-4 py-2 backdrop-blur-sm transition-opacity duration-300">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="bg-green-500/20 border border-green-400 text-green-300 text-sm rounded-lg px-4 py-2 backdrop-blur-sm transition-opacity duration-300">
                      {successMessage}
                    </div>
                  )}

                  {/* Username field */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your username"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Sign Up button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 border border-white/30 backdrop-blur-sm"
                  >
                    Sign Up
                  </button>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;