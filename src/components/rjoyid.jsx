import {
  connectWithRedirect,
  connectCallback,
  signMessageWithRedirect,
  signMessageCallback,
  signTransactionWithRedirect,
} from "@joyid/evm";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import ERC20_ABI from "../abi/abi.json";

function buildRedirectUrl(action) {
  const url = new URL(`${window.location.origin}/test_pwa`);
  url.searchParams.set("action", action);
  return url.href;
}

const buildERC20Data = (toAddress, amount) => {
  
  const iface = new ethers.utils.Interface(ERC20_ABI);
  const rawData = iface.encodeFunctionData("transfer", [toAddress, amount]);
  return rawData;
};


export default function ConnectJoyid() {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();
  const [sig, setSig] = useState("");
  const [toAddress, setToAddress] = useState("0xa2f87DC5ec6F659dC7A13c8f12663D251E72B698");

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
    connectWithRedirect(url, {
      rpcURL: "https://eth.llamarpc.com",
      network: {
        chainId: 1,
        name: "Ethereum Mainnet",
      },
    });
  };

  const onSignMessageRedirect = () => {
    const msg = "Hello World";
    const url = buildRedirectUrl("sign-message");
    signMessageWithRedirect(url, msg, account, {
      state: msg,
    });
  };

  const onSendRedirect = () => {
    const url = buildRedirectUrl("send-erc20");
    signTransactionWithRedirect(url, {
      to: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      from: account,
      value: "0",
      data: buildERC20Data(toAddress, ethers.utils.parseUnits("1", 6)),
    });
  };

  return (
    <section>
      <h3>JoyID</h3>
      {account ? (
        <div>
          <p>{account}</p>
          <p>
            <button onClick={onSignMessageRedirect}>sign</button>
          </p>
          {sig && (
            <div>
              <p>sig result:</p>
              <p
                style={{
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {sig}
              </p>
            </div>
          )}
          <p>
            <input
              type="text"
              placeholder="reciever"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
            <button onClick={onSendRedirect}>send</button>
          </p>
        </div>
      ) : (
        <button onClick={onConnectRedirect}>Connect Joyid</button>
      )}
    </section>
  );
}
