import React from "react";
import ImageGenerator from "./components/ImageGenerator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<ImageGenerator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
