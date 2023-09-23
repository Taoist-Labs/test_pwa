import React, { useEffect } from 'react';
import './App.css';
import usePushNotifications from "./hooks/usePushNotifications"
import subscribeToPushMessages from "./utils/subscribe";
import RouterLink from './router';
import { BrowserRouter  } from "react-router-dom";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt Event fired", e);
  deferredPrompt = e;
});

function App() {

  console.log("deferredPrompt:", deferredPrompt);

  const installApp =async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
  }

  return (
    <div className="App">

        <BrowserRouter>


            <RouterLink />

        </BrowserRouter>

    </div>
  );
}

export default App;
