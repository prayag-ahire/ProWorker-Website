import { useState } from 'react';
import './WorkerList.css';

function WorkerList({ workers }) {
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);

  const toggleWorkerDetails = (workerId) => {
    setExpandedWorkerId(expandedWorkerId === workerId ? null : workerId);
  };

  return (
    <div className="worker-list">
      {workers.map((worker) => (
        <div key={worker.id} className="worker-card">
          <div className="worker-header">
            <div className="worker-avatar">
              <div className="avatar-placeholder">
                {worker.name
                  .split(' ')
                  .slice(0, 2)
                  .map(word => word.charAt(0).toUpperCase())
                  .join('')}
              </div>
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
                {worker.rating !== undefined && worker.rating > 0 && (
                  <span className="rating">
                    ⭐ {worker.rating} ({worker.reviewCount || 0} reviews)
                  </span>
                )}
              </div>
            </div>

            <div className="worker-price">
              {worker.hourlyRate && (
                <p className="price">₹{worker.hourlyRate}/visit</p>
              )}
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= (worker.rating || 0) ? 'filled' : 'empty'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {worker.bio && (
            <p className="worker-bio">{worker.bio}</p>
          )}

          <div className="worker-actions">
            <button
              className="btn btn-secondary"
              onClick={() => toggleWorkerDetails(worker.id)}
            >
              {expandedWorkerId === worker.id ? 'Hide Details' : 'View Details'}
            </button>
            <button className="btn btn-primary">Book Now</button>
          </div>

          {expandedWorkerId === worker.id && (
            <div className="worker-details">
              {worker.age && (
                <div className="detail-item">
                  <strong>Age:</strong> {worker.age} years
                </div>
              )}
              {worker.gender && (
                <div className="detail-item">
                  <strong>Gender:</strong> {worker.gender}
                </div>
              )}
              {worker.hourlyRate && (
                <div className="detail-item">
                  <strong>Charges:</strong> ₹{worker.hourlyRate} per visit
                </div>
              )}
              {worker.distanceCharges && (
                <div className="detail-item">
                  <strong>Distance Charges:</strong> ₹{worker.distanceCharges} per km
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
