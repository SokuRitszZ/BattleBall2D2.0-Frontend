// https://www.youtube.com/watch?v=0x8Dap2EIVE

import { useContext } from "react";
import { UserStore } from '@/store/user';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { user } = useContext(UserStore);
  return user.status === 'logged in' ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes;