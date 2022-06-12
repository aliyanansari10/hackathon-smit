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
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

function StudentSignUp() {
  const theme = createTheme();
  let navigate = useNavigate();
  const emailFilter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (emailFilter.test(email)) {
      try {
        const q = query(
          collection(db, "registeredStudents"),
          where("code", "==", code)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot?.docs?.length === 0) {
          setLoading(false);
          alert("No Student with this code found");
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              // ...Add In DB
              try {
                await setDoc(doc(db, "StudentAccounts", user?.uid), {
                  code,
                  name,
                  email,
                });
                alert("Student Signup Successfull");
                navigate("/student/signin");
                setLoading(false);
              } catch (error) {
                alert("Something went wrong while registeration");
                setLoading(false);
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              console.log("errorMessage", errorMessage);
              alert(errorMessage);
              setLoading(false);
            });
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("Invalid Email Format");
    }
  };

  return (
    <>
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
              Student Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitForm}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    id="fillName"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="studentCode"
                    label="Student Code"
                    name="studentCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoComplete="family-name"
                    helperText={"Your Code will be provided by administration"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  email.trim().length === 0 ||
                  password.trim().length < 8 ||
                  code.trim().length === 0 ||
                  name.trim().length === 0
                }
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default StudentSignUp;
