import { Link, useNavigate } from "react-router-dom";

function Header({setSearch}){

    const screenWidth = window.screen.width.toString() + 'px'

    return(
        <header style={{width: screenWidth}}>
            <div className="brand">
                <h1>Lingr</h1>
            </div>
            <input type="text" onChange={e=>setSearch(e.target.value)} id="search" placeholder="Search" />
            <div className="links">
                <button className="post-btn">Post</button>
                <Link className="link" style={{marginRight: '30px'}} to='/messages'><i class="las la-comment"></i></Link>
                <button style={{marginRight: '30px'}} className="notification-btn"><i class="las la-bell"></i></button>
                <Link className="link" to='/profile'><i class="las la-user-circle"></i></Link>
            </div>
        </header>
    )
}

export default Header;