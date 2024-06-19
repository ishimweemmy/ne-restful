import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "src/lib/utils";

const ProtectedRoute: FC<TCProps> = ({ children }) => {
  const isAllowed = isAuthenticated();
  const location = useLocation();
  if (!isAllowed)
    return (
      <Navigate to={"/auth/sign-in"} state={{ path: location.pathname }} />
    );

  return children;
};

export default ProtectedRoute;
