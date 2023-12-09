'use client'
import Link from "next/link";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {Button, ButtonGroup, Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getIsValidator} from "@/services/betDAOService";
import {useAccount} from "wagmi";

const Header = () => {

    const headerStyle = {
        padding: '2rem',
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
                <Button color='#FF595A'><Link href="/">BetWave</Link></Button>
                <Button color='#FF595A'><Link href="/betValidation">Bet validation</Link></Button>
                <Button color='#FF595A'><Link href="/dao">DAO</Link></Button>
            </ButtonGroup>
            <ConnectButton/>
        </Flex>
    );
}

export default Header;