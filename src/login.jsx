import {useEffect, useState} from "react";
import {ethers} from "ethers";
import axios from "axios";
import {useParams} from "react-router-dom";


export default function Login(){

    const [account,setAccount] = useState();
    const [status,setStatus] = useState();
     const {id} = useParams();
     console.log(id)

    useEffect(() => {
        if(!window.ethereum)return;
        getAccount()
    }, [window.ethereum]);

    const getAccount = async() =>{
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // // const signer = await provider.getSigner();
        // setAccount(signer.address);
        // console.log(signer.address)

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // sessionStorage.setItem('account',accounts[0]);
        setAccount(accounts[0]);

       await axios.post("https://clever-bat-54.deno.dev/connect/",{address:accounts[0],id}).then((req)=>{
           console.log(req)
           setStatus(req.data.success)

           setTimeout(()=>{
               // window.close()
               window.open("","_self")
           },3000)
           })
    }

    return <div>
        <div>hello</div>
        {/*{account}*/}
        <div>{status && account}</div>

        <a href="testpwa:///newEmail?to=123">testaaa</a>


    </div>
}
