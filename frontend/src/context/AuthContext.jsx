import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import axiosInstance from "../../axios.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);

      if(user){
        const idToken = await user.getIdToken();
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
      }
      else{
        delete axiosInstance.defaults.headers.common["Authorization"];
      }

    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);