import {MetaMaskSDK} from '@metamask/sdk';
import {useEffect, useState} from "react";
import {ethers} from "ethers";


export  default  function Metamask() {
    const [ethereum,setEthereum] = useState();
    const [account,setAccount] = useState();
    const [rt,setRt] = useState()


    useEffect(() => {

        getP()
    }, []);


    const getP = async() =>{
        const MMSDK = new MetaMaskSDK({
            // useDeeplink:false,
            openDeeplink: (link) => {
                window.open(link,"_self"); // Use React Native Linking method or another way of opening deeplinks.
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

  return (
      <>
          <hr/>

          <div>{account}---</div>
          <button onClick={connect}>connect00</button>

          <hr/>
          <div>{rt}</div>
          <button onClick={sign}>sign</button>

          <hr/>
          <button onClick={switchChain}>switch</button>

      </>
  )
}


