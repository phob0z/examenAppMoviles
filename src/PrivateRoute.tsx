import { Redirect } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

type Props = {
  children: JSX.Element,
}

const PrivateRoute = ({children }: Props) => {
  const { logged } = useAuth();
  return logged ? children : <Redirect to="/home" />;
};

export default PrivateRoute;
