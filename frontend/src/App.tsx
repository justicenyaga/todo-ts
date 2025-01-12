import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Dashboard } from "./pages/dashboard/dashboard";
import { customTheme } from "./theme/customTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ComposeContext from "./context/Compose.context";
import { rootContext } from "./context/root.context";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ComposeContext>
    </QueryClientProvider>
  );
};

export default App;
