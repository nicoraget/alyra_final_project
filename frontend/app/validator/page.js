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
import {addValidator, getDAOControlValue, withdrawFormValidator} from "@/Services/betDAOService";
import {AskDAOVote} from "@/components/Modal/SetNewBetModal";

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
    const buttonStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    return (
        <Flex>
            <div>
                <Text fontSize='2xl' noOfLines={3} maxWidth={"60rem"}> Welcome to betWave validation. To become
                    validator you need to stack 1 ether. You will get rewarded for each successfull bet
                    validation </Text>
                <Card>
                    <CardHeader>
                        <Heading size='md'>BetWave Control Value</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider/>} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Number of required validator :  <Badge colorScheme='purple'>{daoCOntrolValue.validatorNumberRequired}</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Represent the number of validator required to start a bet and to validate a bet.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Platform fees :  <Badge colorScheme='purple'>{daoCOntrolValue.platformFees} %</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Percentage kept by the platform for each bet.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Creator fees :  <Badge colorScheme='purple'>{daoCOntrolValue.creatorFees} %</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Percentage give to the creator of the bet after the validation.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                   Validator fees :  <Badge colorScheme='purple'>{daoCOntrolValue.validatorFees} %</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Percentage send to bet validator.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Bet quorum :  <Badge colorScheme='purple'>{daoCOntrolValue.betQuorum} %</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Percentage needed to validate a bet.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    DAO quorum :  <Badge colorScheme='purple'>{daoCOntrolValue.DAOQuorum} %</Badge>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Percentage needed to validate a change in the DAO control value.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
                <div style={buttonStyle}>
                    <Button colorScheme='telegram' onClick={addValidator}>Join</Button>
                    <AskDAOVote/>
                    <Button colorScheme='telegram' onClick={withdrawFormValidator}>Withdraw</Button>
                </div>
            </div>
        </Flex>
    )
};
export default validator