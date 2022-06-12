import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SettingsIcon from "@mui/icons-material/Settings";

// const ListItems = () => {

export const mainListItems = [
  {
    name: "Home",
    path: "/admin/home",
    icon: <DashboardIcon />,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: <MenuBookIcon />,
  },
  {
    name: "Leaves",
    path: "/admin/leaves",
    icon: <EventNoteIcon />,
  },
  {
    name: "Add Students",
    path: "/admin/addstudents",
    icon: <GroupAddIcon />,
  },
  {
    name: "Add Admin",
    path: "/admin/addadmin",
    icon: <PersonAddAltRoundedIcon />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <SettingsIcon />,
  },
];
// (
//   <React.Fragment>
//     <ListItemButton
//       onClick={() => {
//         console.log("Dashboard Button Called");
//         navigate("/admin/home");
//       }}
//     >
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         console.log("Courses Button Clicked");
//         navigate("/admin/courses");
//       }}
//     >
//       <ListItemIcon>
//         <MenuBookIcon />
//       </ListItemIcon>
//       <ListItemText primary="Courses" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         console.log("Leaves Button Clicked");
//         navigate("/admin/leaves");
//       }}
//     >
//       <ListItemIcon>
//         <EventNoteIcon />
//       </ListItemIcon>
//       <ListItemText primary="Leaves" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         console.log("Add Student Button Clicked");
//         navigate("/admin/addstudents");
//       }}
//     >
//       <ListItemIcon>
//         <GroupAddIcon />
//       </ListItemIcon>
//       <ListItemText primary="Add Students" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         console.log("Add Admin Button Clicked");
//         navigate("/admin/addadmin");
//       }}
//     >
//       <ListItemIcon>
//         <PersonAddAltRoundedIcon />
//       </ListItemIcon>
//       <ListItemText primary="Add Admin" />
//     </ListItemButton>
//     <ListItemButton
//       onClick={() => {
//         console.log("Settings Button Clicked");
//         navigate("/admin/settings");
//       }}
//     >
//       <ListItemIcon>
//         <SettingsIcon />
//       </ListItemIcon>
//       <ListItemText primary="Settings" />
//     </ListItemButton>
//   </React.Fragment>
// );
// };

// export mainListItems ;
