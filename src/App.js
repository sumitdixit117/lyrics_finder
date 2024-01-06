import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Lyrics from "./components/Lyrics";
import { ContextController } from "./Context";

const App = () => {
  return (
    <ContextController>
      <Router>
        <>
          <Navbar />
          <div className="container col-9">
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route exact path="/lyrics/track/:id" element={<Lyrics />} />
            </Routes>
          </div>
        </>
      </Router>
    </ContextController>
  );
};

export default App;
