import Post from "./Post";
import { useState, useEffect } from "react";

function Discover({posts, users, currentUser}){
    const screenWidth = (window.screen.width).toString() + 'px'
    const [muted, setMuted] = useState(true)
    const [active, setActive] = useState(0)

    return(
        <div className="posts" style={{width: `${screenWidth}`}}>
            {posts.map((post, index)=><Post 
            post={post} users={users} 
            muted={muted}
            setMuted={setMuted}
            active={active}
            currentUser={currentUser}
            />
            )}
        </div>
    )
}

export default Discover;