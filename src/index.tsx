import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { woowahanTheme, darkTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={woowahanTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
