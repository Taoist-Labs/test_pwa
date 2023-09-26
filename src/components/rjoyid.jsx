import { connect, signMessage } from "@joyid/evm";
import { useState } from "react";

export default function ConnectJoyid() {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();
  const [sig, setSig] = useState("");

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
        <button onClick={onConenctPopup}>Connect Joyid</button>
      )}
    </div>
  );
}
