import { useState, createContext, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { deepOrange, deepPurple, green, grey } from "@mui/material/colors";
import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comments from "./pages/Comments";
import Profile from "./pages/Profile";
import Likes from "./pages/Likes";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchVerify } from "./libs/fetcher";
import Search from "./pages/Search";
import Notis from "./pages/Notis";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export const AppContext = createContext();

// export const useApp = () => createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,

        //* load data using loader and fetch in child component using useLoaderData */

        // loader: async () => {
        //   const api = import.meta.env.VITE_API;
        //   const res = await fetch(`${api}/content/posts`);
        //   return res.json();
        // },
      },
      {
        path: "login",
        element: <Login />,
        children: [
          {
            path: "test",
            element: <h1>hello world</h1>,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "comments/:id",
        element: <Comments />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "/likes/:id/:type",
        element: <Likes />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/notis",
        element: <Notis />,
      },
    ],
  },
]);
export default function ThemedApp() {
  useEffect(() => {
    (async () => {
      const user = await fetchVerify();
      if (user) {
        setAuth(user);
      }
    })();
  }, []);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(null);
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepOrange,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: { fade: grey[500] },
      },
    });
  }, [mode]);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          mode,
          setMode,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
