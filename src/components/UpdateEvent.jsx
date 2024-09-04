import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_EVENT } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import { Container, Col, Form, Button, Row, Alert } from "react-bootstrap";
import Calculator from "./Calculator"; // Import the Calculator component
import { FaCalculator } from 'react-icons/fa'; // Import the calculator icon from react-icons
import { motion } from "framer-motion"; // Import Framer Motion components

const UpdateEvent = () => {
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const { eventId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [eventInput, setEventInput] = useState({
    title: "",
    description: "",
    cost: 0,
    location: "",
    date: "",
  });

  const [showCalculator, setShowCalculator] = useState(false); // State to manage calculator visibility

  const { loading, error, data } = useQuery(GET_ONE_EVENT, {
    variables: { eventId: eventId },
  });

  useEffect(() => {
    if (!loading) {
      setEventInput({
        title: data.event.title,
        description: data.event.description,
        cost: data.event.cost,
        location: data.event.location,
        date: data.event.date,
      });
    }
  }, [loading]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const update = await updateEvent({
        variables: {
          updateEventId: eventId,
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
        },
      });

      if (!update) {
        setShowAlert(true);
        setAlertStatus("danger");
        throw new Error("Something went wrong!");
      } else {
        setShowAlert(true);
        setAlertStatus("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showAlert &&
        (alertStatus === "success" ? (
          <Alert variant="success" className="m-0">
            <Alert.Heading style={{ fontFamily: 'Cursive', fontSize: '24px' }} className="text-center">
              Your Event has been successfully updated!
            </Alert.Heading>
            <div className="d-flex justify-content-center">
              <Button
                as={Link}
                to={`/eventDetails/${eventId}`}
                variant="outline-success"
                style={{ fontFamily: 'Cursive', fontSize: '18px' }}
              >
                View Your Event
              </Button>
            </div>
          </Alert>
        ) : (
          <Alert variant="danger" className="m-0">
            <Alert.Heading style={{ fontFamily: 'Cursive', fontSize: '24px' }} className="text-center">
              Something went wrong with the update!
            </Alert.Heading>
            <div className="d-flex justify-content-center">
              <Button as={Link} to="/myEvents" variant="outline-danger" style={{ fontFamily: 'Cursive', fontSize: '18px' }}>
                Go back to My Reservations
              </Button>
            </div>
          </Alert>
        ))}
      <div style={{ background: 'linear-gradient(to top right,  #a0fa0698 0%, skyblue 50%,#030d0f47 100%)', padding: '5%' }}>
        <Container>
          <h1 style={{ fontFamily: 'Cursive', color: '#333', fontWeight: 'bolder',textShadow: '0 0 10px rgba(255, 105, 180, 0.8), 0 0 20px rgba(255, 105, 180, 0.6)' }}>Edit Your Event:</h1>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ flex: '1' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col xs={12} md={12}>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="mb-3"
                      >
                        <Form.Group>
                          <Form.Label style={{ fontFamily: 'Cursive', fontSize: '24px' }}>Title:</Form.Label>
                          <Form.Control
                            name="title"
                            value={eventInput.title}
                            onChange={(e) => {
                              setEventInput({
                                ...eventInput,
                                title: e.target.value,
                              });
                            }}
                            type="text"
                            placeholder={eventInput.title}
                            required
                            style={{ fontFamily: 'Cursive', fontSize: '21px' }} 
                          />
                        </Form.Group>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="mb-3"
                      >
                        <Form.Group>
                          <Form.Label style={{ fontFamily: 'Cursive', fontSize: '24px' }}>Description:</Form.Label>
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
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            required
                            style={{ fontFamily: 'Cursive', fontSize: '21px' }}
                          />
                        </Form.Group>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        className="mb-3"
                      >
                        <Form.Group>
                          <Form.Label style={{ fontFamily: 'Cursive', fontSize: '24px' }}>
                            Cost: 
                            <FaCalculator
                              style={{ cursor: 'pointer', marginLeft: '8px', color: 'blue' }}
                              onClick={() => setShowCalculator(!showCalculator)}
                            />
                          </Form.Label>
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
                            placeholder="Reservation Cost"
                            step="0.01"
                            min="0"
                            required
                            style={{ fontFamily: 'Cursive', fontSize: '21px' }}
                          />
                        </Form.Group>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                        className="mb-3"
                      >
                        <Form.Group>
                          <Form.Label style={{ fontFamily: 'Cursive', fontSize: '24px' }}>Location:</Form.Label>
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
                            placeholder=" Location"
                            required
                            style={{ fontFamily: 'Cursive', fontSize: '21px' }}
                          />
                        </Form.Group>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                        className="mb-3"
                      >
                        <Form.Group>
                          <Form.Label style={{ fontFamily: 'Cursive', fontSize: '24px' }}>Date:</Form.Label>
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
                            placeholder="Event Date"
                            required
                            style={{ fontFamily: 'Cursive', fontSize: '21px' }}
                          />
                        </Form.Group>
                      </motion.div>

                      <Button variant="success" type="submit" size="lg" style={{ fontFamily: 'Cursive', fontSize: '24px' }}>
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            </div>
            {showCalculator && (
              <motion.div
                initial={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ flex: '0 0 300px', marginLeft: '20px' }}
              >
                <Calculator />
              </motion.div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default UpdateEvent;
