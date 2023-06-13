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
  const [currentUser, setCurrentUser] = useState({})
  const screenWidth = window.screen.width.toString() + 'px'
  const screenHeight = window.screen.height.toString() + 'px'

  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/Georgeches/lingr/videos")
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  },[])

  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/Georgeches/lingr/users")
    .then(response => {
      setUsers(response.data);
      setCurrentUser(response.data[0])
    })
    .catch(error => {
      console.error(error);
    });
  },[])

  console.log(posts)
  console.log(users)
  console.log(currentUser)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <>
              <Header page={page} setPage={setPage} setSearch={setSearch}/>
              <main style={{width: screenWidth, height: screenHeight}}>
                <Sidebar page={page}/>
                <Discover posts={posts} users={users} currentUser={currentUser}/>
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
