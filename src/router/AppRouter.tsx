import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components';

import { DogIntro } from '../modules/DogSearch/DogIntro';
import { ErrorPage } from './ErrorPage';

const DogList = lazy(() => import('../modules/DogList/DogList'));
const DogSearch = lazy(() => import('../modules/DogSearch/DogSearch'));
const DogDetails = lazy(
    () => import('../modules/DogSearch/DogDetails/DogDetails'),
);
const LandingPage = lazy(() => import('../modules/LandingPage/LandingPage'));
const Readme = lazy(() => import('../modules/Readme/Readme'));
export const AppRouter = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage errorMessage="Page not found" />,

        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LandingPage />
                    </Suspense>
                ),
            },
            {
                path: '/readme',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Readme />
                    </Suspense>
                ),
            },
            {
                path: '/home',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <DogList />
                    </Suspense>
                ),
            },
            {
                path: '/search',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <DogSearch />
                    </Suspense>
                ),
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <DogIntro />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':breedName*',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <DogDetails />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);
