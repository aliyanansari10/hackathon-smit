// import { setLogLevel } from "firebase/app";
// import React, { useState } from "react";
// import { Button, Form, Card } from "react-bootstrap";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { db, auth } from "../Firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { ADMIN_SIGNIN } from "../redux/types";

// import { useNavigate } from "react-router-dom";

// function AdminSignin() {
//   const emailFilter =
//     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const q = query(
//       collection(db, "admin"),
//       where("email", "==", email)
//     );
//     console.log("Q : ", q);
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot?.docs?.length === 0) {
//       setLoading(false);
//       alert("No Admin found with this email");
//     } else {
//       console.log("Sign In method call");
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           setLoading(false);
//           const user = userCredential.user;
//           // ...
//           dispatch({
//             type: ADMIN_SIGNIN,
//             payload: user.uid,
//           });
//           navigate("/admin/home");
//         })
//         .catch((error) => {
//           setLoading(false);
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           alert("Unable to signin");
//         });
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Card style={{ width: "50rem", padding: "30px" }}>
//         <Form onSubmit={onSubmitForm}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter email"
//             />
//             <Form.Text className="text-muted">
//               We'll never share your email with anyone else.
//             </Form.Text>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="submit"
//             disabled={
//               loading ||
//               email.trim().length === 0 ||
//               !emailFilter.test(email) ||
//               password.trim().length === 0
//             }
//           >
//             {loading ? "...." : "Submit"}
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// }

// export default AdminSignin;

import React, { useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { setLogLevel } from "firebase/app";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { ADMIN_SIGNIN } from "../../redux/types";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function AdminSignin() {
  const emailFilter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const q = query(collection(db, "admin"), where("email", "==", email));
    let userData;
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs?.length === 0) {
      setLoading(false);
      alert("No Admin found with this email");
    } else {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        userData = doc.data();
      });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          console.log("User Data: ", userData);
          setLoading(false);
          const user = userCredential.user;
          // ...
          dispatch({
            type: ADMIN_SIGNIN,
            payload: {
              uid: user.uid,
              userName: userData.name,
            },
          });
          navigate("/admin/home");
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
          {" "}
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
              Admin Portal
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign in
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ width: "100%", textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, pr: 3, pl: 3, textAlign: "right" }}
                  disabled={
                    loading ||
                    email.trim().length === 0 ||
                    !emailFilter.test(email) ||
                    password.trim().length === 0
                  }
                >
                  {loading ? (
                    <CircularProgress color="secondary" size={26} />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
