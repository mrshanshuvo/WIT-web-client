import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "../../components/social-login/SocialLogin";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/signIn.json";

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
      toast.success("🎉 Welcome back! Login successful", {
        style: {
          background: "#059669",
          color: "#ffffff",
        },
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials.",
        {
          style: {
            background: "#ef4444",
            color: "#ffffff",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
              WhereIsIt
            </h1>
          </Link>
          <p className="mt-1.5 text-gray-600 text-sm sm:text-base">
            Welcome back! Sign in to continue your organized journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 xl:gap-12">
          {/* Animation Section */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-1">
            <div className="relative rounded-2xl overflow-hidden">
              <Lottie
                animationData={loginLottie}
                loop={true}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-50/50" />
            </div>
            <div className="mt-4 text-center lg:text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Ready to continue?
              </h2>
              <div className="space-y-1.5 text-sm sm:text-base text-gray-600">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
                  <span>Access your organized items</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse delay-150" />
                  <span>Sync across all your devices</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full animate-pulse delay-300" />
                  <span>Quick and secure access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sign In Form */}
          <div className="w-full max-w-md lg:max-w-lg flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden">
              <div className="p-5 sm:p-6 lg:p-7">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent">
                    Welcome back
                  </h1>
                  <p className="text-gray-500 mt-1.5 text-sm sm:text-base">
                    Sign in to your account
                  </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block mb-1.5">
                      <span className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaEnvelope className="text-emerald-600 text-sm" />
                        Email address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full pl-3.5 pr-11 py-2.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 bg-white/60 backdrop-blur-sm hover:border-emerald-300 text-sm"
                        required
                        autoComplete="email"
                      />
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-emerald-100 p-1.5 rounded-md">
                        <FaEnvelope className="text-emerald-600 text-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block mb-1.5">
                      <span className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <FaLock className="text-emerald-600 text-sm" />
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="w-full pl-3.5 pr-12 py-2.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 bg-white/60 backdrop-blur-sm hover:border-emerald-300 text-sm"
                        required
                        autoComplete="current-password"
                      />
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors duration-150 p-1"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-base" />
                          ) : (
                            <FaEye className="text-base" />
                          )}
                        </button>
                        <div className="w-px h-5 bg-emerald-200" />
                        <div className="bg-emerald-100 p-1.5 rounded-md">
                          <FaLock className="text-emerald-600 text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="text-right mt-2">
                      <Link
                        to="/forgot-password"
                        className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-150 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-base group-hover:animate-bounce" />
                        Sign in
                      </span>
                    )}
                  </button>
                </form>

                {/* Social Login */}
                <SocialLogin from={from} />

                {/* Sign Up Link */}
                <div className="text-center mt-6 pt-4 border-t border-emerald-100">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Do not have an account?{" "}
                    <Link
                      to="/register"
                      className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-150 hover:underline underline-offset-2"
                    >
                      Create one here
                    </Link>
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-emerald-600">
                    <FaShieldAlt className="text-xs" />
                    <span>
                      Your data is protected with end-to-end encryption
                    </span>
                  </div>
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
