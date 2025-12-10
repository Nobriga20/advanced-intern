 import React, { useState } from "react";
 import { auth } from "./firebase";
 import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
 } from "firebase/auth";

 const AuthModal = ({ isOpen, onClose }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isRegistering, setIsRegistering] = useState(false);

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       if (isRegistering) {
         await createUserWithEmailAndPassword(auth, email, password);
       } else {
         await signInWithEmailAndPassword(auth, email, password);
       }
       onClose(); // Close modal on success
     } catch (error) {
       console.error("Error during authentication:", error);
     }
   };

   const handleLogout = async () => {
     await signOut(auth);
   };

   const handleGuestLogin = async () => {
     const guestEmail = "guest@example.com";
     const guestPassword = "guestPassword"; 
     try {
       await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
     } catch (error) {
       console.error("Error during guest login:", error);
     }
   };

   return (
     isOpen && (
       <div className="modal">
         <form onSubmit={handleSubmit}>
           <h2>{isRegistering ? "Register" : "Login"}</h2>
           <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
           <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
           <button type="submit">{isRegistering ? "Register" : "Login"}</button>
           <button
             type="button"
             onClick={() => setIsRegistering(!isRegistering)}
           >
             Switch to {isRegistering ? "Login" : "Register"}
           </button>
         </form>
         <button onClick={handleLogout}>Logout</button>
         <button onClick={handleGuestLogin}>Login as Guest</button>
       </div>
     )
   );
 };

 export default AuthModal;