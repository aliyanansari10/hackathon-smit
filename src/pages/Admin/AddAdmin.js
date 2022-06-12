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
import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { ADD_ADMIN } from "../../redux/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

export default function AddAdmin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer?.uid);
  const adminsArr = useSelector((state) => state.AdminReducer.admins);

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailFilter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      setLoading(true);
      try {
        const fullName = firstName + " " + lastName;
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "admin", user?.uid), {
              name: fullName,
              email,
            });

            dispatch({
              type: ADD_ADMIN,
              payload: {
                name: fullName,
                email,
                id: user?.uid,
              },
            });
            setLoading(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            alert("New Admin has been Added");
          })
          .catch((error) => {
            console.log("error", error);
            alert("Something went wrong while adding admin");
            setLoading(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
          });
      } catch (error) {
        console.log("error", error);
        alert("Something went wrong while adding admin");
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } else {
      alert("Please Fill All Fields");
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
              Add New Admin
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
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
              >
                {loading ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  "Add Admin"
                )}
              </Button>
            </Box>
          </Box>
          <Box>
            {/* {adminsArr && adminsArr?.length && (
              <div style={{ width: "60rem", margin: "40px auto" }}>
                <table
                // striped bordered hover
                >
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>UID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminsArr.map((admin) => {
                      if (admin?.id !== user) {
                        console.log("user", user);
                        return (
                          <tr>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.id}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )} */}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
