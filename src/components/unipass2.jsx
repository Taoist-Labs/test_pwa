import { UniPassProvider } from "@unipasswallet/ethereum-provider";
import {ethers, providers, utils} from "ethers";
import {useState} from "react";

export default function Unipass() {

    // init UniPass Provider

    const [addr,setAddr] = useState();
    const [rt,setRt] = useState()

    const getW = async() =>{
        const upProvider = new UniPassProvider({
            chainId: 137,
            returnEmail: false,
            appSetting: {
                appName: 'test dapp',
                appIcon: 'your icon url',
            },
            rpcUrls: {
                mainnet: "https://mainnet.infura.io/v3/",
                polygon: "https://polygon.llamarpc.com",
                // bscMainnet: "your bsc mainnet rpc url",
                // rangersMainnet: "your rangers mainnet rpc url",
                // arbitrumMainnet: "your arbitrum mainnet rpc url",
                //
                // polygonMumbai: "your polygon testnet rpc url",
                // goerli: "your goerli testnet rpc url",
                // bscTestnet: "your bsc testnet rpc url",
                // rangersRobin: "your rangers testnet rpc url",
                // arbitrumTestnet: "your arbitrum testnet rpc url",
            },
        });
        await upProvider.connect();

        // init ethers Web3Provider
        const provider = new providers.Web3Provider(upProvider, "any");
        const signer = provider.getSigner();

        // get address
        const address = await signer.getAddress();
        console.log("provider address", address);
        setAddr(address)

        // get balance
        // const balance = await signer.getBalance();
        // console.log("balance", utils.formatEther(balance));
        //
        // // switch chain
        // await provider.send("wallet_switchEthereumChain", [{ chainId: 1 }]);
        // const chainId = await signer.getChainId();
        // console.log("chainId", chainId);
    }

    const signM = async () =>{
        // const provider = new ethers.providers.Web3Provider(ethereum);
        const upProvider = new UniPassProvider({
            chainId: 137,
            returnEmail: false,
            appSetting: {
                appName: 'test dapp',
                appIcon: 'your icon url',
            },
            rpcUrls: {
                mainnet: "https://mainnet.infura.io/v3/",
                polygon: "https://polygon.llamarpc.com",
                // bscMainnet: "your bsc mainnet rpc url",
                // rangersMainnet: "your rangers mainnet rpc url",
                // arbitrumMainnet: "your arbitrum mainnet rpc url",
                //
                // polygonMumbai: "your polygon testnet rpc url",
                // goerli: "your goerli testnet rpc url",
                // bscTestnet: "your bsc testnet rpc url",
                // rangersRobin: "your rangers testnet rpc url",
                // arbitrumTestnet: "your arbitrum testnet rpc url",
            },
        });
        await upProvider.connect();

        // init ethers Web3Provider
        const provider = new providers.Web3Provider(upProvider, "any");
        const signer = provider.getSigner();
        let rt = await signer.signMessage("12456");
        setRt(rt)
        console.log(rt);
    }
    return <div>
        <div>{addr}</div>
        <button onClick={getW}>unipass</button>

        <div>{rt}</div>
        <button onClick={signM}>sign message</button>
    </div>
}
