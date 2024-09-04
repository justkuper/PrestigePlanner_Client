import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import axios from 'axios';
import placeholder from "../assets/placeholder.png";
import { GET_ONE_EVENT } from "../utils/queries";
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  Alert,
  ButtonGroup,
  Stack,
  OverlayTrigger,
} from "react-bootstrap";
import { motion } from 'framer-motion';

const EventDetails = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    cost: 0,
    location: "",
    date: "",
    time: 0,
  });

  const [countDown, setCountDown] = useState();
  const [countDownFormat, setCountDownFormat] = useState({
    timeRemaining: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [imageSrc, setImageSrc] = useState(placeholder);
  const { eventId } = useParams();

  const { loading, error, data } = useQuery(GET_ONE_EVENT, {
    variables: { eventId: eventId },
  });

  useEffect(() => {
    if (!loading) {
      console.log(data);
      const timeStamp = parseInt(data.event.date);
      const date = new Date(timeStamp);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();
      setEventData({
        title: data.event.title,
        description: data.event.description,
        cost: data.event.cost,
        location: data.event.location,
        date: dateString,
        time: timeString,
      });
      setCountDown(timeStamp);
      const fetchImage = async (title) => {
        console.log(import.meta.env.VITE_OPENAI_API_KEY);
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
              prompt: title,
              n: 1,
              size: "512x512"
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
              }
            }
          );
          const imageData = response.data.data[0].url;
          setImageSrc(imageData);
        } catch (error) {
          console.error("Error generating image:", error);
          setImageSrc(placeholder);
        }
      };

      fetchImage(data.event.title);
    }
  }, [loading]);

  useEffect(() => {
    if (!countDown) return;

    const now = new Date().getTime();

    const intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    const timeDifference = countDown - now;

    if (timeDifference <= 0) {
      setCountDownFormat({
        timeRemaining: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        timeDifference / (1000 * 60 * 60) - daysLeft * 24
      );
      const minutesLeft = Math.floor(
        timeDifference / (1000 * 60) - (daysLeft * 24 * 60 + hoursLeft * 60)
      );
      const secondsLeft = Math.floor(
        timeDifference / 1000 -
          (daysLeft * 24 * 60 * 60 + hoursLeft * 60 * 60 + minutesLeft * 60)
      );

      setCountDownFormat({
        timeRemaining: timeDifference,
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    }

    return () => clearInterval(intervalId);
  }, [countDown]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: { 
      scale: 1.1, 
      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      backgroundColor: "#FF4500",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}
      >
        <Container
          fluid
          style={{
            height: "300px",
            background: "linear-gradient(to right, blue, pink)",
          }}
          className="text-center p-5 text-white"
        >
          {countDownFormat.timeRemaining > 0 ? (
            <h2 className="p-2">
              GET EXCITED! {eventData.title.toUpperCase()} COMING SOON!
            </h2>
          ) : (
            <>
              <h2 className="p-2">
                {eventData.title.toUpperCase()} HAS ALREADY PASSED!
              </h2>
              <a href="/allEvents" style={{ color: "white" }}>
                check out all events to see more
              </a>
            </>
          )}
          <Stack
            direction="horizontal"
            gap={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
              color: "white",
            }}
          >
            <Row className="justify-content-center">
              <Col className="text-center">
                <div>
                  <div>{countDownFormat.days}</div>
                  <div style={{ fontSize: "25px" }}>Days</div>
                </div>
              </Col>
              <Col className="text-center">
                <div>
                  <div>{countDownFormat.hours}</div>
                  <div style={{ fontSize: "25px" }}>Hours</div>
                </div>
              </Col>
              <Col className="text-center">
                <div>
                  <div>{countDownFormat.minutes}</div>
                  <div style={{ fontSize: "25px" }}>Minutes</div>
                </div>
              </Col>
              <Col className="text-center">
                <div>
                  <div>{countDownFormat.seconds}</div>
                  <div style={{ fontSize: "25px" }}>Seconds</div>
                </div>
              </Col>
            </Row>
          </Stack>
        </Container>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInVariants}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Container>
          <ButtonGroup className="w-100">
            <motion.button
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              style={{
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
                borderRadius: "5px",
                width: "20%",
                margin: "3%",
                border: "none",
                padding: "10px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Date: {eventData.date}
            </motion.button>

            <motion.button
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              style={{
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
                borderRadius: "5px",
                width: "20%",
                margin: "3%",
                border: "none",
                padding: "10px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Time: {eventData.time}
            </motion.button>

            <motion.button
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              style={{
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
                borderRadius: "5px",
                width: "20%",
                margin: "3%",
                border: "none",
                padding: "10px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Location: {eventData.location}
            </motion.button>

            <motion.button
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              style={{
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
                borderRadius: "5px",
                width: "20%",
                margin: "3%",
                border: "none",
                padding: "10px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Cost: ${eventData.cost}
            </motion.button>
          </ButtonGroup>

          <Container className="mb-5">
            <Row>
              <Col md={6}>
                <Card className="border-0 p-3">
                  <Card.Body>
                    <Card.Title>{eventData.title}</Card.Title>
                    <Card.Text>{eventData.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card.Img
                  variant="top"
                  className="border-0 p-3 h-100"
                  src={imageSrc}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </motion.div>
    </>
  );
};

export default EventDetails;
