import { useRoutes } from "react-router-dom";
import "./App.css";
import useUser from "./hooks/useUser";
import routes from "./routes/index";
import { UserStore } from "./store/user";

function App() {
  return <UserStore.Provider value={useUser()}>{useRoutes(routes)}</UserStore.Provider>;
}

export default App;
