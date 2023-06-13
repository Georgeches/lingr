import './BottomBar.css'
import {Link} from 'react-router-dom'

function BottomBar(){
    console.log("bottom-bar")
    return(
        <div className="bottom-bar" style={{height:`${window.screen.height*0.05}px`, width:`${window.screen.width}px`, top:`${window.screen.height*0.72}px`}}>
            <button><Link to="/"><span class="material-symbols-outlined">home</span></Link></button>
            <button><i class="las la-search"></i></button>
            <button><Link to="/list"><span class="material-symbols-outlined">filter_list</span></Link></button>
            <button><i class="las la-comment"></i></button>
            <button><span class="material-symbols-outlined">account_circle</span></button>
        </div>
    )
}

export default BottomBar;