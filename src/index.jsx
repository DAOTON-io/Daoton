import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, suspense: true } },
});

const TonProofDemoApi = {
  connectWalletRequest: {
    permissions: [
      {
        name: "https://demo.tonconnect.dev",
        params: {
          message: "Hello, TonConnect!",
        },
      },
    ],
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <TonConnectUIProvider
    manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
    getConnectParameters={() => TonProofDemoApi.connectWalletRequest}
    uiPreferences={{ theme: THEME.DARK }}
  >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>
);
