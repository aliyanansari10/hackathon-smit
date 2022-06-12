import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_SIGNOUT } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminSettings() {
  const theme = createTheme();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userUid = useSelector((state) => state?.AuthReducer?.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setLoading(true);
        try {
          const user = auth.currentUser;
          updatePassword(user, password)
            .then((res) => {
              console.log("res", res);
              alert("Password successfully updated!");
              signOut(auth).then(() => {
                dispatch({
                  type: ADMIN_SIGNOUT,
                  payload: {
                    uid: null,
                    userName: "",
                  },
                });
                navigate("/admin/signin");
              });
              setLoading(false);
            })
            .catch((e) => {
              console.log("e", e);
              setLoading(false);
              alert("Something went wrong while changing password");
            });
        } catch (error) {
          console.log("error", error);
          alert("Something went wrong while changing password");
          setLoading(false);
        }
      } else {
        alert("Password does not match!");
      }
    } else {
      alert("Please Fill All Fields!");
    }
  };
  return (
    <div style={{ marginTop: 100 }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "Change Password"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
