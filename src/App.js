import React, { useEffect } from 'react';
import './App.css';
import usePushNotifications from "./hooks/usePushNotifications"
import subscribeToPushMessages from "./utils/subscribe";
import RouterLink from './router';

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt Event fired", e);
  deferredPrompt = e;
});

function App() {
  const { permission, handlePermission } = usePushNotifications();

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
      <div>permission: {permission}</div>
      <div>
        <button onClick={handlePermission}>request permission</button>
      </div>
      <div>
        <button onClick={subscribeToPushMessages}>订阅n</button>
      </div>
      <div>
        <button onClick={installApp}>安装</button>
      </div>
      <RouterLink />
    </div>
  );
}

export default App;
