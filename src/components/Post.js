import { useState, useEffect, useRef } from "react"

function Post({post, users, active}){
    let user = users.find(this_user=>this_user.id===post.user)
    const [muted, setMuted] = useState(true)
    const videoRef = useRef(null);
    const [isActive, setIsActive] = useState(active);
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (isActive && videoRef.current) {
          videoRef.current.play();
        } else if (!isActive && videoRef.current) {
          videoRef.current.pause();
        }
      }, [isActive]);
    
      const handleScroll = () => {
        if (videoRef.current) {
          const rect = videoRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        }
      };

    const handlePause = (e) => {
        e.preventDefault()
        if(paused===true){
            videoRef.current.play();
            setPaused(false)
        }
        else{
            videoRef.current.pause();
            setPaused(true)
        }
    };

    return(
        <div class="post" onScroll={e=>handleScroll(e)}>
            <div className="second-post-section">
                <button className="pause-btn">{paused===true?
                    <span class="material-symbols-outlined">play_arrow</span>
                    :
                    <span class="material-symbols-outlined">pause</span>
                }</button>
            <video ref={videoRef} onClick={handlePause} loop autoPlay={true} muted={muted} className='video'>
                <source src={process.env.PUBLIC_URL + post.video} type="video/mp4" />
            </video>
                <div className="post-btns">
                    <button><span class="material-symbols-outlined">favorite</span></button>
                    <button><span class="material-symbols-outlined">forum</span></button>
                    <button><i class="las la-share"></i></button>
                    <button><i class="las la-bookmark"></i></button>
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
    )
}

export default Post;