import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usn, setUsn] = useState("");
  const [name, setName] = useState("");
  const auth = getAuth();
  const emailRef = useRef(null);
  const usnRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      username: usn,
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("curUser", user);
        db.collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => console.log("user added"))
          .catch((e) => console.log(e));
        history.push("/library");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Container className="pageContent">
        <h1>Sign Up</h1>
        <input
          type="email"
          //   ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          //   ref={usnRef}
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          //   ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button style={{ color: "white" }} onClick={signUp}>
          Register
        </button>
      </Container>
    </div>
  );
}
