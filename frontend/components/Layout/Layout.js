'use client'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {isUserExist} from "@/services/betDAOService";
import {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {Text} from "@chakra-ui/react";
import {getWalletClient} from "@wagmi/core";

const Layout = ({children}) => {
    const {isConnected} = useAccount();
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        const getUserToId = async () => {
            const walletClient= await getWalletClient();
            const fetchUserExist = await isUserExist(walletClient)
            if (BigInt(fetchUserExist) === 1n) {
                setUserExist(true);
            } else if (BigInt(fetchUserExist) === 0n) {
                setUserExist(false)
            }
        }
        getUserToId();
    });

    const wrapper = {
        height: '100vh',
        boxSizing: 'border-box',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#CAC0B3',
    }

    const headerAndFooterStyle = {
        flexGrow: '0',
        flexShrink: '0',
    }

    const childrenStyle = {
        flexGrow: '1',
    }
    return (
        <div style={wrapper}>
            <Header style={headerAndFooterStyle}></Header>
            <main style={childrenStyle}>
            {!isConnected && <Text>Please connect your wallet</Text>}
            {!userExist && isConnected && <Text>Please register</Text>}
            {userExist && isConnected && children}
            </main>
            <Footer style={headerAndFooterStyle}/>
        </div>
    )
}
export default Layout