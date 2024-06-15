import './App.css'
import Keys from './Components/Keys';
import WelcomeScreen from './Components/WelcomeScreen';
import Words from './Components/Words'
import Lives from './Components/Lives'
import { useEffect, useState } from 'react';
import SuccessPage from './Components/SuccessPage';
import FailurePage from './Components/FailurePage';

function App() {
  const [start, setStart] = useState(0);
  const [CategoryState, setCategoryState]= useState("");
  const gameArray = [
    {
      category: "Animal",
      items: ["Antelope", "Tiger", "Giraffe", "Rabbit", "Leopard", "Hyena", "Cheetah", "Python" ]
    },
    {
      category: "Food",
      items: ["Beans", "Bread", "Spaghetti", "Potato", "Jollof", "Porridge", "Egusi"]
    },
    {
      category: "Place",
      items: ["Nigeria", "Ghana", "Ethiopia", "Sudan", "Somalia", "Washington", "Cyprus"]
    },
    {
      category: "Name",
      items: ["Grace", "Usman", "Emmanuel", "Sandra", "Samuel", "Williams", ]
    }
  ]

  const [word, setWord] = useState([]);
  const [wordTruth, setWordTruth] = useState([]);
  const [keys, setKeys] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [memory, setMemory]= useState([]);
  const [LivesArr, setLivesArr] = useState([1, 2, 3, 4, 5]);

  const addValue=(e, i)=>{
    if(wordTruth.includes(e)){
      let ind = wordTruth.indexOf(e);
      let inde = wordTruth.lastIndexOf(e);
      
      if(word[ind] === ""){
      let newWord = [...word]
      newWord[ind] = e;
      setWord(newWord);
      let newKeys = [...keys]
      newKeys[i] = "";
      setKeys(newKeys);
      }else if(word[inde] === ""){
        let theWord = [...word];
        theWord[inde] = e;
        setWord(theWord);
        let newKeys = [...keys]
        newKeys[i] = "";
        setKeys(newKeys);

      }
    }else{
      let newLives = [...LivesArr];
      if(newLives.length === 1){
        setStart(3)
        setLivesArr([1, 2, 3, 4, 5])
      }else{
        newLives.pop();
        setLivesArr(newLives);
      }
    }
  }

  const changeWord=()=>{
    for (let index = 0; index < gameArray.length; index++) {
      if(CategoryState === gameArray[index].category){
        setCategoryIndex(index)
        const arr = gameArray[index].items[Math.floor(Math.random() * gameArray[index].items.length)].toUpperCase().split("");
        setWordTruth(arr);
        setWord(arr.map((e, i, a)=>{
          if(i !== 0 && (i !== a.length -1)){
            return ""
          }else{
            return e
          }
        }))
        const arrToAddTo = arr.filter((e, i, a)=> (i !== 0 && i !== (a.length - 1)));
        let newArr= Array(3).fill(null).map(() => {
          const characters = 'abcdefghijklmnopqrstuvwxyz';
          return Array(1).fill(null).map(() => {
            return characters.toUpperCase().charAt(Math.floor(Math.random() * characters.length));
          }).join('');
        });
        const toAdd=()=>{
          for (const element of newArr) {
            const randomIndex = Math.floor(Math.random() * (arrToAddTo.length + 1));
            arrToAddTo.splice(randomIndex, 0, element);
          }
        }
        toAdd();
        setKeys(arrToAddTo);
        setMemory((prev)=> [...prev, arr.join("")])
      }
    }
  }

  useEffect(()=>{
    if((memory.length -1) === gameArray[categoryIndex].items.length){
      setStart(2);
      setLivesArr([1, 2, 3, 4, 5]);
    }else if(keys.filter((e)=> e !== "").length === 3){
      changeWord()
    }
    // console.log(memory, "memory")
  },[keys])
    
  useEffect(()=>{
    changeWord()
  },[CategoryState])

  
  
  return (
    <div className='Game-Holder'>
        {start === 1?<>
          <div className='Words-Holder'>
          {word.map((e, i,a)=>(<Words i={i} e={e}/>))}
        </div>
        <div className='KeyBoard-Holder'>
          {keys.map((e, i)=>(<Keys i={i} e={e} addValue={addValue} wordTruth={wordTruth} />))}
        </div>
        <div className='Lives-Holder'>
          { LivesArr.map((e, i)=>(<Lives i={i}/>))}
        </div>
        </>: start === 0? <><WelcomeScreen setCategoryState={setCategoryState} gameArray={gameArray} setStart={setStart}/></>: start === 2? <><SuccessPage setStart={setStart}/></>: start === 3? <><FailurePage setStart={setStart}/></>: null
        }
    </div>
  )
}

export default App
