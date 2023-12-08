'use client'
import {Button, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    getBetFromBetOrganizer,
    getStartValidationEvent,
    setBetVote,
    startValidation
} from "@/services/BetOrganizerService";
import {usePublicClient} from "wagmi";

const bet = () => {

    const publicClient = usePublicClient();
    const [betListToValidate, setBetListToValidate] = useState([])
    const [selectedCompetitor, setSelectedCompetitor] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const betValidationAddressList = await getStartValidationEvent(publicClient)
            const betToValidateArrayAddress = betValidationAddressList.map(betAddressArray => betAddressArray[0])

            const test = await Promise.all(betToValidateArrayAddress.map(async (betAddress) => {
                const bet = await getBetFromBetOrganizer(betAddress);
                console.log(bet.betStatus)
                return {
                    address: betAddress,
                    owner: bet.owner,
                    competitor1: bet.competitor1,
                    competitor2: bet.competitor2,
                    betStatus: bet.betStatus
                }
            }))
            console.log(test)
            setBetListToValidate(test)
            console.log(betListToValidate)
        }
        fetchData();
    }, [])

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    return (
        <TableContainer width={"auto"}>
            <Table variant="simple" color='#FF595A'>
                <Thead>
                    <Tr>
                        <Th>Competitor 1</Th>
                        <Th>VS</Th>
                        <Th>Competitor 2</Th>
                        <Th>Who win</Th>
                        <Th>Vote</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {betListToValidate.map((bet, index) => (
                        <Tr key={index}>
                            <Td>{bet.competitor1}</Td>
                            <Td>VS</Td>
                            <Td>{bet.competitor2}</Td>
                            <Td>
                                <Select onChange={(event) =>
                                    setSelectedCompetitor(event.target.value)
                                }>
                                    <option value={0}>
                                        {bet.competitor1}
                                    </option>
                                    <option value={1}>
                                        {bet.competitor2}
                                    </option>
                                </Select>
                            </Td>
                            <Td> <Button onClick={() => setBetVote(selectedCompetitor, bet.address)}
                                         style={buttonStyle}>Vote</Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
};
export default bet