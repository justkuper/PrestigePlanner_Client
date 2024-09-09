import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'font-awesome/css/font-awesome.min.css';

import './components/style.css'; // Add this line to import the style.css file

import { initClient } from './googleCalenderApi';   // change 1 gapi 

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyEvents from "./components/MyEvents";
import CreateEvent from "./components/CreateEvent";
import AllEvents from "./components/AllEvents";
import UpdateEvent from "./components/UpdateEvent";
import EventDetails from "./components/EventDetails";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
  
});    // Connects backend

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
 
  cache: new InMemoryCache(),
});


function App() {
  useEffect(() => {             // change 2 gapi
    const initializeGoogleAPI = async () => {
      try {
        await initClient();
        console.log("Google API initialized");
      } catch (error) {
        console.error('Error initializing Google API:', error);
      }
    };

    initializeGoogleAPI();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myEvents" element={<MyEvents />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/allEvents" element={<AllEvents />} />
            <Route path="/updateEvent/:eventId" element={<UpdateEvent />} />
            <Route path="/eventDetails/:eventId" element={<EventDetails />} />
            
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
