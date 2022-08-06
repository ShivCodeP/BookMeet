import logo from './logo.svg';
import './App.css';
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"

function App() {

  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar '
  });

  return (
    <div>
      <div className="App">
        <h1>Google Calendar API</h1>
      </div>
      <div>
        <GoogleLogin
          text='Authenticate Your Google Calendar'
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

      </div>
    </div>
  );
}

export default App;