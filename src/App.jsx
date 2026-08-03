import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/rootRoute';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree: rootRoute,
  context: {
    queryClient,
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App