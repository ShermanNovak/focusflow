import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PanelContextProvider } from "./context/PanelContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <PanelContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </PanelContextProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
