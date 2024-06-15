const Keys=({i, e, addValue, wordTruth})=>{

    return(
        <div className={wordTruth.includes(e.toUpperCase())? 'Keys':'Bad'} key={i} onClick={()=> addValue(e, i)}>
        {e}
        </div>
    )
}
export default Keys;