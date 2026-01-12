import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout';
import { Loader } from '../components';
import { Start } from '../modules/Start';
import { ErrorPage } from './ErrorPage';
const Listing = lazy(() => import('../modules/Listing'));
const Search = lazy(() => import('../modules/DogSearch/Search'));
const Readme = lazy(() => import('../modules/Readme'));
const DogDetails = lazy(
    () => import('../modules/DogDetails/DogMain'),
);
const DogIntro = lazy(() => import('../modules/DogDetails/DogIntro/DogIntro'));

const RandomDogImage = lazy(
    () => import('../modules/DogSearch/RandomDogImage/RandomDogImage'),
);
export const AppRouter = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Start />,
            },
            {
                path: '/readme',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Readme/>
                    </Suspense>
                ),
            },
            {
                path: '/listing',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Listing />
                    </Suspense>
                ),
            },
            {
                path: '/search',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Search />
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
                    {
                        path: ':breedName/:variant/random',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <RandomDogImage />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':breedName/random',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <RandomDogImage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '/random',
                element: (
                    <Suspense fallback={<Loader />}>
                        <RandomDogImage />
                    </Suspense>
                ),
            },
        ],
    },
]);
