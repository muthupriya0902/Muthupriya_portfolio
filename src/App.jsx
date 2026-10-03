import { useState } from "react";
import {
  About,
  Expertise,
  Footer,
  Main,
  Navigation,
  Project,
  Timeline,
} from "./components";
import "./index.scss";

function App() {
  const [mode, setMode] = useState("light");

  const handleModeChange = () => {
    setMode((currentMode) => currentMode === "dark" ? "light" : "dark");
  };

  return (
    <div className={`main-container ${mode}-mode`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
      <main>
        <Main />
        <About />
        <Project />
        <Expertise />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
}

export default App;
