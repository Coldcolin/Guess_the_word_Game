import { FaHeart } from "react-icons/fa";
const Lives=({i})=>{
    return(
        <div className='Lives' key={i}>
            <FaHeart/>
        </div>
    )
}

export default Lives