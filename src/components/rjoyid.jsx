import {
  connectWithRedirect,
  connectCallback,
  signMessageWithRedirect,
  signMessageCallback,
} from "@joyid/evm";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function buildRedirectUrl(action) {
  const url = new URL(`${window.location.origin}/redirect`);
  url.searchParams.set("action", action);
  return url.href;
}

export default function ConnectJoyid() {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();
  const [sig, setSig] = useState("");

  useEffect(() => {
    const redirectHome = () => {
      const _address = localStorage.getItem("joyid-address");
      if (_address) {
        setAccount(_address);
        return;
      }
      let state;
      try {
        state = connectCallback();
        console.log("-------state:", state);
        if (state?.address) {
          setAccount(state.address);
          localStorage.setItem("joyid-address", state.address);
          return true;
        }
      } catch (error) {
        console.error("-------callback:", error);
      }
    };
    const redirectSignMessage = () => {
      let state;
      try {
        state = signMessageCallback();
        setSig(state.signature);
        console.log("-------state sign:", state);
        return true;
      } catch (error) {
        console.error("-------callback sign:", error);
      }
    };
    redirectHome();
    redirectSignMessage();
  }, []);

  const onConnectRedirect = () => {
    const url = buildRedirectUrl("connect");
    connectWithRedirect(url);
  };

  const onSignMessageRedirect = () => {
    const msg = "Hello World";
    const url = buildRedirectUrl("sign-message");
    signMessageWithRedirect(url, msg, account, {
      state: msg,
    });
  };

  return (
    <div>
      {account ? (
        <div>
          <p>{account}</p>
          <p>
            <button onClick={onSignMessageRedirect}>sign</button>
          </p>
          {sig && (
            <div>
              <p>sig result:</p>
              <p>{sig}</p>
            </div>
          )}
        </div>
      ) : (
        <button onClick={onConnectRedirect}>Connect Joyid</button>
      )}
    </div>
  );
}
