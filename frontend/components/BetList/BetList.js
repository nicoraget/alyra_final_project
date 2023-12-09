'use client'
import {useEffect, useState} from "react";
import {useAccount, usePublicClient} from "wagmi";
import {
    Button, Card, CardBody, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {deploySimpleBet, getNewBet, getSimpleBetData, redeemGain, SetNewBet} from "@/services/SimpleBetServices";
import * as ethers from "viem";
import {getBetFromBetOrganizer, startValidation} from "@/services/BetOrganizerService";

export const BetList = () => {

    const {address} = useAccount()
    const publicClient = usePublicClient();
    const [betList, setBetList] = useState([]);
    const [depositAmount, setDepositAmount] = useState('');
    const [selectedCompetitor, setSelectedCompetitor] = useState(0);
    const toast = useToast();
    const [isloading, setIsloading] = useState(false);

    const fetchBetData = async () => {
        const newBetList = await getNewBet(publicClient);
        var betMap = new Map();
        await Promise.all(newBetList.map(async (bet) => {
            const betFromBetOrganizer = await getBetFromBetOrganizer(bet.address)
            const updatedBetList = await getSimpleBetData(bet.address, publicClient)
            const betStoreAsArray = {
                betName: betFromBetOrganizer.betName,
                owner: betFromBetOrganizer.owner,
                betStatus: betFromBetOrganizer.betStatus,
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
                betName: betResult.betName,
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
        setBetList(newArray);
    }
    useEffect(() => {
            const fetchDataOnMount = async () => {
                await fetchBetData();
            }
            fetchDataOnMount();
        }, []
    )

    const callSetNewBet = async (address) => {
        try {
            setIsloading(true);
            await SetNewBet(address, selectedCompetitor, depositAmount);
            setIsloading(false);
            toast({
                title: "Bid placed",
                status: "success",
            });
            await fetchBetData()

        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    }

    const redeem = async(address)=> {
        try {
            setIsloading(true);
           const test = await redeemGain(address);
            setIsloading(false);
            toast({
                title: "gain redeem successfully",
                status: "success",
            });
            await fetchBetData()
        } catch (error) {
            console.log(error)
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    }

    const convertAmountToDisplay = (amount1, amount2) => {
        return ethers.formatEther((amount1 + amount2).toString())
    }

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    const cardStyle = {
        boxShadow: '2px 1px 1px #001233',
    }

    return (
        <Card style={cardStyle}>
            <CardBody>
                <TableContainer width={"auto"}>
                    <Table variant="simple" colorScheme='#FF595A'>
                        <Thead>
                            <Tr>
                                <Th>Bet Name</Th>
                                <Th>Competitor 1</Th>
                                <Th>Odd</Th>
                                <Th>VS</Th>
                                <Th>Competitor 2</Th>
                                <Th>Odd</Th>
                                <Th isNumeric>Bet amount</Th>
                                <Th isNumeric>Participants</Th>
                                <Th>Your amount</Th>
                                <Th>Your choice</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {betList.map((bet) => (
                                <Tr key={bet.address}>
                                    <Td>{bet.betName}</Td>
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
                                    <Td>{bet.betStatus === 0 && <Button onClick={() => callSetNewBet(bet.address)}
                                                                        style={buttonStyle}
                                                                        isLoading={isloading}>Bet</Button>}</Td>
                                    <Td>
                                        {(address === bet.owner) && (bet.betStatus === 0) &&
                                            <Button onClick={() => startValidation(bet.address)} style={buttonStyle}>Start
                                                validation</Button>}
                                        {(bet.betStatus === 2) &&
                                            <Button onClick={() => redeem(bet.address)}
                                                    style={buttonStyle}>Redeem</Button>}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>

    )
}