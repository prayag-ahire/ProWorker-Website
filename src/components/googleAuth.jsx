import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function GoogleAuth({ onSuccess, onError }) {
  const clientId = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="google-auth-hint" role="status">
        Set <code>PUBLIC_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-auth-wrapper">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            if (onError) {
              onError(new Error('Google sign-in failed'));
            }
          }}
          theme="outline"
          size="large"
          shape="rectangular"
          text="signin_with"
          useOneTap={false}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
