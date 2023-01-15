import { Redirect } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

type Props = {
  children: JSX.Element,
}

const PublicRoute = ({children}: Props) => {
  const { logged } = useAuth();
  return !logged ? children : <Redirect to="/dashboard" />;
};

export default PublicRoute;
