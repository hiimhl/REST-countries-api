import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global-style";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./atom";
import Router from "./routes/Router";

function App() {
  const theme = useRecoilValue(themeAtom);
  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
