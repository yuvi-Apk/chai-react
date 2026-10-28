import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  // actual change in theme

  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.remove("light", "dark");
    html?.classList.add(themeMode);

    // solution 2
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ darkTheme, lightTheme, themeMode }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* Theme toggle button goes here */}

            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Your application content goes here */}

            <Card/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
