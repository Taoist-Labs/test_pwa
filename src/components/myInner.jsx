import { useWeb3Modal } from "@web3modal/react";
import {useEffect, useState} from "react";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { useEthersProvider,useEthersSigner } from './ethersNew';
import {ethers} from "ethers";
import Abi from "../abi/Box2.json";
import { Web3NetworkSwitch } from '@web3modal/react'

export default function MyInner() {
    const [loading, setLoading] = useState(false);
    const [bal, setBal] = useState();
    const { open } = useWeb3Modal();
    const { isConnected,address } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? "Disconnect" : "Wallet Connect";

    const { chain, chains } = useNetwork();

    console.log(chains,chain)

    const provider = useEthersProvider({chainId:chain});
    const signer = useEthersSigner({chainId:chain});

    const [totalSCR, setTotalSCR] = useState('0');
    const [hx, setHx] = useState();

    console.log(chain,chains)

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


    const getMyBalance = async() =>{
        console.log(provider)
        const bal = await provider.getBalance(address);
        console.log(bal)
        setBal(ethers.utils.formatEther(bal))
    }

    const Signer = async() =>{
        //chain 1
        console.log(signer)

        // const contract = new ethers.Contract(
        //     "0xc74dee15a4700d5df797bdd3982ee649a3bb8c6c",
        //     [
        //         {
        //             inputs: [],
        //             name: 'totalSupply',
        //             outputs: [
        //                 {
        //                     internalType: 'uint256',
        //                     name: '',
        //                     type: 'uint256',
        //                 },
        //             ],
        //             stateMutability: 'view',
        //             type: 'function',
        //         },
        //     ],
        //     signer,
        // );
        // const supply = await contract.totalSupply();
        // setTotalSCR(ethers.utils.formatEther(supply));


    }

    const signMsg = async() =>{
        let rt = await signer.signMessage("12456");
        console.log(rt);
        setHx(rt)


        const price = await signer.getGasPrice();
        console.log(price)
    }

    const trans = async() =>{

        const contract = new ethers.Contract(
            "0xc74dee15a4700d5df797bdd3982ee649a3bb8c6c", Abi.abi,signer,
        );

        const rt = await contract.connect(signer).setX(20);
        console.log(rt)
        const aa = await rt.wait();
        console.log(aa)
    }

    const switchChain = async() =>{
        await open({route:'SelectNetwork'})
    }

    return (

        <div>
            <div>{address}</div>
            <button onClick={onClick} disabled={loading}>
                {loading ? "Loading..." : label}
            </button>

            <div>----{bal}---</div>
            <button onClick={()=>getMyBalance()}>provider</button>

            <div>---{totalSCR}</div>

            <button onClick={Signer}>signer</button>

            <div>---{hx}</div>
            <button onClick={signMsg}>Sign msg</button>

            <button onClick={trans}>test transaction</button>

            <div>{chain?.id}</div>
            <button onClick={switchChain}>switch</button>

            <Web3NetworkSwitch />

        </div>

    );
}
