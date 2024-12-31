import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <>
   <header class="bg-blue-600 text-white">
  <div class="container mx-auto flex justify-between items-center py-4 px-6">
    
    <div className="text-2xl font-bold">
      <a href="#">MyWebsite</a>
    </div>


    <nav class="hidden md:flex space-x-6">
      <a href="#" class="hover:text-gray-200">Home</a>
      <a href="#" class="hover:text-gray-200">About</a>
      <a href="#" class="hover:text-gray-200">Services</a>
      <a href="#" class="hover:text-gray-200">Contact</a>
    </nav>

   
    <button class="md:hidden flex items-center">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>

  
  <div class="md:hidden px-6 pb-4">
    <a href="#" class="block py-2 text-gray-200">Home</a>
    <a href="#" class="block py-2 text-gray-200">About</a>
    <a href="#" class="block py-2 text-gray-200">Services</a>
    <a href="#" class="block py-2 text-gray-200">Contact</a>
  </div>
</header>

  </>;
}

export default App;
