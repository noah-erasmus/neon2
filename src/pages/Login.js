import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  const history = useHistory();
  const signIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("curUser", user);
        history.push("/library");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div style={{ height: "100vh" }}>
      <Container className="pageContent">
        <h1>Log In</h1>
        <input
          type="text"
          //   ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <input
          type="password"
          //   ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Email address"
        />
        <button style={{ color: "white" }} onClick={() => signIn()}>
          Login
        </button>
      </Container>
    </div>
  );
}
