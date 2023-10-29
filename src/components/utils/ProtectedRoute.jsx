import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../reducers/current-user-slice";
import { useSelector } from "react-redux";

export const Protected = ({ element }) => {
  const location = useLocation();
  const userState = useSelector(selectUser);

  return userState.isLoggedIn ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
