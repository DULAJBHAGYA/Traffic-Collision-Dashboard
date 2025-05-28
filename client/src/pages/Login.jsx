import React, { useState } from "react";
import { Eye, EyeOff, Check, ArrowLeft, Lock, User, X } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRequirements = [
    { text: "Least 8 characters", met: password.length >= 8 },
    {
      text: "Least one number (0-9) or a symbol",
      met: /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      text: "Lowercase (a-z) and uppercase (A-Z)",
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
  ];

  const navigate = (route) => {
    console.log(`Navigating to ${route}`);
    window.location.href = route;
  };

  const handleLogin = async () => {
    
    if (!username.trim() || !password.trim()) {
      setModalMessage("Username and password are required");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setModalMessage("Login successful! Welcome back.");
        setIsSuccess(true);
        setShowModal(true);
      } else {
        setModalMessage(data.message || "Login failed. Please try again.");
        setIsSuccess(false);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("Connection error. Please try again later.");
      setIsSuccess(false);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/collisions");
    }
  };

  const Modal = () => (
    showModal && (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {isSuccess ? 'Success' : 'Error'}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-700 mb-6">{modalMessage}</p>
          <button
            onClick={handleModalOk}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">
              Access your dashboard to explore traffic insights and collision data
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="w-5 h-5 mr-3 text-gray-400">
                  <User />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex-1 border-0 outline-none text-gray-900 placeholder-gray-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="w-5 h-5 mr-3 text-gray-400">
                  <Lock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="flex-1 border-0 outline-none text-gray-900 placeholder-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {(isPasswordFocused || password.length > 0) && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <div className="w-4 h-4 mr-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                      )}
                      <span
                        className={req.met ? "text-green-600" : "text-gray-500"}
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
      
      <Modal />
    </div>
  );
};

export default LoginPage;