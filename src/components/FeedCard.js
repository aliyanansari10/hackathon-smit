import React from "react";
import { Card, Button } from "react-bootstrap";

function FeedCard({ data, postImg }) {
  console.log("data", data);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Card style={{ width: "30rem", margin: "20px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div style={{ width: 300, height: 300 }}>
            <Card.Img variant="top" src={postImg} />
          </div>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {data?.postSubTitle}
            </Card.Subtitle>
            <Card.Text>{data.description}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default FeedCard;
