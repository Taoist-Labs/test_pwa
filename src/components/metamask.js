import {MetaMaskSDK} from '@metamask/sdk';
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import Abi from "../abi/Box2.json";
import '@ethersproject/shims';


export  default  function Metamask() {
    const [ethereum,setEthereum] = useState();
    const [account,setAccount] = useState();
    const [rt,setRt] = useState()
    const [tx,setTx] = useState();
    const [canOpenLink,setCanOpenLink] =useState(true);


    useEffect(() => {

        getP()



        document.addEventListener('visibilitychange',getStatus)

        return () =>{
            document.removeEventListener('visibilitychange',getStatus);
        }



    }, []);


    const getStatus = () =>{
        setCanOpenLink(document.visibilityState === "visible");
    }



    const getP = async() =>{
        const MMSDK = new MetaMaskSDK({
            // useDeeplink:false,
            openDeeplink: (link) => {
                if(canOpenLink){
                    window.open(link,"_self");
                }

            },
            // checkInstallationImmediately:true,
            // timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
            dappMetadata: {
                name: 'My dapp', // The name of your dapp.
                url: 'http://192.168.1.4:3000/', // The URL of your website.
            },
        });

        await MMSDK.init();
        let aa = await MMSDK.getProvider();
        console.log(aa)
        setEthereum(aa)
    }

    const connect =  async()=> {
        try {
            const result = await ethereum.request({method: 'eth_requestAccounts'});
            console.log('RESULT', result);
            setAccount(result?.[0]);
        } catch (e) {
            console.log('ERROR', e);

        }
    };



    const sign = async() =>{
            const provider = new ethers.providers.Web3Provider(ethereum);
            let sg = await provider.getSigner();
            let rt = await sg.signMessage("12456");
            setRt(rt)
            console.log(rt);




        // try {
        //     const result = await ethereum.request({method: 'personal_sign',     params: ["0x12345", account],});
        //     console.log('RESULT', result);
        //     setRt(result)
        // } catch (e) {
        //     console.log('ERROR', e);
        //
        // }
    }

    const switchChain = async() =>{
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }],
            });
        } catch (switchError) {

        }
    }

    const trans = async() =>{
        const provider = new ethers.providers.Web3Provider(ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
            "0xc74dee15a4700d5df797bdd3982ee649a3bb8c6c", Abi.abi,signer,
        );

        const rt = await contract.connect(signer).setX(20);
        console.log(rt)
        const aa = await rt.wait();
        console.log(aa)
    }

  return (
      <>

          {
              JSON.stringify(canOpenLink)
          }-
          <hr/>

          <div>{account}---</div>
          <button onClick={connect}>connect</button>

          <hr/>
          <div>{rt}</div>
          <button onClick={sign}>sign</button>

          <hr/>
          <div>{tx}</div>
          <button onClick={trans}>test transaction</button>

          <hr/>
          <button onClick={switchChain}>switch</button>

      </>
  )
}


