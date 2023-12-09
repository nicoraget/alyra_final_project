'use client'
import {
    Button,
    Card,
    CardBody,
    Input,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    getBetFromBetOrganizer,
    getStartValidationEvent,
    setBetVote,
    startValidation
} from "@/services/BetOrganizerService";
import {useAccount, usePublicClient} from "wagmi";
import {getIsValidator} from "@/services/betDAOService";

const bet = () => {

    const publicClient = usePublicClient();
    const [betListToValidate, setBetListToValidate] = useState([])
    const [selectedCompetitor, setSelectedCompetitor] = useState(0);
    const [isValidator, setIsValisator] = useState(false);
    const {address} = useAccount();

    useEffect(() => {
        const fetchData = async () => {

            const validator = await getIsValidator(address);
            console.log(validator)
            if (validator.userAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                setIsValisator(true);
            }

            const betValidationAddressList = await getStartValidationEvent(publicClient)
            const betToValidateArrayAddress = betValidationAddressList.map(betAddressArray => betAddressArray[0])

            const test = await Promise.all(betToValidateArrayAddress.map(async (betAddress) => {
                const bet = await getBetFromBetOrganizer(betAddress);
                return {
                    betName: bet.betName,
                    address: betAddress,
                    owner: bet.owner,
                    competitor1: bet.competitor1,
                    competitor2: bet.competitor2,
                    betStatus: bet.betStatus
                }
            }))
            setBetListToValidate(test)
        }
        fetchData();
    }, [])

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    const cardStyle = {
        boxShadow: '2px 1px 1px #001233',
    }

    const wrapperStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '64',
    }
if(isValidator){
    return (
        <>
            <div style={wrapperStyle}>
                <Card style={cardStyle}>
                    <CardBody>
                        <TableContainer width={"auto"}>
                            <Table variant="simple" colorScheme='#FF595A'>
                                <Thead>
                                    <Tr>
                                        <Th>Bet name</Th>
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
                                            <Td>{bet.betName}</Td>
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
                    </CardBody>
                </Card>
            </div>
        </>
    )
} else {
    return(
        <>
        </>
    )
}
};
export default bet