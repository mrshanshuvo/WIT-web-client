import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/signIn.json"; // Add your login animation

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userData = await signInUser(email, password);
      setUser(userData);
      toast.success("🎉 Welcome back! Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </button>
          <Link to="/" className="inline-block">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WhereIsIt
            </h1>
          </Link>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Welcome back! Sign in to continue your organized journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          {/* Animation Section */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-1">
            <div className="relative">
              <Lottie
                animationData={loginLottie}
                loop={true}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50/50 rounded-3xl"></div>
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Ready to Continue?
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Access your organized items</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Sync across all your devices</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Quick and secure access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sign In Form - Enhanced */}
          <div className="w-full max-w-md lg:max-w-lg flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Sign in to your account
                  </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  {/* Email Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaEnvelope className="text-blue-500 text-sm" />
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="your@email.com"
                        className="input input-bordered w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        required
                        autoComplete="email"
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaLock className="text-blue-500 text-sm" />
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        required
                        autoComplete="current-password"
                      />
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-lg" />
                        ) : (
                          <FaEye className="text-lg" />
                        )}
                      </button>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right mt-2">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                        Signing In...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">
                    or continue with
                  </span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Social Login */}
                <SocialLogin from={from} />

                {/* Sign Up Link */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline underline-offset-2"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
