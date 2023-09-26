import {
  connect,
  signMessage,
  connectWithRedirect,
  connectCallback,
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
      let state;
      try {
        state = connectCallback();
        console.log("-------state:", state);
        if (state?.address) {
          setAccount(state.address);
        }
      } catch (error) {
        console.error("-------callback:", error);
      }
    };
    redirectHome();
  }, []);

  const onConnectRedirect = () => {
    const url = buildRedirectUrl("connect");
    connectWithRedirect(url);
  };

  const onConenctPopup = async () => {
    setIsLoading(true);
    try {
      const address = await connect();
      setAccount(address);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signMsg = async () => {
    const r = await signMessage("Hello World", account);
    setSig(r);
  };
  return (
    <div>
      {account ? (
        <div>
          <p>{account}</p>
          <p>
            <button onClick={signMsg}>sign</button>
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
