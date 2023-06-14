import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom'
import './Login.css'

function Login({users}){

    const [username, setName] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    function handleLogin(e){
        e.preventDefault();
        let activeUser = users.find(user=>user.name===username && user.password===password)
        if (activeUser){
            localStorage.setItem("current_user", JSON.stringify(activeUser));
            alert("Successfully logged in")
            nav('/')
        }
        else{
            alert("wrong username or password")
        }
    }
    return(
        <div className="login" style={{width: `${window.screen.width}px`}}>
            <form onSubmit={(e)=>handleLogin(e)}>
                <h1>Log in</h1>
                <input type="text" name="username" placeholder="Enter your username" id="username" onChange={e=>setName(e.target.value)} required/>
                <input type="password" name="password" placeholder="Enter your password" id="password" onChange={e=>setPassword(e.target.value)} required/>
                <button type="submit">Log in</button>
                <p>Don't have an account?</p><Link style={{color: "#FD3434", border: 'none'}} to="/signup">Sign up</Link>
            </form>
        </div>
    )
}

export  default Login;