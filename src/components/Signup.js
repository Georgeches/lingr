import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import './Login.css'

function Signup({users, setUsers}){

    const [username, setName] = useState("")
    const [password, setPassword] = useState("")
    const [profile_pic, setProfilePic] = useState("")
    const nav = useNavigate()

    function handleSignup(e){
        e.preventDefault()
        let activeUser = users.find(user=>user.name===username)
        if (activeUser){
            alert("That profile already exists")
        }
        else{
            let newUser = {
                id: users.length + 1,
                name: username,
                password: password,
                profile_picture: profile_pic,
                list: [],
                friends: [],
                saved: []
            }
            axios.post("https://my-json-server.typicode.com/Georgeches/lingr/users", newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setUsers([...users, newUser])
            nav('/login')
        }
    }

    return(
        <div className="signup">
            <form onSubmit={(e)=>handleSignup(e)}>
                <h1>Sign up</h1>
                <input type="text" name="username" placeholder="Enter your username" id="username" onChange={e=>setName(e.target.value)} required/>
                <input type="password" name="password" placeholder="Enter your password" id="password" onChange={e=>setPassword(e.target.value)} required/>
                <input type="text" name="profile-pic" placeholder="Enter profile picture" id="profile-pic" onChange={e=>setProfilePic(e.target.value)} required/>
                <div className="profile-pic-div">
                    {profile_pic===""?<p>Enter profile pic</p>:<img src={profile_pic} alt="profile-pic"/>}
                </div>
                <button type="submit">Create account</button>
                <p>Already have an account?</p><Link style={{color: "#FD3434", border: 'none'}} to="/login">Log in</Link>
            </form>
        </div>
    )
}

export  default Signup;