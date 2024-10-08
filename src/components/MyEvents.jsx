import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import calendar from "../assets/calendar.jpg";
import { DELETE_EVENT } from "../utils/mutations";
import { GET_ONE_USER } from "../utils/queries";
import Auth from "../utils/auth";

const MyEvents = () => {
  const userToken = Auth.getProfile();
  const userId = userToken.data._id;
  const [hover, setHover] = useState(null);
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_ONE_USER, variables: { userId: userId } }],
  });

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});

  const onHover = (eventId) => {
    setHover(eventId);
  };

  const onLeave = () => {
    setHover(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToGoogleCalendar = (event) => {
    const startDateTime = new Date(parseInt(event.date)).toISOString();
    const endDateTime = new Date(parseInt(event.date) + 3600000).toISOString(); // Assuming the event is 1 hour long

    const gCalUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&dates=${startDateTime.replace(/-|:|\.\d+/g, '')}/${endDateTime.replace(
      /-|:|\.\d+/g, ''
    )}&ctz=America/Los_Angeles`;

    window.open(gCalUrl, "_blank");
  };

  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { userId: userId },
  });

  if (error) console.log(error.message);

  const eventHoverStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "40%",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const gradientBackgroundStyle = {
    background: "linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)",
    minHeight: "137vh", // Ensure it covers the full viewport height
    padding: "20px", // Optional padding for spacing
    backgroundAttachment: "fixed", // Keeps the background fixed when scrolling
  };

  useEffect(() => {
    setUser(data?.user || {});
    setEvents(data?.user?.events || {});
  }, [data]);

  if (!loading) {
    return (
      <>
        <div style={gradientBackgroundStyle}>
          <Container className="center">
            <div className="mx-auto p-5">
              <h3
                style={{
                  fontFamily: "cursive",
                  fontWeight: "bold",
                  fontSize: "xxx-large",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  color: "#333",
                }}
              >
                Welcome {user?.username}!
              </h3>
              <div>
                {events.length > 0 ? (
                  <>
                    <h4
                      style={{
                        fontFamily: "Cursive",
                        fontWeight: "bold",
                        fontSize: "1.75rem",
                        color: "#444",
                        marginTop: "2rem",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                      className="mt-5"
                    >
                      Here are your Events:
                    </h4>
                    <p
                      style={{
                        fontFamily: "Cursive",
                        fontSize: "1.25rem",
                        color: "#555",
                        marginTop: "0.5rem",
                        lineHeight: "1.6",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      To edit or delete events, hover over the image
                    </p>
                    <Container>
                      <Row xs={1} md={2} lg={3} className="g-4">
                        {events.map((event) => (
                          <Col key={event.id}>
                            <Card
                              onMouseEnter={() => onHover(event.id)}
                              onMouseLeave={() => onLeave(null)}
                              style={{
                                width: "18rem",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                transform: hover === event.id ? "scale(1.05)" : "scale(1)",
                                boxShadow: hover === event.id ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "none",
                              }}
                            >
                              {parseInt(event.date) > new Date().getTime() ? (
                                <img
                                  src={calendar}
                                  alt={event.title}
                                  className="card-img-top"
                                />
                              ) : (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={calendar}
                                    alt={event.title}
                                    className="card-img-top"
                                    style={{ filter: "brightness(25%)" }}
                                  />
                                  <p
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      zIndex: 1,
                                      color: "white",
                                    }}
                                  >
                                    This Event is over
                                  </p>
                                </div>
                              )}
                              {hover === event.id && (
                                <div style={eventHoverStyle}>
                                  <Button
                                    variant="link"
                                    as={Link}
                                    to={`/updateEvent/${event.id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      size="2x"
                                    />
                                  </Button>
                                  <Button
                                    variant="link"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      size="2x"
                                    />
                                  </Button>
                                </div>
                              )}
                              <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Text>{event.description}</Card.Text>
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <Button
                                    as={Link}
                                    to={`/eventDetails/${event.id}`}
                                    variant="primary"
                                    style={{
                                      backgroundColor: "orange",
                                      color: "white",
                                      borderColor: "orange",
                                    }}
                                  >
                                    More Details
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    style={{
                                      backgroundColor: "orange",
                                      color: "white",
                                      borderColor: "orange",
                                    }}
                                    onClick={() => handleAddToGoogleCalendar(event)}
                                  >
                                    Add to Google Calendar
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </>
                ) : (
                  <div className="my-5">
                    <h3>You have no events</h3>
                    <h4 className="mt-5">You haven't made any reservations yet!</h4>
                    <p>
                      To make a reservation, click the + icon on the bottom right
                    </p>
                  </div>
                )}
              </div>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Make a new reservation!</Tooltip>
                }
              >
                <Button
                  as={Link}
                  to="/createEvent"
                  variant="primary"
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "100px",
                    width: "50px",
                    height: "50px",
                    backgroundColor: "black", // Change the icon button color to black
                    borderColor: "black", // Ensure border matches the background color
                  }}
                  key="addEventBtn"
                  onMouseEnter={() => onHover("addEventBtn")}
                  onMouseLeave={() => onLeave(null)}
                >
                  <FontAwesomeIcon icon={faPlus} size="2x" color="white" /> {/* Change the icon color to white */}
                </Button>
              </OverlayTrigger>
            </div>
          </Container>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MyEvents;
