import "./App.css";

import { LogtoConfig, LogtoProvider } from "@logto/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router.tsx";

const config: LogtoConfig = {
  endpoint: "https://auth.kylobyte.dev/",
  appId: "c95zcb1fldtqjonnq33pm",
  resources: ["https://api.taskmanager.kylobyte.dev/"],
};

const queryClient = new QueryClient();

function App() {
  return (
    <LogtoProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </LogtoProvider>
  );
}

export default App;
