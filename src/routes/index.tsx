import LobbyView from "@/pages/LobbyView";
import { RouteObject } from "react-router-dom";
import AccountView from "../pages/AccountView";
import IndexView from "../pages/IndexView";

type typeRouteObject = RouteObject & {
  auth?: boolean;
}

const routes: typeRouteObject[] = [
  { path: "/", element: <IndexView />, },
  { path: '/account', element: <AccountView /> },
  { path: '/lobby', element: <LobbyView />, auth: true },
];

export default routes;
