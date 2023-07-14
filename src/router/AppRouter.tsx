import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { DogList, DogSearch } from "../modules";
import { DogDetails } from "../modules/DogSearch/DogDetails/DogDetails";
import { DogIntro } from "../modules/DogSearch/DogIntro";
import { ErrorPage } from "./ErrorPage";

export const AppRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <ErrorPage errorMessage="Page not found" />,

    children: [
      { path: "", element: <DogList /> },
      { path: "/home", element: <DogList /> },
      {
        path: "/search",
        element: <DogSearch />,
        children: [
          {
            path: "",
            element: <DogIntro />,
          },
          {
            path: ":breedName",
            element: <DogDetails />,
          },
          {
            path: ":breedName/:variant",
            element: <DogDetails />,
          },
        ],
      },
    ],
  },
]);
