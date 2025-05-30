import React, { useState } from "react";
import { Eye, EyeOff, Check, ArrowLeft, Lock, User, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
            <div className="mb-3">
              <span className="text-sm text-black">
                Don't have an account?{" "}
              </span>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-500"
              >
                Sign up
              </Link>{" "}
            </div>
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
      
      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 overflow-hidden">
        {/* Floating Cards */}
        <div className="absolute inset-0 p-8">
          {/* Inbox Card */}
          <div className="absolute top-20 right-32 bg-white rounded-xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-sm text-orange-500 mb-1">Inbox</div>
            <div className="text-2xl font-bold text-gray-900">176,18</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="h-8 w-16 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full relative">
                <div className="absolute right-0 top-0 w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  45
                </div>
              </div>
            </div>
          </div>

          {/* Data Privacy Card */}
          <div className="absolute bottom-32 right-16 bg-white rounded-xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-xs">
            <div className="flex items-start justify-between mb-3">
              <div className="text-orange-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Your data, your rules
            </h3>
            <p className="text-sm text-gray-600">
              Your data belongs to you, and our encryption ensures that
            </p>
          </div>

          {/* Social Icons */}
          <div className="absolute top-40 right-8 space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="#E4405F" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.348-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white bg-opacity-3 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <Modal />
    </div>
  );
};

export default LoginPage;