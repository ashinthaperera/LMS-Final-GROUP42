import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

export const StudentPrivateRoutes = ()=>{
    const user = useSelector(selectUser);

    if (user.role === 'student') {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
}