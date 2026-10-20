import './WorkerList.css';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';

function WorkerList({ workers }) {
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
                    .map((word) => word.charAt(0).toUpperCase())
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
            <a
              className="btn btn-primary worker-download-btn"
              href={CLIENT_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download app to contact
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkerList;
