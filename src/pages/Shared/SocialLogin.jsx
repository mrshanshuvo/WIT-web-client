import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      console.log("Logged in user:", userData);
      toast.success("Login successful");
      navigate(from || "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="divider">OR</div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
