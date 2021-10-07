import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const[user, setUser] = useState({})

  const handleGoogleSignin = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(result =>{
      const {displayName, email, photoURL, phoneNumber} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
        number: phoneNumber
      };
      setUser(loggedInUser);
      // console.log(user); 
    })
  }
  return (
    <div className="App">
     <button onClick = {handleGoogleSignin}>Google Signin</button>
    </div>
  );
}

export default App;
