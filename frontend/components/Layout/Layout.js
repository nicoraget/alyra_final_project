'use client'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {isUserExist} from "@/services/betDAOService";
import {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {Text} from "@chakra-ui/react";
import {getWalletClient} from "@wagmi/core";
import {RegisterCard} from "@/components/Layout/RegisterCard";

const Layout = ({children}) => {
    const {address, isConnected} = useAccount();
    const [userExist, setUserExist] = useState(false);

    const getUserToId = async () => {
        const walletClient = await getWalletClient();
        const fetchUserExist = await isUserExist(walletClient)
        if (BigInt(fetchUserExist) === 1n) {
            setUserExist(true);
        } else if (BigInt(fetchUserExist) === 0n) {
            setUserExist(false)
        }
    }

    useEffect(() => {
        getUserToId()
    })

    useEffect(() => {
        getUserToId();
    }, [address]);

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
    const cardStyle = {
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '2rem',
    }

    return (
        <div style={wrapper}>
            <Header style={headerAndFooterStyle}></Header>
            <main style={childrenStyle}>
                {!isConnected && <Text>Please connect your wallet</Text>}
                <div style={cardStyle}>{!userExist && isConnected && <RegisterCard/>}</div>
                {userExist && isConnected && children}
            </main>
            <Footer style={headerAndFooterStyle}/>
        </div>
    )
}
export default Layout