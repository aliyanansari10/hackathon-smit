import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CircularProgress from "@mui/material/CircularProgress";
import { mainListItems } from "./listItems";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { ADMIN_SIGNOUT } from "../../redux/types";
import "./StudentDashboard.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function AdminDashboard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = (props) => {
    if (!logoutLoading) {
      setLogoutLoading(true);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Signout Successful");
          dispatch({
            type: ADMIN_SIGNOUT,
            payload: {
              uid: null,
              userName: "",
            },
          });
          navigate("/");
          setLogoutLoading(false);
        })
        .catch((error) => {
          // An error happened.
          alert("Unable To Logout");
          setLogoutLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user.isLoggedIn === false) {
      navigate("/");
    }
  }, []);

  // console.log("User in Admin Home: ", user);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge
                badgeContent={"Student"}
                color="secondary"
                style={{ marginRight: 5, marginBottom: 5 }}
              >
                <SupervisedUserCircleRoundedIcon />
              </Badge>
              <Typography>{user?.userName}</Typography>
            </IconButton>
            <div style={{ width: "100%", textAlign: "right" }}>
              <IconButton
                color="inherit"
                disabled={logoutLoading}
                onClick={handleLogout}
              >
                {logoutLoading ? (
                  <CircularProgress sx={{ color: "#fff" }} size={18} />
                ) : (
                  <PowerSettingsNewIcon />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
            }}
          >
            <Typography
              style={{
                marginLeft: 20,
                fontWeight: "bold",
                // fontStyle: "italic",
              }}
            >
              Student Dashboard
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* ----------- Navigation Side Bar ------------- */}
          <List component="nav">
            {mainListItems.map((route, index) => (
              <ListItemButton
                onClick={() => {
                  navigate(route.path);
                }}
                key={route.name}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
          {/* <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default function  {
//   return <DashboardContent component={props.children} />;
// }
