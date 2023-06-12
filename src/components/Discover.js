import Post from "./Post";

function Discover({posts, users}){
    const screenWidth = window.screen.width.toString() + 'px'
    return(
        <div className="posts" style={{width: screenWidth}}>
            {posts.map((post, index)=><Post post={post} users={users} active={index === 0}/>)}
        </div>
    )
}

export default Discover;