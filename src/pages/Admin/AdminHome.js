import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Box } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AdminHome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user.uid === null || !user?.isLoggedIn || !user?.admin) {
      navigate("/admin/signin");
    }
  }, [user]);

  return (
    <div style={{ marginTop: 80 }}>
      {/* <Box>
        
        
      </Box> */}
      <Card sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent>
          <h1>Welcome To Student Management System</h1>
          <h3>Where The Actual Study Begins</h3>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be-nevo-lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminHome;
