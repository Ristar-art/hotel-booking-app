import React from 'react';
import './About.css';
export const About = () => {
  return (
    <div className="about-container">
      <div className="about-intro">
        <h1>Welcome to Abide in me hotel</h1>
        <p>Your Home Away from Home</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            At our hotel, we've been welcoming guests with open arms for decades. Our story is one of
            passion, dedication, and exceptional hospitality. We regard every guest as a part of our firmily, for we believe that in etertaining our geust well, we could very well be entertaining angels. 
          </p>
        </section>
        <section className="about-section">
          <h2>Location</h2>
          <p>
            Our hotel is nestled in the heart of Johannesburg, offering you the perfect base to explore
            the city's vibrant culture and attractions.
          </p>
        </section>
        <section className="about-section">
          <h2>Accommodation</h2>
          <p>
            Choose from a variety of room types, each meticulously designed for your comfort and
            relaxation. Our rooms offer modern amenities and stunning views.
          </p>
        </section>
        <section className="about-section">
          <h2>Amenities</h2>
          <p>
            Indulge in our luxurious amenities, including a spa, fitness center, swimming pool,fine dining, free and unlimited wifi. We're committed to making your stay exceptional.
          </p>
        </section>
        <section className="about-section">
          <h2>Dining</h2>
          <p>
            Experience culinary excellence at our on-site restaurants, where talented chefs create
            delectable dishes from around the world.
          </p>
        </section>
        {/* <section className="about-section">
          <h2>Events and Meetings</h2>
          <p>
            We offer state-of-the-art event and conference facilities, perfect for your business
            meetings and special events.
          </p>
        </section> */}
      </div>
    </div>
  );
};


