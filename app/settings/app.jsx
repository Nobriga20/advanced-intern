 import { useState } from "react";
 import AuthModal from "./AuthModal";
 import Login from "../login"

 const App = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
     <div>
      <routes>
        <route path='/' element = {<Home/>}/>
        <route path='/login' element = {<Login/>}/>
      </routes>
       <button onClick={() => setIsModalOpen(true)}>Open Auth Modal</button>
       <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
     </div>
     
   );
 };

 export default App;
