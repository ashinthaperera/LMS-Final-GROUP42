import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

export const AdminPrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log("user role", user);

  if (user.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
  
};