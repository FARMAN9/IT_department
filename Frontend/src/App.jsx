import { useState } from "react";
import Header from "./assets/components/Header/Header";
import Main from "./assets/components/Main/main";
import Footer from "./assets/components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
