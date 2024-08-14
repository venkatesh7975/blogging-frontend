import React from "react";

import "./Home.css";
import Posts from "./Posts";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <Posts />
      </div>
    </div>
  );
};

export default Home;
