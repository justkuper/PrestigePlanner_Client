import Contact from "../components/Contact";
import "../index.css";
import eventImage from "../assets/event.jpg";

function Donation() {
  return (
    <div className="donation-container">
      <h2 className="donation-heading">Donation</h2>
      <p>If you'd like to support our work, you can donate using the button below:</p>
      <button className="donation-button">Donate</button>
    </div>
  );
}

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome!</h1>
      <div className="home-content">
        <p>
          We're glad to see you again. With our platform, managing your events has never been easier. You can view all of your upcoming events and make any necessary changes with just a few clicks. Thank you for choosing our  PrestigePlanner . We're confident that our platform will make your  planning experience a seamless one.
        </p>
      </div>
      <div className="container">
        <Contact />
        <Donation />
      </div>
    </div>
  );
};

export default Home;
