import { useState } from "react";
export default function Contador(){  
    const [count, setCount] = useState(0)


    const sumar=()=>(setCount(count +1));
    const restar=()=>((count>0)?setCount(count -1):setCount(0))
    
    return (
        <div className="contador-container">
            <span>Contador: {count}</span>
            <button onClick={sumar}>Sumar</button>
            <button onClick={restar}>Restar</button>
        </div>
    );
}
