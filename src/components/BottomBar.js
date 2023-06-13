import './BottomBar.css'

function BottomBar(){
    console.log("bottom-bar")
    return(
        <div className="bottom-bar" style={{height:`${window.screen.height*0.05}px`, width:`${window.screen.width}px`, top:`${window.screen.height*0.71}px`}}>
            <button><span class="material-symbols-outlined">home</span></button>
            <button><i class="las la-search"></i></button>
            <button><span class="material-symbols-outlined">filter_list</span></button>
            <button><i class="las la-comment"></i></button>
            <button><span class="material-symbols-outlined">account_circle</span></button>
        </div>
    )
}

export default BottomBar;