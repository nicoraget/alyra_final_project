import Link from "next/link";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {Button, Flex} from "@chakra-ui/react";

const Header = () => {

    const headerStyle = {
        padding:'2rem',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'palegoldenrod',
        height: '4rem'
    }

    return (
            <Flex style={headerStyle}>
                <Button colorScheme='telegram'><Link href="/">BetWave</Link></Button>
                <Button colorScheme='telegram'><Link href="/betValidation">Bet validation</Link></Button>
                <Button colorScheme='telegram'><Link href="/validator">Validator</Link></Button>
                <ConnectButton/>
            </Flex>
    );
}

export default Header;