import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";
import routes from "./routes/index";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { SocketStore } from "./store/socket";
import { UserStore } from "./store/user";

function App() {
  return (
    <UserStore.Provider value={useUser()}>
      <SocketStore.Provider value={useSocket()}>
        <Routes>
          {routes
            .filter((r) => !r.auth)
            .map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
          <Route element={<ProtectedRoutes />}>
            {routes
              .filter((r) => r.auth)
              .map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
          </Route>
        </Routes>
      </SocketStore.Provider>
    </UserStore.Provider>
  );
}

export default App;
