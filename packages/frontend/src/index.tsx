import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Auth0Provider } from "@auth0/auth0-react";
import { PanelContextProvider } from "./context/PanelContext";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <PanelContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Auth0Provider
                  domain="dev-tzqbbnp2zwignnsi.us.auth0.com"
                  clientId="pNVvOCRs7ONdT6mMJ4ZbPXaqO3V1oEhB"
                  authorizationParams={{
                    redirect_uri: window.location.origin
                  }}
                >
                <App />
              </Auth0Provider>,
            <ReactQueryDevtools />
          </BrowserRouter>
        </QueryClientProvider>
      </PanelContextProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
