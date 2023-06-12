function Sidebar(){
    return(
        <div className="sidebar">
            <div className="page-links">
                <ul class="sidebar-links">
                    <li>
                        <a href="/discover">Discover</a>
                    </li>
                    <li>
                        <a href="/list">List</a>
                    </li>
                    <li>
                        <a href="/randomchat">Random chat</a>
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