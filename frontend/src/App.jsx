import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import MyPosts from "./pages/MyPosts";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        } />
        <Route path="/my-posts" element={
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
