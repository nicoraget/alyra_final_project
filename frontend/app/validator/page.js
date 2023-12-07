'use client';
import {Button, Flex, Text} from "@chakra-ui/react";
import {getWalletClient, prepareWriteContract, writeContract} from "@wagmi/core";
import {betWaveDAO, BetWaveDAOAbi, BetWaveDAOAddress} from "@/constants/BetWaveDAO";
import {parseEther} from "viem";

const validator = () => {
    const buttonStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    const addValidator = async() => {
        try {
            const walletClient = await getWalletClient();
            const {request} = await prepareWriteContract({
                address: betWaveDAO.address,
                abi: betWaveDAO.abi,
                account: walletClient?.account,
                functionName: "addValidators",
                value: parseEther('1'),
            });
            const {hash} = await writeContract(request)
            console.log(hash)
        } catch (error) {
            console.log(error)
        }
    }

    const withdrawFormValidator = async() =>
    {
        try {
            const walletClient = await getWalletClient();
            const {request} = await prepareWriteContract({
                address: betWaveDAO.address,
                abi: betWaveDAO.abi,
                account: walletClient?.account,
                functionName: "withdrawFromValidators",
            });
            const {hash} = await writeContract(request)
            console.log(hash)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex>
            <div>
                <Text fontSize='2xl' noOfLines={3} maxWidth={"60rem"}> Welcome to betWave validation. To become
                    validator you need to stack 1 ether. You will get rewarded for each successfull bet
                    validation </Text>
                <div style={buttonStyle}>
                    <Button colorScheme='telegram' onClick={addValidator}>Join</Button>
                    <Button colorScheme='telegram' onClick={withdrawFormValidator}>Withdraw</Button>
                </div>
            </div>
        </Flex>
    )
};
export default validator