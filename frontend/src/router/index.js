import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import getRoutes from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: getRoutes(),
  },
]);

export default router;
