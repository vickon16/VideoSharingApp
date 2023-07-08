import React, { useEffect} from "react";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "./utils/Theme";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Nprogress from "nprogress";
import AuthPage from "./pages/AuthPage";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import SearchPage from "./pages/SearchPage";

function App() {
  const darkMode = useSelector(state => state.app.darkMode)
  const location = useLocation();

  Nprogress.configure({showSpinner : false, easing: 'ease', speed: 500});

  useEffect(() => {
    Nprogress.done();

    return () => Nprogress.start();
  }, [location.pathname]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Protected><Home /></Protected>} />
          <Route path="signin" element={<AuthPage />} />

          <Route path="videos/*">
            <Route index element={<Protected><Home /></Protected>} />
            <Route path=":id" element={<Protected><Video /></Protected>} />
          </Route>

          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route path="/*" element={<h1 className="text-center text-2xl mt-10 uppercase">Page not found</h1>} />
      </Routes>

    </ThemeProvider>
  );
}

export default App;



