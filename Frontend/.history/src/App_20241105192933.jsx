import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./assets/components/Header/Header";
import Main from "./assets/components/Main/main";
import Sidebar from "./assets/components/Sidebar/Sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>

      <Main></Main>
      <Sidebar></Sidebar>
      <Foo
    </>
  );
}

export default App;
