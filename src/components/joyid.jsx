import * as React from "react";
import {
  authWithRedirect,
  authCallback,
//   signWithRedirect,
  //   signCallback,
} from "@joyid/core";
import { useState } from "react";

export default function Joyid() {
  const [account, setAccount] = useState();
  const [sig, setSig] = useState("");

  const isRedirectFromJoyID = new URL(window.location.href).searchParams.has(
    "joyid-redirect"
  );
  const authOnClick = async () => {
    authWithRedirect({
      redirectURL: window.location.href,
      name: "pwa-demo",
      challenge: "Sign this for me",
      logo: "https://reactjs.org/logo-180x180.png",
    });
  };
  React.useEffect(() => {
    if (isRedirectFromJoyID) {
      const authRes = authCallback();
      setAccount(authRes.address);
      // if (authRes.error == null && authRes.type === 'Auth') {
      //     // see console for the details
      //     console.log(`Authenticated user info:`, authRes.data);
      // }
      //   const res = signCallback();
      //   console.log("res:", res);
      //   if (res.error != null) {
      //     console.error(res.error);
      //   } else {
      //     // the user has authenticated,
      //     // do something with res.data, it's type safe!
      //   }
    }
  }, []);
  const signMsg = async () => {
    const msg = "hello pwa";
    const request = {
      // redirect to /sign
      redirectURL: window.location.href,
      title: "pwa-demo",
      logo: "https://reactjs.org/logo-180x180.png",
      challenge: msg,
    };
    // try {
    //   signWithRedirect(request);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div>
      <div>{account}</div>
      <button onClick={authOnClick}>Auth With JoyID</button>
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
