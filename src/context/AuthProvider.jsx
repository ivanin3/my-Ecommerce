import React, { useContext, useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario logueado:", user);
        setCurrentUser(user);
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = () => currentUser !== null;

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
