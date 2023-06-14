import { Link, useNavigate } from "react-router-dom";
import './Header.css'

function Header({setSearch, currentUser}){

    const screenWidth = window.screen.width.toString() + 'px'

    return(
        <header style={{width: screenWidth}}>
            <div className="brand">
                <h1>Lingr</h1>
            </div>
            <input type="text" onChange={e=>setSearch(e.target.value)} id="search" placeholder="Search" />
            <div className="links">
                <button className="post-btn">Post</button>
                {currentUser.name?
                    <Link className="link link-profile" to='/profile'><i class="las la-user-circle"></i></Link>
                :
                    <button className="login-link"><Link className="link-login" to='/login'>Log in</Link></button>
                }
                <Link className="link" style={{marginRight: '30px'}} to='/messages'><i class="las la-comment"></i></Link>
                <button style={{marginRight: '30px'}} className="notification-btn"><i class="las la-bell"></i></button>
            </div>
        </header>
    )
}

export default Header;