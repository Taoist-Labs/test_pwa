import subscribeToPushMessages from "./utils/subscribe";
import React from "react";
import usePushNotifications from "./hooks/usePushNotifications";
import Sign from "./components/sign";
import Unipass from "./components/unipass";

export default function Home(){
    const { permission, handlePermission } = usePushNotifications();

    return <div>
        <div>permission: {permission}</div>
        <div>
            <button onClick={handlePermission}>request permission</button>
        </div>
        <div>
            <button onClick={subscribeToPushMessages}>订阅n</button>
        </div>
        <hr/>
        <Sign />
        <Unipass />
    </div>
}
