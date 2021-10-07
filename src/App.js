import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";

import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL, phoneNumber } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          number: phoneNumber
        };
        setUser(loggedInUser);
        // console.log(user); 
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  const handleGitHubSignin = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
        // console.log(user);
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App">

      { !user.name ?
        <div>
        <button onClick={handleGoogleSignin}>Google Sign In</button>
        <button onClick={handleGitHubSignin}>GitHub Sign In</button>
      </div> :
      <button onClick={handleSignOut}>Sign Out</button>
      }
      <br />
      {
        user.name && <div>

          <h4>Welcome {user.name}</h4>
          <img src={user.photo} alt="" />
          <h4>{user.email}</h4>
          <h4>{user.number}</h4>
        </div>
      }
    </div>
  );
}

export default App;
