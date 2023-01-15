import { createContext } from "react";

interface ContextValue {
  logged: boolean;
  loginUser: Function;
  logout: Function;
}

const AuthContext = createContext<ContextValue>({
  logged: false,
  loginUser: () => {},
  logout: () => {},
});


export default AuthContext;