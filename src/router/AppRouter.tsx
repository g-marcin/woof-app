import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout, Loader } from '../components';
import { LandingPage } from '../modules/LandingPage/LandingPage';
import { ErrorPage } from './ErrorPage';
const DogList = lazy(() => import('../modules/DogList/DogList'));
const DogSearch = lazy(() => import('../modules/DogSearch/DogSearch'));
const Readme = lazy(() => import('../modules/Readme/Readme'));
const DogDetails = lazy(
    () => import('../modules/DogSearch/DogDetails/DogDetails'),
);
const DogIntro = lazy(() => import('../modules/DogSearch/DogIntro/DogIntro'));
export const AppRouter = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage errorMessage="Page not found" />,
        children: [
            {
                path: '',
                element: <LandingPage />,
            },
            {
                path: '/readme',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Readme />
                    </Suspense>
                ),
            },
            {
                path: '/home',
                element: (
                    <Suspense fallback={<Loader />}>
                        <DogList />
                    </Suspense>
                ),
            },
            {
                path: '/search',
                element: (
                    <Suspense fallback={<Loader />}>
                        <DogSearch />
                    </Suspense>
                ),
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <DogIntro />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':breedName',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <DogDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':breedName/:variant',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <DogDetails />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);
