import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Notes from "./components/Notes";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <Toaster className="rounded-md" />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
