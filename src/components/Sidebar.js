function Sidebar(){
    return(
        <div className="sidebar">
            <div className="page-links">
                <ul class="sidebar-links">
                    <li>
                        <a href="/">Discover</a>
                    </li>
                    <li>
                        <a href="/list">View Later</a>
                    </li>
                    <li>
                        <a href="/randomchat">Random chat</a>
                    </li>

                    <li>
                        <a href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
            <div className="interests">
                <h3>Interests</h3>
                <ul className="interest-links">
                    <li>
                        <a href="#">Anime</a>
                    </li>
                    <li>
                        <a href="#">Music</a>
                    </li>
                    <li>
                        <a href="#">Swimming</a>
                    </li>
                    <li>
                        <a href="#">Dancing</a>
                    </li>
                </ul>
                <p>more</p>
            </div>
        </div>
    )
}

export default Sidebar;