import { useState } from 'react';
import './WorkerList.css';

function WorkerList({ workers }) {
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);

  const toggleWorkerDetails = (workerId) => {
    setExpandedWorkerId(expandedWorkerId === workerId ? null : workerId);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  return (
    <div className="worker-list">
      {workers.map((worker) => (
        <div key={worker.id} className="worker-card">
          <div className="worker-header">
            <div className="worker-avatar">
              {worker.profileImage ? (
                <img src={worker.profileImage} alt={worker.name} />
              ) : (
                <div className="avatar-placeholder">
                  {worker.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="worker-info">
              <h4 className="worker-name">{worker.name}</h4>
              <p className="worker-profession">{worker.profession}</p>
              <div className="worker-meta">
                {worker.distance && (
                  <span className="distance">
                    📍 {worker.distance} km away
                  </span>
                )}
                {worker.rating && (
                  <span className="rating">
                    ⭐ {worker.rating} ({worker.reviewCount || 0} reviews)
                  </span>
                )}
              </div>
            </div>

            <div className="worker-price">
              {worker.hourlyRate && (
                <p className="price">₹{worker.hourlyRate}/hr</p>
              )}
              {worker.rating && (
                <div className="rating-badge">{worker.rating}</div>
              )}
            </div>
          </div>

          {worker.bio && (
            <p className="worker-bio">{worker.bio}</p>
          )}

          {worker.skills && worker.skills.length > 0 && (
            <div className="worker-skills">
              {worker.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="worker-actions">
            <button
              className="btn btn-secondary"
              onClick={() => toggleWorkerDetails(worker.id)}
            >
              {expandedWorkerId === worker.id ? 'Hide Details' : 'View Details'}
            </button>
            <button className="btn btn-primary">Contact Worker</button>
          </div>

          {expandedWorkerId === worker.id && (
            <div className="worker-details">
              {worker.experience && (
                <div className="detail-item">
                  <strong>Experience:</strong> {worker.experience} years
                </div>
              )}
              {worker.location && (
                <div className="detail-item">
                  <strong>Location:</strong> {worker.location}
                </div>
              )}
              {worker.availability && (
                <div className="detail-item">
                  <strong>Availability:</strong> {worker.availability}
                </div>
              )}
              {worker.languages && worker.languages.length > 0 && (
                <div className="detail-item">
                  <strong>Languages:</strong> {worker.languages.join(', ')}
                </div>
              )}
              {worker.certifications && worker.certifications.length > 0 && (
                <div className="detail-item">
                  <strong>Certifications:</strong>
                  <ul>
                    {worker.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WorkerList;
