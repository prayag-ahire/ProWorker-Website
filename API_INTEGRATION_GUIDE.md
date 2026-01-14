# API Integration Guide for Worker Search Feature

## Setup Instructions

### 1. **Environment Variables**
Create a `.env` file in the root of your project:

```
VITE_API_URL=http://localhost:5000/api
```

For production, update it to your actual API URL:
```
VITE_API_URL=https://your-api-domain.com/api
```

### 2. **Required API Endpoints**

Your backend API should have these endpoints:

#### A. Get Professions List
```
GET /api/professions
Response: {
  "professions": ["Plumber", "Electrician", "Carpenter", ...]
}
```

#### B. Search Workers
```
GET /api/workers/search?profession=Plumber&latitude=28.5355&longitude=77.0992&limit=7
Response: {
  "workers": [
    {
      "id": "worker_id_1",
      "name": "John Doe",
      "profession": "Plumber",
      "hourlyRate": 500,
      "rating": 4.8,
      "reviewCount": 45,
      "distance": 2.5,
      "profileImage": "https://...",
      "bio": "Experienced plumber with 10 years of experience",
      "skills": ["Pipe Installation", "Leak Repair", "Plumbing Design"],
      "experience": 10,
      "location": "Mumbai, Maharashtra",
      "availability": "Available Now",
      "languages": ["Hindi", "English"],
      "certifications": ["Licensed Plumber", "Water Safety Certificate"]
    },
    ...
  ]
}
```

**Note:** The API automatically returns workers sorted from nearest to farthest. The limit parameter is set to 7 to show only 7 workers at a time.

#### C. Get Worker Details (Optional)
```
GET /api/workers/:workerId
Response: {
  "id": "worker_id_1",
  "name": "John Doe",
  ... (full worker details)
}
```

### 3. **Database Schema Requirements**

Make sure your database includes these fields for each worker:

```sql
CREATE TABLE workers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  hourly_rate DECIMAL(10, 2),
  rating DECIMAL(3, 2),
  review_count INT DEFAULT 0,
  profile_image VARCHAR(500),
  bio TEXT,
  experience INT,
  location VARCHAR(255),
  availability VARCHAR(100),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE worker_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  worker_id VARCHAR(255),
  skill VARCHAR(100),
  FOREIGN KEY (worker_id) REFERENCES workers(id)
);

CREATE TABLE worker_languages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  worker_id VARCHAR(255),
  language VARCHAR(50),
  FOREIGN KEY (worker_id) REFERENCES workers(id)
);

CREATE TABLE worker_certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  worker_id VARCHAR(255),
  certification VARCHAR(255),
  FOREIGN KEY (worker_id) REFERENCES workers(id)
);

-- Create index for faster location-based queries
CREATE INDEX idx_worker_location ON workers(latitude, longitude, profession);
```

### 4. **Geolocation Distance Calculation**

The API should use the Haversine formula to calculate distances:

```python
# Python Example
import math

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in km
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c
```

### 5. **Frontend Components Usage**

The search feature has been integrated into your React app:

**Components Created:**
- `WorkerSearch.jsx` - Main search interface
- `WorkerList.jsx` - Display search results
- `workerService.js` - API communication layer

**To Use the Search Page:**
- Users can click the "Find Workers" button in the navbar
- Or navigate to `/#search`

### 6. **Customization**

**Change API URL:**
Edit `src/services/workerService.js` and update `API_BASE_URL`

**Customize Result Limit:**
In `src/services/workerService.js`, modify the default limit parameter in `searchWorkers()` function. Currently set to 7 workers per search.

### 7. **Testing

Here's a sample API response to test with:

```json
{
  "workers": [
    {
      "id": "1",
      "name": "Raj Kumar",
      "profession": "Plumber",
      "hourlyRate": 500,
      "rating": 4.8,
      "reviewCount": 45,
      "distance": 2.5,
      "profileImage": null,
      "bio": "Expert plumber with 15 years experience in residential and commercial work",
      "skills": ["Pipe Installation", "Leak Detection", "Bathroom Fixtures"],
      "experience": 15,
      "location": "Sector 14, Mumbai",
      "availability": "Available Tomorrow",
      "languages": ["Hindi", "English"],
      "certifications": ["Licensed Plumber"]
    }
  ]
}
```

### 8. **CORS Configuration

If your API is on a different domain, enable CORS:

```javascript
// Node.js/Express Example
app.use(cors({
  origin: ['http://localhost:5173', 'https://yourproductionurl.com'],
  credentials: true
}));
```

### 9. **Error Handling

The frontend already handles:
- Location access denied
- Network errors
- No workers found
- Invalid input

Make sure your API returns proper error codes and messages.

---

**Need Help?**
- Check the console for API request details
- Verify the .env file is set correctly
- Test API endpoints using Postman or curl
