import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { DogList, DogSearch } from "../modules";
import { DogDetails } from "../modules/DogSearch/DogDetails/DogDetails";
import { DogError } from "../modules/DogSearch/DogDetails/DogError";
import { ErrorPage } from "./ErrorPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage errorMessage="Page not found" />,
    children: [
      { path: "/home", element: <DogList /> },
      {
        path: "/search",
        element: <DogSearch />,
        errorElement: <DogError />,
        children: [
          {
            path: "",
            element: <DogError />,
          },
          {
            path: ":id",
            element: <DogDetails />,
          },
        ],
      },
    ],
  },
]);
