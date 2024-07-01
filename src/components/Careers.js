import React from 'react';
import '../styles/views/Careers.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBriefcase, faUserGraduate, faHandshake, faBullhorn, faCheckCircle, faLaptopCode, faProjectDiagram, faHeadset, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Careers = () => {
  return (
    <div className="careers">
      <h2>Careers at EasyLife</h2>
      <p className="intro">
        At EasyLife, we believe that our people are our greatest asset. We are always on the lookout for talented, passionate, and innovative individuals to join our team. As a fast-growing e-commerce platform, we offer a dynamic and collaborative work environment where you can make a real impact.
      </p>
      <div className="career-section">
        <div className="icon">
          <FontAwesomeIcon icon={faBriefcase} size="3x" />
        </div>
        <div className="content">
          <h3>Why Work with Us?</h3>
          <p>We offer competitive salaries, comprehensive benefits, and a supportive work culture that encourages creativity and innovation.</p>
          <ul>
            <li><FontAwesomeIcon icon={faCheckCircle} className="list-icon" /> Flexible work environment</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="list-icon" /> Professional development opportunities</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="list-icon" /> Exciting projects that make a difference</li>
          </ul>
        </div>
      </div>
      <div className="career-section">
        <div className="icon">
          <FontAwesomeIcon icon={faUserGraduate} size="3x" />
        </div>
        <div className="content">
          <h3>Grow with Us</h3>
          <p>Whether you're a seasoned professional or just starting your career, EasyLife offers a range of opportunities to grow and develop your skills.</p>
        </div>
      </div>
      <div className="career-section">
        <div className="icon">
          <FontAwesomeIcon icon={faHandshake} size="3x" />
        </div>
        <div className="content">
          <h3>Join Our Team</h3>
          <p>If you're ready to join a company that values your contributions and invests in your growth, we invite you to explore our current job openings and apply today.</p>
          <h4>Current Openings:</h4>
          <ul>
            <li><FontAwesomeIcon icon={faLaptopCode} className="list-icon" /> Software Engineer</li>
            <li><FontAwesomeIcon icon={faProjectDiagram} className="list-icon" /> Product Manager</li>
            <li><FontAwesomeIcon icon={faHeadset} className="list-icon" /> Customer Service Representative</li>
            <li><FontAwesomeIcon icon={faBullhorn} className="list-icon" /> Marketing Specialist</li>
            <li><FontAwesomeIcon icon={faChartLine} className="list-icon" /> Sales Executive</li>
          </ul>
          <p>To apply for any of these positions, please send your resume and cover letter to <a href="mailto:careers@easylife.com">careers@easylife.com</a>.</p>
        </div>
      </div>
      <div className="career-section">
        <div className="icon">
          <FontAwesomeIcon icon={faBullhorn} size="3x" />
        </div>
        <div className="content">
          <h3>Stay Connected</h3>
          <p>Follow us on our social media channels to stay updated on the latest job openings and company news.</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
