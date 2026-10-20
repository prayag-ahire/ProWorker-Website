# API Integration Guide — Worker Search

Worker search calls the live ProWorker API from the browser (`src/services/workerService.js`).

## Base URL

Hardcoded in services as `https://api.proworker.co/api`.

## Endpoints used

### Professions

```
GET /v1/website/professions
```

### Find workers

```
GET /v1/website/find-workers?profession=...&latitude=...&longitude=...&page=...
```

### Worker detail

```
GET /v1/website/workers/:id
```

## Auth (sign-in / delete account)

See `src/services/authService.js`. Google OAuth needs:

```
PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Optional override:

```
PUBLIC_GOOGLE_SIGNIN_URL=https://api.proworker.co/api/v1/website/google-signin
```

Copy `.env.example` to `.env` for local development.
