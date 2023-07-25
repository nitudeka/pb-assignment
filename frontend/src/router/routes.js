import CardNew from "../pages/CardNew";
import CardsList from "../pages/CardsList";

const getRoutes = () => [
  {
    path: "/",
    element: <CardsList />,
  },
  {
    path: "/new",
    element: <CardNew />,
  },
];

export default getRoutes;
