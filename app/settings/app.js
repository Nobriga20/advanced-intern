 import React, { useState } from "react";
 import AuthModal from "./AuthModal";

 const App = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
     <div>
       <button onClick={() => setIsModalOpen(true)}>Open Auth Modal</button>
       <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
     </div>
   );
 };

 export default App;
