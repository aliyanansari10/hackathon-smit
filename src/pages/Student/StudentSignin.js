import React, { useState } from "react";
import { setLogLevel } from "firebase/app";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Card } from "react-bootstrap";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { STUDENT_SIGNIN } from "../../redux/types";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

function StudentSignin() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const q = query(
      collection(db, "StudentAccounts"),
      where("code", "==", code)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs?.length === 0) {
      setLoading(false);
      alert("No Students found with this code");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
          // ...
          dispatch({
            type: STUDENT_SIGNIN,
            payload: user.uid,
          });
          navigate("/student/home");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Unable to signin");
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                // my: 8,
                // mx: 4,
                width: "55vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  color: "#fff",
                  fontWeight: "600",
                  WebkitTextStroke: "1px #000",
                  textShadow: "5px 5px 6px #000",
                }}
              >
                Student Portal
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Student Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={onSubmitForm}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Student Code"
                  name="code"
                  autoComplete="code"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  helperText={"Your Code will be provided by administration"}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? (
                    <CircularProgress color="secondary" size={26} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default StudentSignin;
