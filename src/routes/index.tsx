import AccountView from "@/pages/AccountView";
import ChatView from "@/pages/ChatView";
import IndexView from "@/pages/IndexView";
import LobbyView from "@/pages/LobbyView";
import SettingsView from "@/pages/SettingsView";
import { RouteObject } from "react-router-dom";

type typeRouteObject = RouteObject & {
  auth?: boolean;
};

const routes: typeRouteObject[] = [
  { path: "/", element: <IndexView /> },
  { path: "/account", element: <AccountView /> },
  { path: "/lobby", element: <LobbyView />, auth: true },
  { path: "/settings", element: <SettingsView />, auth: true },
  { path: "/chat", element: <ChatView />, auth: true },
];

export default routes;
