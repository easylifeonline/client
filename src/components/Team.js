import React from 'react';
import '../styles/views/Team.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import teamMembers from '../models/teamMembers';

const Team = () => {
  return (
    <div className="team-container">
      <h2>Meet Our Team</h2>

      <section className="team-section">
        <h3>Meet the CEO</h3>
        <div className="team-member">
          <img src={teamMembers.ceo.image} alt={teamMembers.ceo.name} className="member-photo" />
          <div className="member-info">
            <h4>{teamMembers.ceo.name}</h4>
            <p>{teamMembers.ceo.description}</p>
            <div className="social-links">
              {teamMembers.ceo.linkedin && (
                <a href={teamMembers.ceo.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              )}
              {teamMembers.ceo.twitter && (
                <a href={teamMembers.ceo.twitter} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              )}
              {teamMembers.ceo.website && (
                <a href={teamMembers.ceo.website} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGlobe} size="lg" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="team-section">
        <h3>Meet Our Marketing Team</h3>
        {teamMembers.marketing.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="member-photo" />
            <div className="member-info">
              <h4>{member.name}</h4>
              <p>{member.description}</p>
              <div className="social-links">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section> */}

      <section className="team-section">
        <h3>Meet Our CTO</h3>
        {teamMembers.cto.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="member-photo" />
            <div className="member-info">
              <h4>{member.name}</h4>
              <p>{member.description}</p>
              <div className="social-links">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="team-section">
        <h3>Meet Our Support Team</h3>
        {teamMembers.support.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="member-photo" />
            <div className="member-info">
              <h4>{member.name}</h4>
              <p>{member.description}</p>
              <div className="social-links">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Team;




