import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext<any | null>(null);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
