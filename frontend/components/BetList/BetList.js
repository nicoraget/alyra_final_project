'use client'
import {useEffect, useState} from "react";
import {useAccount, usePublicClient} from "wagmi";
import {
    Button, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import {getNewBet, getSimpleBetData, redeemGain, SetNewBet} from "@/Services/SimpleBetServices";
import * as ethers from "viem";
import {getBetFromBetOrganizer, startValidation} from "@/Services/BetOrganizerService";

export const BetList = () => {

    const {address, isConnected} = useAccount()
    const publicClient = usePublicClient();
    const [betList, setBetList] = useState([]);
    const [depositAmount, setDepositAmount] = useState('');
    const [selectedCompetitor, setSelectedCompetitor] = useState(0);


    useEffect(() => {
            const fetchBetData = async () => {
                const newBetList = await getNewBet(publicClient);
                var betMap = new Map();
                await Promise.all(newBetList.map(async (bet) => {
                    const ownerAndBetStatus = await getBetFromBetOrganizer(bet.address)
                    const updatedBetList = await getSimpleBetData(bet.address, publicClient)
                    const betStoreAsArray = {
                        owner: ownerAndBetStatus.owner,
                        betStatus: ownerAndBetStatus.betStatus,
                        comp1: bet.comp1,
                        comp2: bet.comp2,
                        betNumberComp1: 0,
                        betAmountComp1: 0,
                        oddComp1: 0,
                        BetNumberComp2: 0,
                        BetAmountComp2: 0,
                        oddComp2: 0,
                    }
                    updatedBetList.map(bid => {
                        betStoreAsArray.betNumberComp1 = Number(bid.betNumberComp1),
                            betStoreAsArray.betAmountComp1 = Number(bid.betAmountComp1),
                            betStoreAsArray.oddComp1 = Number(bid.oddComp1),
                            betStoreAsArray.BetNumberComp2 = Number(bid.BetNumberComp2),
                            betStoreAsArray.BetAmountComp2 = Number(bid.BetAmountComp2),
                            betStoreAsArray.oddComp2 = Number(bid.oddComp2)
                    })
                    betMap.set(bet.address, betStoreAsArray);
                }))
                const newArray = [];
                betMap.forEach((betResult, betAddress) => {
                    newArray.push({
                        owner: betResult.owner,
                        betStatus: betResult.betStatus,
                        address: betAddress,
                        comp1: betResult.comp1,
                        comp2: betResult.comp2,
                        betNumberComp1: Number(betResult.betNumberComp1),
                        betAmountComp1: Number(betResult.betAmountComp1),
                        oddComp1: Number(betResult.oddComp1),
                        BetNumberComp2: Number(betResult.BetNumberComp2),
                        BetAmountComp2: Number(betResult.BetAmountComp2),
                        oddComp2: Number(betResult.oddComp2),
                    })
                })
                console.log(newArray)
                setBetList(newArray)
            }
            fetchBetData();
        }, []
    )

    const callSetNewBet = async (address) => {
        await SetNewBet(address, selectedCompetitor, depositAmount)
    }

    const convertAmountToDisplay = (amount1, amount2) => {
        return ethers.formatEther((amount1 + amount2).toString())
    }

    const inputStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0 1rem 0'
    }

    return (
        <>
            <TableContainer width={"fit-content"}>
                <Table variant="simple" colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>Competitor 1</Th>
                            <Th>Odd</Th>
                            <Th>VS</Th>
                            <Th>Competitor 2</Th>
                            <Th>Odd</Th>
                            <Th isNumeric>Bet amount</Th>
                            <Th isNumeric>Participants</Th>
                            <Th>Your amount</Th>
                            <Th>Your choice</Th>
                            <Th>Bet</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {betList.map((bet) => (
                            <Tr key={bet.address}>
                                <Td>{bet.comp1}</Td>
                                <Td>{bet.oddComp1}</Td>
                                <Td>VS</Td>
                                <Td>{bet.comp2}</Td>
                                <Td>{bet.oddComp2}</Td>
                                <Td>{convertAmountToDisplay(bet.betAmountComp1, bet.BetAmountComp2)}</Td>
                                <Td>{bet.betNumberComp1 + bet.BetNumberComp2}</Td>
                                <Td>
                                    <Input
                                        placeholder="Your Bet"
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        type={'number'}>
                                    </Input>
                                </Td>
                                <Td>
                                    <Select onChange={(event) =>
                                        setSelectedCompetitor(event.target.value)
                                    }>
                                        <option value={0}>
                                            {bet.comp1}
                                        </option>
                                        <option value={1}>
                                            {bet.comp2}
                                        </option>
                                    </Select>
                                </Td>
                                <Td> <Button colorScheme='telegram'
                                             onClick={() => callSetNewBet(bet.address, selectedCompetitor)}>Bet</Button></Td>
                                <Td>
                                    {(address === bet.owner) && (bet.betStatus ===0) ?  <Button onClick={() => startValidation(bet.address)}>Start validation</Button>:
                                    <Button onClick={() => redeemGain(bet.address)}>Redeem</Button>}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>

    )
}