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
    path: "/student/home",
    icon: <DashboardIcon />,
  },
  {
    name: "Courses",
    path: "/student/courses",
    icon: <MenuBookIcon />,
  },
  {
    name: "Leaves",
    path: "/student/leaves",
    icon: <EventNoteIcon />,
  },
];
