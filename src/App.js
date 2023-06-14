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
import BottomBar from "./components/BottomBar";
import SearchPage from "./components/SearchPage";

function App() {

  const [page, setPage] = useState("")
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const screenWidth = window.screen.width.toString() + 'px'
  const screenHeight = (window.screen.height-80).toString() + 'px'

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
            {window.screen.width>600? <Header currentUser={currentUser} page={page} setPage={setPage} setSearch={setSearch}/>: console.log("small device")}
              <main style={{width: screenWidth, height: screenHeight, display: window.screen.width<600?'block':'flex'}}>
                <Sidebar page={page}/>
                <Discover posts={posts} users={users} currentUser={currentUser}/>
                <BottomBar/>
              </main>
            </>
          }></Route>
          <Route path="/list" element={
            <main>
              <List />
              <BottomBar />
            </main>
          }/>
          <Route path="/profile" element={
            <main>
              <Profile />
              <BottomBar />
            </main>
          } />
          <Route path="/messages" element={
            <main>
              <Message />
              <BottomBar />
            </main>
          } />
          <Route path="/search" element={
            <main>
              <SearchPage />
              <BottomBar />
            </main>
          } />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} users={users}/>} />
          <Route path="/signup" element={<Signup users={users} setUsers={setUsers}/>} />
          <Route path="*" element={
            <main>
              <NoPage />
              <BottomBar />
            </main>
            } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
