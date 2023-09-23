import axios from "axios";
import { nanoid } from 'nanoid';
import {useEffect, useState} from "react";

const Sign = ()=>{

    const [id,setId] = useState();
    const [address,setAddress] = useState();

    useEffect(() => {
        const id = nanoid();
        setId(id)
    }, []);
    const handleLinkClick = (e) => {
        e.preventDefault();
        window.open(`https://metamask.app.link/dapp/rnljm-111-30-195-155.a.free.pinggy.online/login/${id}`, "_blank");
    };

    const getAddress = async() =>{
        await axios.get(`https://clever-bat-54.deno.dev/getAddress?id=${id}`).then((req)=>{
            console.log(req.data)
            setAddress(req.data.address)
        })
    }

    return (
        <>

            {address}
            <button onClick={(e)=>handleLinkClick(e)}>connect metamask</button>

            <button onClick={()=>getAddress()}>get address</button>
        </>
    )
}

export default Sign;
