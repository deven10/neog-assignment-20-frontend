import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Students from "./Pages/Students/Students";
import Teachers from "./Pages/Teachers/Teacher";
import Navbar from "./Templates/Navbar";
import ClassView from "./Pages/ClassView/ClassView";
import SchoolView from "./Pages/SchoolView/SchoolView";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App px-4 py-4">
      <h2>School Management Application</h2>
      <Navbar />

      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/school-view" element={<SchoolView />} />
        <Route path="/class-view" element={<ClassView />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
