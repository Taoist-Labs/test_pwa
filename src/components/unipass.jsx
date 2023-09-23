import { UniPassPopupSDK } from "@unipasswallet/popup-sdk";

export  default function Unipass(){

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
    const connect = async() =>{
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
            console.log("account", address, email);
        } catch (err) {
            console.log("connect err", err);
        }
    }
    return <div>
        <button onClick={()=>connect()}>unipass</button>
    </div>
}
