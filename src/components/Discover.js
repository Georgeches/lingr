import Post from "./Post";
import { useState, useEffect, useRef } from "react";

function Discover({posts, users, currentUser}){
    const screenWidth = (window.screen.width).toString() + 'px'
    const [muted, setMuted] = useState(true)
    const [activePostIndex, setActivePostIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const { scrollTop, clientHeight } = container;
            const newIndex = Math.ceil(scrollTop / clientHeight);
            setActivePostIndex(newIndex);

        }
        };

        const container = containerRef.current;
        if (container) {
        container.addEventListener("scroll", handleScroll);
        }

        return () => {
        if (container) {
            container.removeEventListener("scroll", handleScroll);
        }
        };
    }, []);

    return(
        <div ref={containerRef} className="posts" style={{width: `${screenWidth}`, height: window.screen.width<600?`${window.screen.height}px`:'auto'}}>
            {posts.map((post, index)=><Post 
                post={post} users={users} 
                muted={muted}
                setMuted={setMuted}
                currentUser={currentUser}
                isActive={activePostIndex === index}
                setActivePostIndex={setActivePostIndex}
            />
            )}
        </div>
    )
}

export default Discover;