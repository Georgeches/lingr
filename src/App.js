import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Discover from "./components/Discover";
import Header from "./components/Header";
import ViewLater from "./components/ViewLater";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoPage from "./components/NoPage";
import Profile from "./components/Profile";
import Message from "./components/Message";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";
import SearchPage from "./components/SearchPage";
import Settings from "./components/Settings";
import Comments from "./components/Comments";

function App() {

  const [page, setPage] = useState("")
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const current_user = JSON.parse(localStorage.getItem('current_user'))
  const screenWidth = window.screen.width.toString() + 'px'
  const screenHeight = (window.screen.height-80).toString() + 'px'
  const [currentPost, setPost] = useState([])
  const [postComments, setPostComments] = useState([])

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
  console.log(current_user)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <>
            {window.screen.width>600? <Header currentUser={current_user} page={page} setPage={setPage} setSearch={setSearch}/>: console.log("small device")}
              <div style={{width: screenWidth, height: screenHeight, display: window.screen.width<600?'block':'flex'}}>
                <Sidebar page={page}/>
                <Discover setPostComments={setPostComments} setPost={setPost} posts={posts} users={users} currentUser={current_user}/>
                <BottomBar/>
              </div>
            </>
          }></Route>
          <Route path="/viewlater" element={
            <main>
              <ViewLater />
              <BottomBar />
            </main>
          }/>
          <Route path="/profile" element={
            <>
            {window.screen.width>600? <Header currentUser={current_user} page={page} setPage={setPage} setSearch={setSearch}/>: console.log("small device")}
              <div style={{width: screenWidth, height: screenHeight, display: window.screen.width<600?'block':'flex'}}>
                <Sidebar page={page}/>
                <Profile currentUser={current_user} posts={posts} />
                <BottomBar/>
              </div>
            </>
          } />
          <Route path="/messages" element={
            <>
              <Message />
              <BottomBar />
            </>
          } />
          <Route path="/search" element={
            <>
              <SearchPage />
              <BottomBar />
            </>
          } />
          <Route path="/comments" element={
            <>
              <Comments setPostComments={setPostComments} postComments={postComments} users={users} post={currentPost} currentUser={current_user}/>
            </>
          } />
          <Route path="/login" element={<Login users={users}/>} />
          <Route path="/signup" element={<Signup users={users} setUsers={setUsers}/>} />
          <Route path="*" element={
            <>
              <NoPage />
              <BottomBar />
            </>
            } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
