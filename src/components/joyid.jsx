import * as React from 'react';
import { authWithRedirect, authCallback } from '@joyid/core';
import {useState} from "react";

export default function Joyid() {

    const [account, setAccount] = useState();
    const isRedirectFromJoyID = new URL(window.location.href).searchParams.has(
        'joyid-redirect'
    );
    const authOnClick = async () =>  {
        authWithRedirect({
            redirectURL: window.location.href,
            name: 'Awesome App',
            challenge: 'Sign this for me',
            logo: 'https://reactjs.org/logo-180x180.png',
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
        }
    }, []);
    return (
        <div>
            <div>{account}</div>
            <button onClick={authOnClick}>Auth With JoyID</button>
        </div>
    );
}
