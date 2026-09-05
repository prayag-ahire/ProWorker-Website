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
              {worker.profileImage ? (
                <img
                  src={worker.profileImage}
                  alt={worker.name}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  {(worker.name || '?')
                    .split(' ')
                    .slice(0, 2)
                    .map(word => word.charAt(0).toUpperCase())
                    .join('')}
                </div>
              )}
              <span
                className={`status-dot ${worker.isOnline ? 'online' : 'offline'}`}
                title={worker.isOnline ? 'Online' : 'Offline'}
              />
            </div>

            <div className="worker-info">
              <div className="worker-name-row">
                <h4 className="worker-name">{worker.name}</h4>
                <span className={`status-badge ${worker.isOnline ? 'online' : 'offline'}`}>
                  {worker.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="worker-profession">{worker.profession}</p>
              <div className="worker-meta">
                {typeof worker.distance === 'number' && (
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
              {worker.hourlyRate != null && (
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
            <button className="btn btn-primary">Contact</button>
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
              {worker.hourlyRate != null && (
                <div className="detail-item">
                  <strong>Charges:</strong> ₹{worker.hourlyRate} per visit
                </div>
              )}
              {worker.distanceCharges != null && (
                <div className="detail-item">
                  <strong>Distance Charges:</strong> ₹{worker.distanceCharges} per km
                </div>
              )}
              {worker.defaultAddress?.address && (
                <div className="detail-item">
                  <strong>Address:</strong>{' '}
                  {worker.defaultAddress.label
                    ? `${worker.defaultAddress.label} — ${worker.defaultAddress.address}`
                    : worker.defaultAddress.address}
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
