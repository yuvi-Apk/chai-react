
import React, { useState } from 'react'
import { colors } from './colors'

const App = () => {
  const [bgColor, setBgColor] = useState(colors.blue)
  const colorEntries = Object.entries(colors)

  return (
    <div style={{backgroundColor: bgColor, height: '100vh', transition: 'background-color 0.3s', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <table style={{borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
          <thead>
            <tr>
              <th style={{padding: '12px 20px', textAlign: 'left', borderBottom: '2px solid #ddd', fontWeight: 'bold'}}>Color Name</th>
              <th style={{padding: '12px 20px', textAlign: 'left', borderBottom: '2px solid #ddd', fontWeight: 'bold'}}>Color Code</th>
              <th style={{padding: '12px 20px', textAlign: 'center', borderBottom: '2px solid #ddd', fontWeight: 'bold'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {colorEntries.map(([name, code]) => (
              <tr key={name}>
                <td style={{padding: '12px 20px', borderBottom: '1px solid #eee'}}>{name}</td>
                <td style={{padding: '12px 20px', borderBottom: '1px solid #eee', fontFamily: 'monospace'}}>{code}</td>
                <td style={{padding: '12px 20px', borderBottom: '1px solid #eee', textAlign: 'center'}}>
                  <button
                    onClick={() => setBgColor(code)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: code,
                      border: '2px solid #ccc',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
