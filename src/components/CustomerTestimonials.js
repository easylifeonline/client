import React from 'react';
import '../styles/views/CustomerTestimonials.scss';

const CustomerTestimonials = ({ testimonials }) => {
  return (
    <div className="customer-testimonials">
      {testimonials.map(testimonial => (
        <div key={testimonial.id} className="testimonial-item">
          <p className="testimonial-text">"{testimonial.text}"</p>
          <p className="testimonial-author">- {testimonial.author}</p>
          <p className="testimonial-details">{testimonial.date} {testimonial.time}, {testimonial.country}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerTestimonials;
