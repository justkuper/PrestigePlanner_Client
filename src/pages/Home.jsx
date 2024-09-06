import React from "react";

import { motion } from "framer-motion";
import Contact from "../components/Contact";
import "../index.css";
import eventImage from "../assets/event.jpg";

function Donation() {
  
  return (
    <motion.div
      className="donation-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="donation-heading">Donation</h2>
      <p>
        If you'd like to support our work, you can donate using the button below:
      </p>
      <button className="donation-button" >Donate</button>
    </motion.div>
  );
}

const Home = () => {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="home-title"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome!
      </motion.h1>
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <p>
          We're glad to see you again. With our platform, managing your events
          has never been easier. You can view all of your upcoming events and
          make any necessary changes with just a few clicks. Thank you for
          choosing our PrestigePlanner. We're confident that our platform will
          make your planning experience a seamless one.
        </p>
      </motion.div>
      <motion.div
        className="container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Contact />
        <Donation />
      </motion.div>
    </motion.div>
  );
};

export default Home;
