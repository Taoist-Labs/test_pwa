import { UniPassProvider } from "@unipasswallet/ethereum-provider";
import {ethers, providers, utils} from "ethers";
import {useState} from "react";
import Abi from "../abi/Box2.json";

export default function Unipass() {

    // init UniPass Provider
    const [tx,setTx] = useState();
    const [addr,setAddr] = useState();
    const [rt,setRt] = useState()

    const getW = async() =>{
        const upProvider = new UniPassProvider({
            chainId: 97,
            returnEmail: false,
            appSetting: {
                appName: 'test dapp',
                appIcon: 'your icon url',
            },
            rpcUrls: {
                mainnet: "https://mainnet.infura.io/v3/",
                polygon: "https://polygon.llamarpc.com",
                bscTestnet:"https://data-seed-prebsc-1-s1.binance.org:8545"
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


    const trans = async() =>{
        console.error("------------start")
        try{
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

            let signer = await provider.getSigner();
            const contract = new ethers.Contract(
                "0xc74dee15a4700d5df797bdd3982ee649a3bb8c6c", Abi.abi,signer,
            );

            const rt = await contract.connect(signer).setX(20);
            console.log(rt)
            setTx(rt)
            const aa = await rt.wait();
            console.log(aa)
        }catch (e) {
            console.error(e)
        }
    }
    return (
      <section>
        <h3>Unipass</h3>

        <div>{addr}</div>
        <button onClick={getW}>unipass</button>

        <div
          style={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {rt}
        </div>
        <button onClick={signM}>sign message</button>



          <hr/>
          <div>{JSON.stringify(tx)}</div>
          <button onClick={trans}>test transaction</button>
      </section>
    );
}
