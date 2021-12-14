import { UserContext } from "../../App";
import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & {
  isAllowed?: boolean;
};

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const userContext = useContext(UserContext);

  return (
    <Route
      render={() =>
        userContext?.username ? children : <Redirect to="/login" />
      }
      {...rest}
    />
  );
};

export default PrivateRoute;
