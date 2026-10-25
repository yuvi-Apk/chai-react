import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(0);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "";

      str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";

      if (specialCharAllowed) str += "!@#$%^&*()";

      for (let index = 0; index < length; index++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        const char = str[randomIndex];
        pass += char;
      }

      setPassword(pass);
    },
    [numberAllowed, specialCharAllowed, length, setPassword],
  );

  useEffect(
    () => passwordGenerator(),
    [numberAllowed, specialCharAllowed, length],
  );

  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-gray-600 text-white h-screen flex justify-center items-center">
      <div className="bg-gray-900 w-1/2 rounded-2xl p-6 flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold">Password Generator</h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="bg-amber-600 rounded-xl px-4 py-2 flex-1 text-black font-semibold"
            placeholder="password"
            ref={passwordRef}
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 font-semibold transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="length" className="font-semibold">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-1"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={(e) => setNumberAllowed(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Numbers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={specialCharAllowed}
                onChange={(e) => setSpecialCharAllowed(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
