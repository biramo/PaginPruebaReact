import { useState,useEffect } from "react";

export default function Contador2(){
const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Contador ${count}`;
  }, [count]);

  useEffect(() => {
  console.log("Renderizado");
});

useEffect(() => {
  console.log("Solo count");
}, [count]);

useEffect(() => {
  console.log("Solo una vez");
}, []);


  return (
    <div>
        <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        +
      </button>

      <button onClick={() => setCount(count - 1)}>
        -
      </button>
    </div>
  );

}

