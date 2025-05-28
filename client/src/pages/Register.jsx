import React, { useState } from "react";
import { Eye, EyeOff, Check, ArrowLeft, Lock, Mail, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <div className="mb-3">
              <span className="text-sm text-black">Already registered? </span>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-500"
              >
                Sign in
              </Link>{" "}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-gray-600">
              Create your account to unlock powerful collision analytics and reporting tools
            </p>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="w-5 h-5 mr-3 text-gray-400">
                  <User />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex-1 border-0 outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="w-5 h-5 mr-3 text-gray-400">
                  <Mail />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-0 outline-none text-gray-900 placeholder-gray-500"
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
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

            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="w-5 h-5 mr-3 text-gray-400">
                  <Lock />
                </div>
                <input
                  type="password"
                  placeholder="Re-Type Password"
                  className="flex-1 border-0 outline-none text-gray-900 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center group"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
