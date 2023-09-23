import React from "react";
import Sign from "./components/sign";
import Unipass from "./components/unipass";
import Notification from "./components/notification";
import WalletConnectHome from "./walletConnect";

export default function Home(){

    return (
      <div>
        <Notification />
        {/*<Sign />*/}
          <hr/>
        <Unipass />
          <hr/>
          <WalletConnectHome />
      </div>
    );
}
