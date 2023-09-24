import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, bscTestnet,bsc } from 'wagmi/chains';
import MyInner from "./components/myInner";
import {useEthersProvider, useEthersSigner} from "./components/ethersNew";

const chains = [arbitrum, mainnet, polygon,bscTestnet,bsc]
const projectId = '53f15e1877196c3d22e0d1a3dea1e8e6'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains);




export default function WC() {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <MyInner />
            </WagmiConfig>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    )
}
