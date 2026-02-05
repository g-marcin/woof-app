import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './router/AppRouter.tsx';
import {queryClient, QueryClientProvider} from './common/queryClient/queryClient.ts'


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={AppRouter} />
        </QueryClientProvider>
    );
}

export default App;
