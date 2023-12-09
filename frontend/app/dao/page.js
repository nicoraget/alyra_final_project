'use client';
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading, Input, Select,
    Stack,
    StackDivider, Table, TableContainer, Tbody, Td,
    Text, Th, Thead, Tr, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    addValidator,
    getDAOControlValue,
    getDAOVoteList,
    getDAOVoteNumber, getIsValidator, setDaoVote,
    withdrawFormValidator, withdrawFromValidator
} from "@/services/betDAOService";
import {AskDAOVote} from "@/components/Modal/AskDAOVote";
import {SetNewBet} from "@/services/SimpleBetServices";
import {useAccount} from "wagmi";

const Validator = () => {

    const [daoControlValue, setdaoControlValue] = useState([]);
    const [daoVoteList, setDaoVoteList] = useState([]);
    const [selectedDaoVoteOption, setSelectedDaoVoteOption] = useState(1);
    const toast = useToast();
    const [isloading, setIsloading] = useState(false);
    const [isValidator, setIsValisator] = useState(false);
    const {address} = useAccount();

    useEffect(() => {
        const fetchData = async () => {
            await fetchDaoVoteList();
        }
        fetchData();
    }, [])

    const fetchDaoVoteList = async () => {

        const validator = await getIsValidator(address);
        console.log(validator)
        if (validator.userAddress !== "0x0000000000000000000000000000000000000000"
        ) {
            setIsValisator(true);
        }

        const daoControlValueFromContract = await getDAOControlValue();
        const daoVoteNumber = await getDAOVoteNumber();
        setDaoVoteList(await getDAOVoteList(daoVoteNumber));
        setdaoControlValue({
            validatorNumberRequired: Number(daoControlValueFromContract.validatorNumberRequired),
            platformFees: Number(daoControlValueFromContract.platformFees),
            creatorFees: Number(daoControlValueFromContract.creatorFees),
            betQuorum: Number(daoControlValueFromContract.betQuorum),
            DAOQuorum: Number(daoControlValueFromContract.DAOQuorum),
            validatorFees: Number(daoControlValueFromContract.validatorFees),
        })
    }

    const voteForDAO = async (id, option) => {
        try {
            setIsloading(true);
            await setDaoVote(id, option)
            setIsloading(false);
            toast({
                title: "Voted",
                status: "success",
            });
            await fetchDaoVoteList()

        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }

    }

    const joinValidator = async() => {
        try {
            setIsloading(true);
            await addValidator()
            setIsloading(false);
            toast({
                title: "Voted",
                status: "success",
            });
            await fetchDaoVoteList()

        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    }

    const leaveValidator = async() => {
        try {
            setIsloading(true);
            await withdrawFromValidator()
            setIsloading(false);
            toast({
                title: "Voted",
                status: "success",
            });
            await fetchDaoVoteList()

        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    }

    const switchVoteTypeToDisplay = (voteType) => {
        switch (voteType) {
            case 0: {
                return 'PlatformFee';
            }
            case 1: {
                return 'CreatorFees';
            }
            case 2: {
                return 'BetQuorum';
            }
            case 3: {
                return 'DAOQuorum';
            }
            case 4: {
                return 'ValidatorNumberRequired';
            }
            case 5: {
                return 'ValidatorFees';
            }
        }
    }

    const percentageConverterToDisplay = (value) => {
        return Math.round((1 / value) * 100);
    }

    const buttonDiv = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
    }

    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
    }

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    const daoValueStyle = {
        color: '#FF595A',
        fontSize: '16px',
        background: 'none',
        fontWeight: 'bold',
    }

    const cardsStyle = {
        display: 'flex',
        flexDirection: 'row',
    }

    const cardDiv = {
        paddingLeft: '2rem',
    }

    return (
        <div style={mainStyle}>
            <div>
                <Text fontSize='2xl' noOfLines={3} as='em' padding={'2rem 0 2rem 0'}> Welcome to betWave validation.
                    To become
                    validator you need to stack 1 ether. You will get rewarded for each successfull bet
                    validation </Text>
                <div style={cardsStyle}>
                    <Card boxShadow={'4px 4px 4px 4px #001233'} width={'42%'}>
                        <CardHeader>
                            <Heading size='md'>BetWave Control Value</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider/>} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Number of required validator : <Badge
                                        style={daoValueStyle}>{daoControlValue.validatorNumberRequired}</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Represent the number of validator required to start a bet and to validate a bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Platform fees : <Badge
                                        style={daoValueStyle}>{percentageConverterToDisplay(daoControlValue.platformFees)} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage kept by the platform for each bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Creator fees : <Badge
                                        style={daoValueStyle}>{percentageConverterToDisplay(daoControlValue.creatorFees)} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage give to the creator of the bet after the validation.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Validator fees : <Badge
                                        style={daoValueStyle}>{percentageConverterToDisplay(daoControlValue.validatorFees)} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage send to bet validator.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Bet quorum : <Badge style={daoValueStyle}>{daoControlValue.betQuorum} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage needed to validate a bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        DAO quorum : <Badge style={daoValueStyle}>{daoControlValue.DAOQuorum} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage needed to validate a change in the DAO control value.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card boxShadow={'4px 4px 4px 4px #001233'} width={'60%'}>
                        <CardHeader>
                            <Heading size='md'>BetWave Vote Proposal</Heading>
                        </CardHeader>

                        <CardBody>
                            <TableContainer width={"auto"}>
                                <Table variant="simple" colorScheme='#FF595A'>
                                    <Thead>
                                        <Tr>
                                            <Th>Vote Type</Th>
                                            <Th>For</Th>
                                            <Th>Against</Th>
                                            <Th>New Value</Th>
                                            <Th>Choose</Th>
                                            <Th>Vote</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {daoVoteList.map((daoVote, index) => (
                                            <Tr key={index}>
                                                <Td>{switchVoteTypeToDisplay(daoVote.voteType)}</Td>
                                                <Td>{daoVote.voteFor}</Td>
                                                <Td>{daoVote.voteAgainst}</Td>
                                                <Td>{percentageConverterToDisplay(daoVote.newValue)}%</Td>
                                                <Td>
                                                    <Select onChange={(event) =>
                                                        setSelectedDaoVoteOption(event.target.value)
                                                    }>
                                                        <option value={1}>
                                                            for
                                                        </option>
                                                        <option value={2}>
                                                            against
                                                        </option>
                                                    </Select>
                                                </Td>
                                                <Td> {!daoVote.voteEnded &&
                                                    <Button onClick={() => voteForDAO(index, selectedDaoVoteOption)}
                                                            style={buttonStyle}
                                                            isLoading={isloading}>Vote</Button>}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </div>
                <div style={buttonDiv}>
                    {!isValidator && <Button onClick={joinValidator} style={buttonStyle} isLoading={isloading}>Join</Button>}
                    {isValidator && <AskDAOVote/>}
                    {isValidator && <Button onClick={leaveValidator} style={buttonStyle} isLoading={isloading}>Withdraw</Button>}
                </div>
            </div>
        </div>
    )
};
export default Validator