import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lotties/register.json";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaLock,
  FaCheck,
  FaTimes,
  FaUserPlus,
  FaShieldAlt,
} from "react-icons/fa";
import { axiosInstance } from "../../api/api";

const Register = () => {
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };

    setPasswordCriteria(criteria);

    const errors = [];
    if (!criteria.length) errors.push("Password must be at least 8 characters");
    if (!criteria.uppercase)
      errors.push("Password must contain at least one uppercase letter");
    if (!criteria.lowercase)
      errors.push("Password must contain at least one lowercase letter");
    if (!criteria.number)
      errors.push("Password must contain at least one number");

    return errors.length ? errors.join(". ") : null;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    validatePassword(password);
    setPasswordError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      toast.error(passwordValidationError, {
        style: {
          background: "#ef4444",
          color: "#ffffff",
        },
      });
      setLoading(false);
      return;
    }
    setPasswordError("");

    try {
      const { user } = await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL || null,
      });

      const idToken = await user.getIdToken();
      const { data } = await axiosInstance.post(
        "/users/firebase-login",
        { idToken, name, photoURL },
        { withCredentials: true }
      );

      setUser(data.user);
      toast.success("🎉 Registration successful! Welcome to WhereIsIt", {
        style: {
          background: "#059669",
          color: "#ffffff",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.", {
        style: {
          background: "#ef4444",
          color: "#ffffff",
        },
      });
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
              WhereIsIt
            </h1>
          </Link>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Join thousands of users organizing their digital life
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          {/* Animation Section - Enhanced */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-1">
            <div className="relative">
              <Lottie
                animationData={registerLottie}
                loop={true}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-50/50 rounded-3xl"></div>
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Start Your Organized Journey
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                  <span>Track all your items in one place</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse delay-150"></div>
                  <span>Access from any device</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full animate-pulse delay-300"></div>
                  <span>Smart search and categories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form - Enhanced */}
          <div className="w-full max-w-md lg:max-w-lg flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaUserPlus className="text-white text-2xl" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent">
                    Create Account
                  </h1>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Join us today and get organized
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  {/* Name Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaUser className="text-emerald-600 text-sm" />
                        Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                        required
                        autoComplete="name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-100 p-2 rounded-lg">
                        <FaUser className="text-emerald-600 text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaEnvelope className="text-emerald-600 text-sm" />
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                        required
                        autoComplete="email"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-100 p-2 rounded-lg">
                        <FaEnvelope className="text-emerald-600 text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaCamera className="text-emerald-600 text-sm" />
                        Profile Photo URL
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="photoURL"
                        placeholder="https://example.com/photo.jpg"
                        className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                        autoComplete="photo"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-100 p-2 rounded-lg">
                        <FaCamera className="text-emerald-600 text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaLock className="text-emerald-600 text-sm" />
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                        required
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200 p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-lg" />
                          ) : (
                            <FaEye className="text-lg" />
                          )}
                        </button>
                        <div className="w-px h-6 bg-emerald-200"></div>
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <FaLock className="text-emerald-600 text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Password Criteria */}
                    <div className="mt-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                      <p className="text-sm font-medium text-emerald-800 mb-2">
                        Password must contain:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.length
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.length ? (
                            <FaCheck className="text-xs text-emerald-500" />
                          ) : (
                            <FaTimes className="text-xs text-gray-400" />
                          )}
                          <span>8+ characters</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.uppercase
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.uppercase ? (
                            <FaCheck className="text-xs text-emerald-500" />
                          ) : (
                            <FaTimes className="text-xs text-gray-400" />
                          )}
                          <span>Uppercase letter</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.lowercase
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.lowercase ? (
                            <FaCheck className="text-xs text-emerald-500" />
                          ) : (
                            <FaTimes className="text-xs text-gray-400" />
                          )}
                          <span>Lowercase letter</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.number
                              ? "text-emerald-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.number ? (
                            <FaCheck className="text-xs text-emerald-500" />
                          ) : (
                            <FaTimes className="text-xs text-gray-400" />
                          )}
                          <span>Number (0-9)</span>
                        </div>
                      </div>
                    </div>

                    {passwordError && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-600 flex items-center gap-2">
                          <FaTimes className="text-red-500" />
                          {passwordError}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaUserPlus className="text-lg group-hover:scale-110 transition-transform duration-200" />
                        Create Account
                      </span>
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-8 pt-6 border-t border-emerald-100">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-200 hover:underline underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-600">
                    <FaShieldAlt className="text-xs" />
                    <span>
                      Your account is protected with industry-standard security
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

export default Register;
