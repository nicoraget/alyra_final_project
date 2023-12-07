import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [sepolia, hardhat],
    [
        //alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
        publicProvider()
    ]
)

const { connectors } = getDefaultWallets({
    appName: 'Alyra Project final',
    //projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    projectId: '117f9f01f9b2b60fb637b760fb580ad8',
    chains
});
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

export { wagmiConfig, chains }