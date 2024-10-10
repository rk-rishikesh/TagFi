import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
// Wallet Integration Imports

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { State, WagmiProvider } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//  Chain Configuration

const projectId = `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`;

const config = getDefaultConfig({
  appName: "TagFi",
  projectId: projectId,
  chains: [filecoinCalibration],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// Setup queryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
