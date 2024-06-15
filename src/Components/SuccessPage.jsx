import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const SuccessPage =({setStart})=>{
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(()=>{
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 60000);
    },[])
    return(
        <div style={{ textAlign: 'center', marginTop: '50px', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
            <h1>You have won!!!</h1>
            <div className="try-again" onClick={()=> setStart(0)}>Try Again</div>
            {showConfetti && <Confetti width={width} height={height} />}
        </div>
    )
}

export default SuccessPage