import React, { useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null); // new

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      const token = await user.getIdToken(true); // Get Firebase ID token
      setIdToken(token);
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIdToken(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  // Function to get the current user's ID token
  const getTokenId = async (forceRefresh = false) => {
    try {
      if (currentUser) {
        const token = await currentUser.getIdToken(forceRefresh);
        return token;
      } else {
        throw new Error("No user is currently logged in");
      }
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    getTokenId,
    idToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}