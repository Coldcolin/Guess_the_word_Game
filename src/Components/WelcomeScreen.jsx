const WelcomeScreen=({setCategoryState, gameArray, setStart})=>{
    return(
        <div className='Welcome-screen'>
          <h1>Guess the word Game</h1>
            <h3>Select Category</h3>
            <ul>
              {
                gameArray.map((e, i)=>(
                    <li key={i} onClick={()=> {
                        setCategoryState(e.category);
                        setStart(1)}
                    }>{e.category}</li>
                ))
              }
            </ul>
        </div>
    )
}

export default WelcomeScreen