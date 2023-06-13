import { useState, useEffect, useRef } from "react"
import axios from 'axios'

function Post({post, users, isActive, setActivePostIndex, muted, setMuted, currentUser}){
    let user = users.find(this_user=>this_user.id===post.user)
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(false)
    let usersLiked = post.users_liked
    const [users_liked, setUsersLiked] = useState(usersLiked)
    let userInLikes = users_liked.find(user=>user===currentUser.id)
    const [liked, setLiked] = useState(userInLikes!==undefined)
    const [commentsView, setCommentsView] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const [comment, setComment] =useState("")
    console.log(liked)

    const commentsStyle = {
        display: commentsView?"block":"none"
    }

    const videoStyle = {
        height: window.screen.width < 600? `${window.screen.height}px`:"100%",
        width: window.screen.width < 600? `${window.screen.width}px`:"100%"
    }

    function handleComment(e){
        e.preventDefault()
        if(comment!==""){
            let newComment = {
                user: currentUser.id,
                comment: comment
            }
            axios.patch(`https://my-json-server.typicode.com/Georgeches/lingr/videos/${post.id}`, { comments: [...comments, newComment] })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setComments([...comments, newComment])
        }
        else{
            alert("comment can't be blank")
        }
    }

    function handleLike(e){
        e.preventDefault()
        if(liked){
            axios.patch(`https://my-json-server.typicode.com/Georgeches/lingr/videos/${post.id}`, { users_liked: users_liked.filter(user_id=>user_id!==currentUser.id) })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setUsersLiked(users_liked.filter(user_id=>user_id!==currentUser.id))
            setLiked(false)
        }
        else{
            axios.patch(`https://my-json-server.typicode.com/Georgeches/lingr/videos/${post.id}`, { users_liked: [...users_liked, currentUser.id] })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setUsersLiked([...users_liked, currentUser.id])
            setLiked(true)
        }        
        
    }

    useEffect(() => {
        post.id===1?videoRef.current.play() : console.log("not the first post");
        if (isActive) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
    }, [isActive]);
    

    const handlePause = (e) => {
        e.preventDefault()
        if(paused){
            videoRef.current.play();
            setPaused(false)
        }
        else{
            videoRef.current.pause();
            setPaused(true)
        }
    };

    return(
        <div className="post-container" style={{height: `${window.screen.height-145}px`}}>
        <div class="post" style={{height: '100%', width: '100%'}}>
            <div className="second-post-section">
                <button className="pause-btn">{paused===true?
                    <span class="material-symbols-outlined">play_arrow</span>
                    :
                    <span class="material-symbols-outlined">pause</span>
                }</button>
            <video style={videoStyle} onDoubleClick={e=>handleLike(e)} ref={videoRef} onClick={handlePause} loop muted={muted} className='video'>
                <source src={process.env.PUBLIC_URL + post.video} type="video/mp4" />
            </video>
                <div className="post-btns">
                    <div className="icon">
                        <button onClick={e=>handleLike(e)}>
                            {!liked?
                                <span class="material-symbols-outlined">favorite</span>
                            :
                                <i style={{color: "red"}} class="las la-heart"></i>
                            }
                        </button>
                        <p>{users_liked.length}</p>
                    </div>
                    <div className="icon">
                        <button onClick={e=>{
                            e.preventDefault()
                            setCommentsView(!commentsView)
                        }}>
                        <span class="material-symbols-outlined">forum</span>
                        </button>
                        <p>{post.comments.length}</p>
                    </div>
                    <button className="post-btn-btn"><i class="las la-share"></i></button>
                    <button className="post-btn-btn"><span class="material-symbols-outlined">add</span></button>
                    <button className="post-btn-btn"><i class="las la-bookmark"></i></button>
                </div>
            </div>
            <div className="third-post-section">
            <button className='unmute-btn' onClick={e=>{
                e.preventDefault()
                setMuted(!muted)
            }}>{muted===true?
            <span class="material-symbols-outlined">volume_off</span>
            :
            <span class="material-symbols-outlined">volume_up</span>}
            </button>
                <p>{post.caption}</p>
                {post.hashtags.map(hashtag=><a style={{color: 'blue'}} href="#">{hashtag}</a>)}
            </div>
            <div className="first-post-section">
                <div class="user-post-details">
                    <div class="post-user-img">
                        <img src={user? user.profile_picture: "profile"} alt="profile"/>
                    </div>            
                    <div>
                        <p>{user? user.name : "profile"}</p>
                        <p className='audio'><i class="las la-music"></i>{post.audio}</p>
                    </div>
                </div>
                <button className="follow-btn">Add friend</button>
            </div>
        </div>
        <div className="comments-section" style={commentsStyle}>
            <div className="comment-section-header">
                <button onClick={e=>{
                    e.preventDefault()
                    setCommentsView(!commentsView)
                }}>
                    <span class="material-symbols-outlined">close</span>
                </button>
                <h3>Comments</h3>
            </div>
            <div className="comments">
                {comments.map(comment=>
                <div className="comment">
                    <div className="comment-img">
                        <img src={users.find(this_user=>this_user.id===comment.user).profile_picture} alt="profile"/>
                    </div>
                    <div className="comment-details">
                        <a href="#">{users.find(this_user=>this_user.id===comment.user).name}</a>
                        <p>{comment.comment}</p>
                    </div>
                </div>
                )}
            </div>
            <div className="comment-section-footer">
                <input type="text" onChange={e=>setComment(e.target.value)} placeholder="Comment..."></input>
                <button onClick={e=>handleComment(e)}>
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </div>
        </div>
    )
}

export default Post;