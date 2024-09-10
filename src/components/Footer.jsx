import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", ""); // KEY a60564ee-a072-49e5-8afb-e25dd322a44f

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
    window.alert('Success, Form Submitted!', formData);
    setHover(0);
    setRating(0);
    setShowModal(false);
    setFormData({ review: '' });
  };


  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <div className="container containerss">
        <section className="social-icons-wrapper d-flex flex-column flex-md-row justify-content-center my-3">
          {/* DANIEL'S SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg ">
            <a href="https://github.com/WickedDan" className="icon Daniel" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} flip size="3x" style={{ color: 'green' }} />
            </a>
            <a href="https://github.com/WickedDan" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@WickedDan</span>
            </a>
          </div>
          {/* PARTHA'S SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/parthacrana" className="icon parthacrana" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} beat size="3x" style={{ color: 'purple' }} />
            </a>
            <a href="https://github.com/parthacrana" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@parthacrana</span>
            </a>
          </div>
          {/* PREKSHA'S SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/Preksha2408" className="icon Preksha2408" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} flip size="3x" style={{ color: 'blue' }} />
            </a>
            <a href="https://github.com/Preksha2408" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@Preksha2408</span>
            </a>
          </div>
          {/* KUPER'S SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/justkuper" className="icon justkuper" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} beat size="3x" style={{ color: 'yellow' }} />
            </a>
            <a href="https://github.com/justkuper" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@justkuper</span>
            </a>
          </div>
          {/* JOHANNES SECTION */}
          <div className="d-flex flex-column align-items-center mx-md-2 transparent-bg">
            <a href="https://github.com/johannesmstoppler" className="icon johannesmstoppler" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} flip size="3x" style={{ color: 'orange' }} />
            </a>
            <a href="https://github.com/johannesmstoppler" target="_blank" rel="noreferrer">
              <span className="d-inline-block mx-1 name">@johannesmstoppler</span>
            </a>
          </div>
          {/* Reviews Button */}
        <button
          className="btn btn-primary review-btn"
          style={{ display: 'flex', position: 'absolute', bottom: '-625px', left: '20px' }}
          onClick={() => setShowModal(true)}
        >
          Leave a Review
        </button>

        {/* Reviews Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="text-dark modal-title">Leave a Review</h5>
                </div>

                <form className="modal-body" onSubmit={handleSubmit} >
                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            id="rating"
                            type="radio"
                            name="rating"
                            value={rating}
                            onChange={handleChange}
                            onClick={() => handleRating(ratingValue)}
                            required
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size="2x"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(rating)}
                          />
                        </label>
                      );
                    })}
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="review">Review Description:</label>

                    <textarea className="form-control"
                      id="review"
                      name="review"
                      type="message"
                      value={formData.review}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Write your review here..."
                      required
                    ></textarea>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}
        </section>

        
        {/* Share Icons */}

        <section className="footer" id="footer">
          <section className="form-footer">
            <h5 className="text-center mb-2">Designed by Fab Five  &copy; {new Date().getFullYear()} All rights reserved.</h5>
            {/* <div className="text-center mb-0">
              <h6>&copy; {new Date().getFullYear()} All rights reserved.</h6>
            </div> */}

          
          <section className="share-icon" >
            <a href="https://wa.me/?text=Check%20out%20Prestigle%20Planners!%20https://prestigleplanners.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="3x" style={{ color: 'green', marginRight: '20px' }} />
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://prestigleplanners.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="3x" style={{ color: 'blue', marginRight: '20px' }} />
            </a>
            <a href="https://www.instagram.com/?url=https://prestigleplanners.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="3x" style={{ color: 'purple' }} />
            </a>
          </section>
          </section>
        </section>

      </div>
    </footer>
  );
};
