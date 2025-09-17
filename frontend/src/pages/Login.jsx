import React, { useState } from "react";
import GoogleLogo from "../assets/GoogleLogo.png";
import Logo from "../assets/logo2.png";
import LoginImage from "../assets/Login.png";
import { useNavigate } from "react-router-dom";
import loader from "../assets/Loader1.gif";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage,setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setSuccessMessage("");
  setIsLoading(true);

  try {
    const response = await API.post("/user/login", { email, password });


    console.log("Login success:", response.data);
    setErrorMessage("");
    setSuccessMessage(response.data.message);

    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    console.log("Token stored:", response.data.data.token);

     setTimeout(() => {
      navigate("/home");
    }, 2000);

  } catch (err) {
    console.error(" Full error response:", err.response?.data);

    const code = err.response?.data?.code;
    const message = err.response?.data?.message;
    setIsLoading(false)

    if (code === 401) {
      setErrorMessage("Incorrect password.");
    } else if (code === 404) {
      setErrorMessage("User not found.");
    } else {
      setErrorMessage(message || "An unexpected error occurred.");
    }
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
      <p className="mt-4 text-white text-lg font-medium">Logging you in...</p>
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
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 lg:gap-20">
          {/* Left side - Welcome text */}
          <div className="text-white text-center lg:text-left flex-1 max-w-md">
            {/* Logo Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start">
                <img
                  src={Logo}
                  alt="LexPort Logo"
                  className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto space-x-4 object-contain rounded-sm"
                />
              </div>
            </div>

            {/* Welcome message */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Welcome Back
              <br />
              to LexPort
            </h2>
            <p className="text-lg text-white leading-relaxed">
              Securely access your legal dashboard
              <br />
              and continue where you left off.
            </p>
          </div>

          {/* Right side - Login form */}
          {/* ADDED mb-8 (for mobile margin) and lg:mb-0 (to remove on large screens) */}
          <div className="flex-1 max-w-sm w-full mb-8 lg:mb-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                LOGIN
              </h3>

              <div className="space-y-6">
                {/* Error Message */}
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

                {/* Sign In button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 border border-white/30 backdrop-blur-sm"
                >
                  Sign In
                </button>

                {/* Divider */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;