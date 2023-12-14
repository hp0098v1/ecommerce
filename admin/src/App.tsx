import { ThemeProvider } from "./context/ThemeContext";
import Router from "./pages";

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
