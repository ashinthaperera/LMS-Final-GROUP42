
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

export const LecturerPrivateRoutes = ()=>{
    const user = useSelector(selectUser);

    if (user.role === 'lecturer') {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
}