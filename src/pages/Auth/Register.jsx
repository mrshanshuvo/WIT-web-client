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
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    };

    setPasswordCriteria(criteria);

    const errors = [];
    if (!criteria.length) errors.push("Password must be at least 6 characters");
    if (!criteria.uppercase)
      errors.push("Password must contain at least one uppercase letter");
    if (!criteria.lowercase)
      errors.push("Password must contain at least one lowercase letter");

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
      toast.error(passwordValidationError);
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
      toast.success("🎉 Registration successful! Welcome to WhereIsIt");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50/50 rounded-3xl"></div>
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Start Your Organized Journey
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Track all your items in one place</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Access from any device</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Smart search and categories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form - Enhanced */}
          <div className="w-full max-w-md lg:max-w-lg flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
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
                        <FaUser className="text-blue-500 text-sm" />
                        Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="input input-bordered w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        required
                        autoComplete="name"
                      />
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                  </div>

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
                        placeholder="your@email.com"
                        className="input input-bordered w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        required
                        autoComplete="email"
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-group">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaCamera className="text-blue-500 text-sm" />
                        Profile Photo URL
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="photoURL"
                        placeholder="https://example.com/photo.jpg"
                        className="input input-bordered w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        autoComplete="photo"
                      />
                      <FaCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
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
                        placeholder="••••••••"
                        className="input input-bordered w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        required
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
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

                    {/* Password Criteria */}
                    <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Password must contain:
                      </p>
                      <div className="space-y-1 text-sm">
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.length
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.length ? (
                            <FaCheck className="text-xs" />
                          ) : (
                            <FaTimes className="text-xs" />
                          )}
                          <span>At least 6 characters</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.uppercase
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.uppercase ? (
                            <FaCheck className="text-xs" />
                          ) : (
                            <FaTimes className="text-xs" />
                          )}
                          <span>One uppercase letter</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${
                            passwordCriteria.lowercase
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordCriteria.lowercase ? (
                            <FaCheck className="text-xs" />
                          ) : (
                            <FaTimes className="text-xs" />
                          )}
                          <span>One lowercase letter</span>
                        </div>
                      </div>
                    </div>

                    {passwordError && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
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
                    className="btn w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline underline-offset-2"
                    >
                      Sign in here
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

export default Register;
