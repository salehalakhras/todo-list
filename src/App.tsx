import React from "react";
import "./App.css";
import ContentArea from "./component/ContentArea";
import Navbar from "./component/Navbar";
import { initStorage } from "./component/storage";

function App() {
  React.useEffect(() => {
    initStorage();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-auto bg-blue-600">
      <Navbar></Navbar>
      <ContentArea></ContentArea>
    </div>
  );
}

export default App;
