import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../utils/mutations";
import { Container, Col, Form, Button, Row, OverlayTrigger, Popover } from "react-bootstrap";
import Auth from "../utils/auth";
import Calculator from "./Calculator"; // Import the Calculator component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'; // Import Framer Motion

const CreateEvent = () => {
  const [createEvent, { error }] = useMutation(CREATE_EVENT);
  const [eventInput, setEventInput] = useState({
    title: "",
    description: "",
    cost: "",
    location: "",
    date: "",
  });
  const userToken = Auth.getProfile();
  const userId = userToken.data._id;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createEvent({
        variables: {
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
          userId: userId,
        },
      });
      setEventInput({
        title: "",
        description: "",
        cost: "",
        location: "",
        date: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      style={{
        background: "linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)",
        color: "#fff",
        padding: "5rem",
        minHeight: "137vh",
        overflow: "hidden" // Ensures the animation stays within bounds
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.0, type: "spring", damping: 10 }}
    >
      <Container>
        <motion.h1
          style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 'bolder', textShadow: '2px 2px 5px blue' }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          Create Event
        </motion.h1>
        <Form onSubmit={handleFormSubmit} style={{ fontFamily: "'Dancing Script', cursive" }}>
          <Row>
            <Col xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.2 }}
                style={{ marginBottom: "1rem" }}
              >
                <Form.Control
                  name="title"
                  value={eventInput.title}
                  onChange={(e) =>
                    setEventInput({ ...eventInput, title: e.target.value })
                  }
                  type="text"
                  size="lg"
                  placeholder="Event Name"
                  required
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ marginBottom: "1rem" }}
              >
                <Form.Control
                  name="description"
                  value={eventInput.description}
                  onChange={(e) =>
                    setEventInput({
                      ...eventInput,
                      description: e.target.value,
                    })
                  }
                  type="text"
                  size="lg"
                  placeholder="Event Description"
                  required
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ position: 'relative', marginBottom: "1rem" }}
              >
                <Form.Control
                  name="cost"
                  value={eventInput.cost}
                  onChange={(e) =>
                    setEventInput({
                      ...eventInput,
                      cost: e.target.value,
                    })
                  }
                  type="number"
                  size="lg"
                  placeholder="Event Cost"
                  step="0.01"
                  min="0"
                  required
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                />
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={
                    <Popover id="calculator-popover">
                      <Popover.Header as="h3">Calculator</Popover.Header>
                      <Popover.Body>
                        <Calculator />
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button
                    variant="secondary"
                    style={{
                      position: 'absolute',
                      right: '5px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#5151E5',
                      border: 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faCalculator} />
                  </Button>
                </OverlayTrigger>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ marginBottom: "1rem" }}
              >
                <Form.Control
                  name="location"
                  value={eventInput.location}
                  onChange={(e) =>
                    setEventInput({
                      ...eventInput,
                      location: e.target.value,
                    })
                  }
                  type="text"
                  size="lg"
                  placeholder="Event Location"
                  required
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0 }}
                style={{ marginBottom: "1rem" }}
              >
                <Form.Control
                  name="date"
                  value={eventInput.date}
                  onChange={(e) =>
                    setEventInput({
                      ...eventInput,
                      date: e.target.value,
                    })
                  }
                  type="datetime-local"
                  size="lg"
                  placeholder="Event Date"
                  required
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  style={{
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    borderRadius: "10px",
                    padding: "0.75rem 1.25rem",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '10px 10px 10px orange'
                  }}
                >
                  Create Event
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </Container>
    </motion.div>
  );
};

export default CreateEvent;
