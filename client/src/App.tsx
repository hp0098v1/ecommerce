import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Root from "./pages/root";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 60 sec
      gcTime: 1000 * 60 * 10, // 10 min
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
