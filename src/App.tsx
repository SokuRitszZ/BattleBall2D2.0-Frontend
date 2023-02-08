import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import useUser from "./hooks/useUser";
import routes from "./routes/index";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { UserStore } from "./store/user";

function App() {
  return (
    <UserStore.Provider value={useUser()}>
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
    </UserStore.Provider>
  );
}

export default App;
