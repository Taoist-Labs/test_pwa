import React from "react";
import "./App.css";
import RouterLink from "./router";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt Event fired", e);
  deferredPrompt = e;
});

function App() {
  console.log("deferredPrompt:", deferredPrompt);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
  };
  return (
    <div className="App">
      <div>
        <button onClick={installApp}>安装</button>
      </div>
      <hr />
      <RouterLink />
    </div>
  );
}

export default App;
