import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      console.log("Logged in user:", userData);
      toast.success("🎉 Login successful!", {
        style: {
          background: "#10b981",
          color: "#ffffff",
        },
      });
      navigate(from || "/", { replace: true });
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        style: {
          background: "#ef4444",
          color: "#ffffff",
        },
      });
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="mt-8">
      {/* Divider with text */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="flex-grow border-t border-emerald-200"></div>
        <span className="flex-shrink mx-4 text-sm text-emerald-700 font-medium bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 rounded-full">
          OR
        </span>
        <div className="flex-grow border-t border-emerald-200"></div>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="group relative w-full px-6 py-4 bg-white text-gray-800 rounded-xl border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3"
      >
        {/* Background effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>

        {/* Google Icon */}
        <div className="relative z-10 bg-white p-2 rounded-lg shadow-sm">
          <FcGoogle className="text-2xl" />
        </div>

        {/* Text */}
        <span className="relative z-10 font-semibold text-gray-700 group-hover:text-gray-800">
          Continue with Google
        </span>

        {/* Arrow Icon */}
        <FaArrowRight className="relative z-10 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
      </button>

      {/* Alternative text */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Secure login using your Google account
      </p>
    </div>
  );
};

export default SocialLogin;
