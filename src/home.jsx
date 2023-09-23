import React from "react";
// import Sign from "./components/sign";
import Unipass from "./components/unipass";
import Notification from "./components/notification";
import WalletConnectHome from "./walletConnect";
import Joyid from "./components/joyid";

export default function Home(){

    return (
      <div>
        <Notification />
        {/*<Sign />*/}
          <hr/>
        <Unipass />
          <hr/>
          <WalletConnectHome />
          <hr/>
          <Joyid />
      </div>
    );
}
