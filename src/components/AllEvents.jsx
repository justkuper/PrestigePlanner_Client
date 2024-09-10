import React, { useState , useEffect} from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ALL_EVENTS } from "../utils/queries";
import notebookImage from "../assets/note-book-image.jpg";
import { motion } from "framer-motion";

const AllEvents = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    fetchPolicy: 'network-only',
  });

  const [events, setEvents] = useState([])
  useEffect(() => {
    
    console.log("Are we deleting it ?")
   setEvents(data?.events||[])
  }, [data])
  
  if (loading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)', // Same gradient as cards container
        }}
      >
        <motion.div
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.div
            className="loading-dot"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            style={{ backgroundColor: '#007bff', width: 20, height: 20, borderRadius: '50%' }}
          />
          <motion.div
            className="loading-dot"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            style={{ backgroundColor: '#007bff', width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }}
          />
          <motion.div
            className="loading-dot"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            style={{ backgroundColor: '#007bff', width: 20, height: 20, borderRadius: '50%', marginLeft: 10 }}
          />
        </motion.div>
      </div>
    );
  }

  // const events = data.events;

  return (
    <div
      className="container"
      style={{
        background: 'linear-gradient(to right, blue, pink)',
        padding: '20px',
        borderRadius: '8px',
        minHeight: "137vh",
        backgroundAttachment: "fixed",
        width: '100%', 
        maxWidth: '3050px',
      }}
    >
      <h3 className="mb-4" style={{ fontSize: '42px' , fontFamily: 'Cursive', color: 'white', fontWeight: 'bolder', textShadow: '0 0 10px rgba(255, 105, 180, 0.8), 0 0 20px rgba(255, 105, 180, 0.6)' }}>All Events</h3>
      {events.length === 0 ? (
        <div>No events found</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map((event) => (
            <div key={event.id} className="col">
              <Link
                to={`/eventDetails/${event.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <motion.div
                  className="card h-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
                >
                  {parseInt(event.date) > new Date().getTime() ? (
                    <img
                      src={notebookImage}
                      className="card-img-top"
                      alt={event.title}
                    />
                  ) : (
                    <div style={{ position: "relative" }}>
                      <img
                        src={notebookImage}
                        className="card-img-top"
                        alt={event.title}
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
                        This Event is done
                      </p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <div className="mb-1">
                      <span className="fw-bold me-1">Location:</span>
                      {event.location}
                    </div>
                    <div className="mb-1">
                      <span className="fw-bold me-1">Date:</span>
                      {new Date(parseInt(event.date)).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </div>
                    <div className="text-muted">
                      {event.user ? "Organized by " + event.user.username : ""}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
