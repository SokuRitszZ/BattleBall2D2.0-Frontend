import { RouteObject } from "react-router-dom";
import IndexView from "../pages/IndexView";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexView/>
  }
];

export default routes;
