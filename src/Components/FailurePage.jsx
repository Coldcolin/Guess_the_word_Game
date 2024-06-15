const FailurePage=({setStart})=>{
    return(
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
            <h1>You are out of lives!!! 😢</h1>
            <div className="try-again" onClick={()=> setStart(0)}>Try Again</div>
        </div>
    )
}

export default FailurePage

