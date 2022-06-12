import React, { useEffect } from "react";
import { db } from "./Firebase";
import { Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Feed from "./pages/Feed";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_FEEDS, GET_COURSES } from "./redux/types";
import NavbarComponent from "./components/NavbarComponent";
import StudentSignin from "./pages/Student/StudentSignin";
import StudentSignUp from "./pages/Student/StudentSignUp";
import StudentHome from "./pages/Student/StudentHome";
import AdminSignin from "./pages/Admin/AdminSignin";
import AdminHome from "./pages/Admin/AdminHome";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddAdmin from "./pages/Admin/AddAdmin";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminLeaves from "./pages/Admin/AdminLeaves";
import AddStudents from "./pages/Admin/AddStudents";
import AdminSettings from "./pages/Admin/AdminSettings";

function App() {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state?.FeedReducer?.feeds);

  const getData = async () => {
    const feedExist = await getDocs(collection(db, "feeds"));
    let feedsArr = [];
    if (!!feedExist?.docs.length) {
      feedExist.docs.forEach((feed) => {
        feedsArr.push({ ...feed.data(), id: feed.id });
      });

      dispatch({
        type: GET_FEEDS,
        payload: feedsArr,
      });
    }
  };

  const getCourses = async () => {
    const courses = await getDocs(collection(db, "Courses"));
    let coursesArr = [];
    if (!!courses?.docs.length) {
      courses.docs.forEach((course) => {
        console.log("course", course);
        coursesArr.push({ ...course.data(), id: course.id, Enrolled: [] });
      });

      dispatch({
        type: GET_COURSES,
        payload: coursesArr,
      });
    }
  };

  useEffect(() => {
    getData();
    getCourses();
    console.log("Use Effect Functions Called");
  }, []);

  return (
    <div>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComponent />
              <Feed feedsData={feeds} />
            </>
          }
        />
        <Route path="/student/signin" element={<StudentSignin />} />
        <Route path="/student/signup" element={<StudentSignUp />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/admin/signin" element={<AdminSignin />} />
        {/* <Route path="/admin/home" element={<AdminHome />} /> */}
        <Route
          path="/admin/home"
          element={
            <AdminDashboard>
              <AdminHome />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminDashboard>
              <AdminCourses />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/leaves"
          element={
            <AdminDashboard>
              <AdminLeaves />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/addstudents"
          element={
            <AdminDashboard>
              <AddStudents />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/addadmin"
          element={
            <AdminDashboard>
              <AddAdmin />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminDashboard>
              <AdminSettings />
            </AdminDashboard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
