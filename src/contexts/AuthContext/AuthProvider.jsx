import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { axiosInstance } from "../../api/api"; // <- use axiosInstance here
import { updateProfile as fbUpdateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Common function to handle backend authentication
  const handleBackendAuth = async (firebaseUser, extraData = {}) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      
      // Use provided extraData OR fall back to firebase profile
      const name = extraData.name || firebaseUser.displayName || "";
      const photoURL = extraData.photoURL || firebaseUser.photoURL || "";

      // Send to backend for verification and session creation
      const response = await axiosInstance.post(
        "/users/firebase-login",
        { idToken, name, photoURL },
        { withCredentials: true }
      );

      // Return combined user data
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: name,
        photoURL: photoURL,
        ...(response.data.user || {}),
      };
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Backend auth error:", error);
      throw error;
    }
  };

  // Common function to handle user registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Common function to update user profile
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) throw new Error("No user logged in");

    try {
      await fbUpdateProfile(auth.currentUser, profile);
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  // Common function to handle user login
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return await handleBackendAuth(userCredential.user);
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Common function to handle Google sign-in
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return await handleBackendAuth(result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Common function to handle user logout
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // useEffect to sync auth state with backend
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Only sync with backend if no user object exists in state (like on fresh page load)
      if (currentUser && !user) {
        try {
          await handleBackendAuth(currentUser);
        } catch (error) {
          console.error("Error syncing auth with backend:", error);
          setUser(null);
        }
      } else if (!currentUser) {
        setUser(null);
      }
      setAuthChecked(true);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // Auth context value
  const authInfo = {
    loading: loading || !authChecked,
    user,
    setUser,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    handleBackendAuth,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
