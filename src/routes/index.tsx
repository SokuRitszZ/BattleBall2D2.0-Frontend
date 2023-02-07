import { RouteObject } from "react-router-dom";
import AccountView from "../pages/AccountView";
import IndexView from "../pages/IndexView";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexView />,
  },
  {
    path: '/account',
    element: <AccountView />
  },
];

export default routes;
