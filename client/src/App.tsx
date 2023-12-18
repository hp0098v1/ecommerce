import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Root from "./pages/root";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  );
};

export default App;
