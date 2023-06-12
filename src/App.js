import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Discover from "./components/Discover";
import Header from "./components/Header";
import List from "./components/List";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoPage from "./components/NoPage";
import Profile from "./components/Profile";
import Message from "./components/Message";
import Sidebar from "./components/Sidebar";

function App() {

  const [page, setPage] = useState("")
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const screenWidth = window.screen.width.toString() + 'px'
  const screenHeight = window.screen.height.toString() + 'px'

  useEffect(()=>{
    fetch("http://localhost:4000/videos")
    .then(res=>res.json())
    .then(data=>setPosts(data))
  },[])

  useEffect(()=>{
    fetch("http://localhost:4000/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  console.log(posts)
  console.log(users)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <>
              <Header page={page} setPage={setPage} setSearch={setSearch}/>
              <main style={{width: screenWidth, height: screenHeight}}>
                <Sidebar page={page}/>
                <Discover posts={posts} users={users}/>
              </main>
            </>
          }>
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Message />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
