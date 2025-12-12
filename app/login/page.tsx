"use client";

import React, { useState } from "react";
import { registerUser } from "@/app/lib/registerUser";
import "./login.css";

const login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    console.log(name, email, password);
    try {
      if (name.length === 0 || email.length === 0 || password.length === 0) {
        alert("Please enter valid credentials");
        return;
      }
      await registerUser(email, password, name);
    } catch (error) {
      console.log(error);
      alert("An error ocurred");
    }
  }

  return (
    <div className="login">
      {/* <img src={logo} className="login-logo" alt="" /> */}
      <div className="login-form">
        <h1>Sign Up</h1>
        <form>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => handleClick(e)}>Sign Up</button>
          <div className="form-help">
            <div className="remember">
              <input type="check-box" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
