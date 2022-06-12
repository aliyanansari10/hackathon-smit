import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function CourseCard({ course, courseToggle, loading }) {
  console.log("course", course);
  return (
    <Card style={{ width: "50rem", margin: "20px 0" }}>
      {course?.disabled && (
        <span style={{ color: "red", margin: "10px" }}>Admission Closed</span>
      )}
      <div>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            <span style={{ fontWeight: "bold" }}>Tutor: </span> {course?.tutor}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <span style={{ fontWeight: "bold" }}>Duration: </span>{" "}
            {course?.duration}
          </Card.Subtitle>
        </Card.Body>
      </div>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          // style={{
          //   width: "50%",
          //   marginRight: "auto",
          //   marginBottom: "10px",
          //   marginLeft: "10px",
          // }}
          // fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, mr: 5 }}
          onClick={() => courseToggle(course?.id, course?.disabled)}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : course?.disabled ? (
            "Open Admission"
          ) : (
            "Close Addmission"
          )}
        </Button>
      </div>
    </Card>
  );
}

export default CourseCard;
