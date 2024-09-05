import { useApp } from "../useApp";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Menu as MenuIcon,
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close,
  Notifications,
} from "@mui/icons-material";
// import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchNotis } from "../libs/fetcher";
export default function Header() {
  const { showForm, setShowForm, mode, setMode, setShowDrawer, auth } =
    useApp();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery(["notis", auth], fetchNotis);
  function notiCount() {
    if (!auth) return 0;
    if (isLoading || isError) return 0;
    return data.filter((noti) => !noti.read).length;
  }
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setShowDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>
        <Box>
          {auth && isHome && showForm === false && (
            <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
              <AddIcon />
            </IconButton>
          )}
          {showForm === true && isHome && (
            <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
              <Close />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={() => navigate("/notis")}>
            <Badge color="error" badgeContent={notiCount()}>
              <Notifications />
            </Badge>
          </IconButton>
          {/* <IconButton color="inherit" edge="end">
            <LightModeIcon />
          </IconButton> */}
          {mode === "dark" ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("light")}
            >
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("dark")}
            >
              <DarkModeIcon />
            </IconButton>
          )}
        </Box>
        <IconButton
          sx={{ ml: 1 }}
          color="inherit"
          onClick={() => navigate("/search")}
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
