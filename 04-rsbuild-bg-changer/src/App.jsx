import React, { useState } from 'react';
import { colors } from './colors';

const App = () => {
  const [bgColor, setBgColor] = useState(colors.blue);
  const colorEntries = Object.entries(colors);
console.log(colorEntries)
  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: '100vh',
        transition: 'background-color 0.3s',
        padding: '20px',
      }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">

        {
          colorEntries.map((color,index)=>(
          <button key={index}
          className="rounded-xl ml-2 block"
          style={{ backgroundColor: `${color[1]}` }}
          onClick={()=>setBgColor(color[1])}
        >
          {color[0]}
        </button>))
        }
        
      </div>
    </div>
  );
};

export default App;
