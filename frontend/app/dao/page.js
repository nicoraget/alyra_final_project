'use client';
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Stack,
    StackDivider,
    Text
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {addValidator, getDAOControlValue, withdrawFormValidator} from "@/services/betDAOService";
import {AskDAOVote} from "@/components/Modal/AskDAOVote";

const validator = () => {

    const [daoCOntrolValue, setDaoControlValue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const test = await getDAOControlValue();
            console.log(test.validatorFees)
            setDaoControlValue({
                validatorNumberRequired: Number(test.validatorNumberRequired),
                platformFees: Number(test.platformFees),
                creatorFees: Number(test.creatorFees),
                betQuorum: Number(test.betQuorum),
                DAOQuorum: Number(test.DAOQuorum),
                validatorFees: Number(test.validatorFees),
            })
            console.log(daoCOntrolValue)
        }
        fetchData();
    }, [])
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
        boxShadow: '4px 2px 2px #001233',
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

    return (
        <div style={mainStyle}>
            <Flex>
                <div>
                    <Text fontSize='2xl' noOfLines={3} as='em' padding={'2rem 0 2rem 0'}> Welcome to betWave validation.
                        To become
                        validator you need to stack 1 ether. You will get rewarded for each successfull bet
                        validation </Text>
                    <Card boxShadow={'4px 4px 4px 4px #001233'}>
                        <CardHeader>
                            <Heading size='md'>BetWave Control Value</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider/>} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Number of required validator : <Badge
                                        style={daoValueStyle}>{daoCOntrolValue.validatorNumberRequired}</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Represent the number of validator required to start a bet and to validate a bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Platform fees : <Badge style={daoValueStyle}>{daoCOntrolValue.platformFees} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage kept by the platform for each bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Creator fees : <Badge
                                        style={daoValueStyle}>{daoCOntrolValue.creatorFees} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage give to the creator of the bet after the validation.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Validator fees : <Badge
                                        style={daoValueStyle}>{daoCOntrolValue.validatorFees} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage send to bet validator.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Bet quorum : <Badge style={daoValueStyle}>{daoCOntrolValue.betQuorum} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage needed to validate a bet.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        DAO quorum : <Badge style={daoValueStyle}>{daoCOntrolValue.DAOQuorum} %</Badge>
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Percentage needed to validate a change in the DAO control value.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    <div style={buttonDiv}>
                        <Button onClick={addValidator} style={buttonStyle}>Join</Button>
                        <AskDAOVote/>
                        <Button onClick={withdrawFormValidator} style={buttonStyle}>Withdraw</Button>
                    </div>
                </div>
            </Flex>
        </div>
    )
};
export default validator