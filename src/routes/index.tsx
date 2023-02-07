import LobbyView from "@/pages/LobbyView";
import { RouteObject } from "react-router-dom";
import AccountView from "../pages/AccountView";
import IndexView from "../pages/IndexView";

const routes: RouteObject[] = [
  { path: "/", element: <IndexView />, },
  { path: '/account', element: <AccountView /> },
  { path: '/lobby', element: <LobbyView /> },
];

export default routes;
