import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Modal, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { ADD_COURSE, EDIT_COURSE } from "../../redux/types";
import CourseCard from "../../components/CourseCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.CourseReducer.courses);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [tutor, setTutor] = useState("");
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");

  const courseToggleHandler = async (id, val) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "Courses", id), {
        disabled: !val,
      });

      dispatch({
        type: EDIT_COURSE,
        payload: id,
      });
      setLoading(false);
    } catch (error) {
      console.log("err", error);
      alert("Something went wrong during update course");
      setLoading(false);
    }
  };

  const setClearState = () => {
    setDescription("");
    setTutor("");
    setDuration("");
    setTitle("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payloadData = {
      title,
      description,
      tutor,
      duration,
      disabled: false,
      Enrolled: [],
    };
    try {
      const docRef = await addDoc(collection(db, "Courses"), payloadData);

      let payload = {
        ...payloadData,
        id: docRef.id,
      };
      dispatch({
        type: ADD_COURSE,
        payload,
      });
      setLoading(false);
      setClearState();
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log("Something went wrong while adding courses");
    }
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Button
        // className="m-3"
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Course
      </Button>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitForm}>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Course Tutor</Form.Label>
              <Form.Control
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Course Tutor"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Course Duration</Form.Label>
              <Form.Control
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Course Duration"
              />
            </Form.Group>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              disabled={
                loading ||
                !title.trim().length ||
                !duration.trim().length ||
                !description.trim().length ||
                !tutor.trim().length
              }
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {courses?.length &&
        courses?.map((course) => (
          <CourseCard
            course={course}
            courseToggle={courseToggleHandler}
            loading={loading}
          />
        ))}
    </div>
  );
}
