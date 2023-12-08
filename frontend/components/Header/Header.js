'use client'
import Link from "next/link";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {Button, ButtonGroup, Flex, HStack, Stack} from "@chakra-ui/react";
import {AddUser} from "@/components/UserManagement/AddUser";
import {useAccount} from "wagmi";
import {getWalletClient} from "@wagmi/core";
import {isUserExist} from "@/services/betDAOService";
import {useEffect, useState} from "react";

const Header = () => {

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

    const headerStyle = {
        padding:'2rem',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001233',
        height: '4rem'
    }

    const buttonDiv = {
        alignContent: 'left',
        paddingRight: '10rem',
    }

    return (
            <Flex style={headerStyle}>
                    <ButtonGroup variant='link' spacing='6' style={buttonDiv}>
                <Button color='#FF595A' ><Link href="/">BetWave</Link></Button>
                <Button color='#FF595A' ><Link href="/betValidation">Bet validation</Link></Button>
                <Button color='#FF595A' ><Link href="/dao">DAO</Link></Button>
                    </ButtonGroup>
                    {!userExist && <AddUser/>}
                <ConnectButton/>
            </Flex>
    );
}

export default Header;