import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { persistor, store } from "./store/store.ts";
import { stripePromise } from "./utils/stripe/stripe.utils";

import App from "./App";

import { GlobalStyle } from "./global.styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {process.env.REACT_APP_IS_GITHUB_PAGES === "true" ? (
          <HashRouter>
            <Elements stripe={stripePromise}>
              <GlobalStyle />
              <App />
            </Elements>
          </HashRouter>
        ) : (
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Elements stripe={stripePromise}>
              <GlobalStyle />
              <App />
            </Elements>
          </BrowserRouter>
        )}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
