import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { DogDetails } from "../modules/DogSearch/DogDetails/DogDetails";
import { DogIntro } from "../modules/DogSearch/DogIntro";
import { ErrorPage } from "./ErrorPage";

const DogList = lazy(() => import("../modules/DogList/DogList"));
const DogSearch = lazy(() => import("../modules/DogSearch/DogSearch"));
export const AppRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <ErrorPage errorMessage="Page not found" />,

    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DogList />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DogList />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DogSearch />
          </Suspense>
        ),
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
