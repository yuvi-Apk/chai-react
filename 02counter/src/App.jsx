import React from "react";
import { useState } from "react";

const App = () => {


  const [counter,setCounter] = useState(15);

  const addValue = () => {
    setCounter(counter +1)
  };

  const removeValue = () => {
    setCounter(counter -1)
  };

  return (
    <>
      <h1> Chai aur counter</h1>

      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value</button>

      <br />

      <button onClick={removeValue}>removed value</button>
    </>
  );
};

export default App;
