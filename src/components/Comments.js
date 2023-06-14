import './Comments.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

function Comments({post, users, postComments, currentUser, setPostComments}){

    const [comment, setComment] = useState("")
    const nav = useNavigate();

    function handleComment(e){
        e.preventDefault()
        if(comment!==""){
            let newComment = {
                user: currentUser.id,
                comment: comment
            }
            axios.patch(`https://my-json-server.typicode.com/Georgeches/lingr/videos/${post.id}`, { comments: [...postComments, newComment] })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setPostComments([...postComments, newComment])
        }
        else{
            alert("comment can't be blank")
        }
    }

    function hideComments(e){
        e.preventDefault()
        nav(-1)
    }

    return(
        <div className="all-comments-section" style={{height: `${window.screen.height}px`}}>
            <div className="comment-section-header">
                <button onClick={e=>hideComments(e)}>
                    <span class="material-symbols-outlined">close</span>
                </button>
                <h3 style={{textAlign: 'center'}}>Comments</h3>
            </div>
            <div className="comments">
                {postComments.map(comment=>
                <div className="comment">
                    <div className="comment-img">
                    <img src={users.find(this_user => this_user.id === comment.user)?.profile_picture || 'profile'} alt="profile" />
                    </div>
                    <div className="comment-details">
                        <a href="#">{users.find(this_user=>this_user.id===comment.user)?.name || 'name'}</a>
                        <p>{comment.comment}</p>
                    </div>
                </div>
                )}
            </div>
            <div className="comment-section-footer">
                <form onSubmit={e=>handleComment(e)}>
                    <input onChange={e=>setComment(e.target.value)} type="text" placeholder="Comment..."></input>
                    <button type="submit">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Comments;