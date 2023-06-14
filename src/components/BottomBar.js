import './BottomBar.css'
import {Link} from 'react-router-dom'

function BottomBar(){
    return(
        <div className="bottom-bar">
            <button><Link to="/"><span class="material-symbols-outlined">home</span></Link></button>
            <button><Link to="/search"><i class="las la-search"></i></Link></button>
            <button><Link to="/viewlater"><span class="material-symbols-outlined">filter_list</span></Link></button>
            <button><Link to="/messages"><i class="las la-comment"></i></Link></button>
            <button><Link to="/profile"><span class="material-symbols-outlined">account_circle</span></Link></button>
        </div>
    )
}

export default BottomBar;