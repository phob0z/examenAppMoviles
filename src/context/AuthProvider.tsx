import { useContext, useState } from "react";
import { auth } from "../firestore";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "../toast";
import AuthContext from "./AuthContext";
import { useHistory } from "react-router";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export function AuthProvider({ children }: any) {
  const [logged, setlogged] = useState<boolean>(initialization);

  const history = useHistory();

  async function loginUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("logged", "true");
      setlogged(true);
      toast("Bienvenido");
    } catch (error: any) {
      toast(error.message);
      setlogged(false);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      localStorage.removeItem("logged");
      setlogged(false);
      toast("Adios...");
      history.push("/login");
    } catch (error: any) {
      toast(error.message, 4000);
    }
  }

  function initialization() {
    var logged;
    localStorage.getItem("logged") === "true"
      ? (logged = true)
      : (logged = false);
    return logged;
  }

  return (
    <AuthContext.Provider value={{ logged, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
