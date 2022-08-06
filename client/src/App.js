import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from "react-google-login"

function App() {

  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseError = (err) => {
    console.log(err)
  }

  return (
    <div>
      <div className="App">
        <h1>Google Calendar API</h1>
      </div>
      <div>
        <GoogleLogin
          clientId='585457191776-7p0k0lj23jg5bole92j44tvp2jfldcbc.apps.googleusercontent.com'
          buttonText='Authenticate Your Google Calendar'
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={"single_host_origin"}
          // This is important
          responseType="code"
          accessType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar '
        />

      </div>
    </div>
  );
}

export default App;
