import React from 'react';
import './App.css';
import usePushNotifications from "./hooks/usePushNotifications"
import subscribeToPushMessages from "./utils/subscribe";

function App() {
  const { permission, handlePermission } = usePushNotifications();

  return (
    <div className="App">
      <div>permission: {permission}</div>
      <div>
        <button onClick={handlePermission}>request permission</button>
      </div>
      <div>
        <button onClick={subscribeToPushMessages}>订阅n</button>
      </div>
    </div>
  );
}

export default App;
