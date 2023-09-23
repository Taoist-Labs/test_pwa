import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function MyInner() {
    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { isConnected,address } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? "Disconnect" : "Wallet Connect";

    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }

    return (

        <div>
            <div>{address}</div>
            <button onClick={onClick} disabled={loading}>
                {loading ? "Loading..." : label}
            </button>
        </div>

    );
}
