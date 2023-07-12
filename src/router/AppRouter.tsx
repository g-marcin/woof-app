import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components';
import { DogList } from '../modules/DogList/DogList';
import { ErrorPage } from './ErrorPage';



export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage errorMessage="Page not found" />,children:[
      {path:"/home", element:<DogList/>}
    ]
  },
]);
