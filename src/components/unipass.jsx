import { UniPassPopupSDK } from "@unipasswallet/popup-sdk";
import { useState } from "react";

export default function Unipass() {
  const [account, setAccount] = useState();
  const [sig, setSig] = useState("");

  const upWallet = new UniPassPopupSDK({
    env: "test",
    // for polygon mumbai
    chainType: "polygon",
    // choose localStorage if you want to cache user account permanent
    storageType: "sessionStorage",
    appSettings: {
      // theme: UniPassTheme.LIGHT,
      appName: "UniPass Wallet Demo",
      appIcon: "",
    },
  });
  const connect = async () => {
    try {
      const account = await upWallet.login({
        email: true,
        eventListener: (event) => {
          console.log("event", event);
          const { type, body } = event;
          console.log("account", body);
        },
        connectType: "both",
      });
      const { address, email } = account;
      setAccount(address);
      console.log("account", address, email);
    } catch (err) {
      console.log("connect err", err);
    }
  };
  const signMsg = async () => {
    const msg = "hello pwa";
    try {
      const options = { isEIP191Prefix: false, onAuthChain: true };
      const sig = await upWallet.signMessage(msg, options);
      setSig(sig);
    } catch (err) {
      console.log("auth err", err);
    }
  };
  return (
    <div>
      <div>{account}</div>
      {account ? (
        <button
          onClick={() => {
            setAccount("");
            setSig("");
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={() => connect()}>unipass</button>
      )}

      {account && (
        <div>
          <button onClick={signMsg}>sign</button>
          {sig && (
            <div>
              <p>sig result:</p>
              <p>{sig}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
