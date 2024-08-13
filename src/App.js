// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Home from "./components/Home";
import MyPosts from "./components/MyPosts";

import "./App.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
