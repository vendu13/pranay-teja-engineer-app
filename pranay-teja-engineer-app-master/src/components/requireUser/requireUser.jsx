import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../../store/user/userApi';
import {useSelector} from "react-redux";

function RequireUser() {
  const user = useSelector((state) => state.userReducer.user);
  const { data: userData } = userApi.endpoints.getMe.useQuery(null);
  const loggedIn = userData?.user?.name;

  const location = useLocation();

  if (loggedIn && !user) {
    return 'Loading...';
  }

  return loggedIn || user.name ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
}

export default RequireUser;
