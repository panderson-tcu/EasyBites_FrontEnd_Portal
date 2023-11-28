import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log('allowedRoles:', allowedRoles);

    console.log(auth?.roles);

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) // checking if allowed role is in the allowed roles
            ? <Outlet />
            : auth?.user 
                ? <Navigate to="/unauthorized" state={{ from: location}} replace />
                : <Navigate to="/login" state={{ from: location}} replace /> // send user to login from wherever if they are not logged in
    );
}

export default RequireAuth;