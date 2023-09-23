import React from "react";
import "./App.css";
import RouterLink from "./router";

var u = navigator.userAgent,
  isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
  isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log("[isAndroid]:", isAndroid);
console.log("[isiOS]:", isiOS);

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
      {!window.Notification && isAndroid && (
        <>
          <div>
            <button onClick={installApp}>安装</button>
          </div>
          <hr />
        </>
      )}

      <RouterLink />
    </div>
  );
}

export default App;
