'use client'

import {
    Button, Heading, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Text,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {useAccount} from "wagmi";
import {betWaveOrganizer, BetWaveOrganizerAbi, BetWaveOrganizerAddress} from "@/constants/BetWaveOrganizer";
import {askDaoVote} from "@/services/betDAOService";
import {SetNewBet} from "@/services/SimpleBetServices";

export const AskDAOVote = () => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [newValue, setNewValue] = useState(0);
    const [voteTypeIndex, setNewVoteTypeIndex] = useState(0);
    const toast = useToast();
    const [isloading, setIsloading] = useState(false);

    const callAskDaoVote = async (voteTypeIndex, newValue) => {
        try {
            setIsloading(true);
            await askDaoVote(voteTypeIndex, newValue);
            setIsloading(false);
            toast({
                title: "New vote created",
                status: "success",
            });
            //await fetchBetData()
            onClose();
        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    }

    const voteType = [
        'PlatformFee',
        'CreatorFees',
        'BetQuorum',
        'DAOQuorum',
        'ValidatorNumberRequired',
        'ValidatorFees',
    ]
    const modalButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const buttonStyle = {
        boxShadow: '4px 2px 2px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    return (
        <>
            <div style={modalButton}>
                <Button onClick={onOpen} style={buttonStyle}>Ask Dao Vote</Button>
            </div>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'lg'}>
                <ModalOverlay/>
                <ModalContent height={'24rem'}>
                    <ModalHeader>Create your bet</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Choose your champion
                        </Heading>
                        <Select
                            onChange={(event) =>
                                setNewVoteTypeIndex(BigInt(event.target.value))
                            }>
                            <option value='0'>{voteType[0]}</option>
                            <option value='1'>{voteType[1]}</option>
                            <option value='2'>{voteType[2]}</option>
                            <option value='3'>{voteType[3]}</option>
                            <option value='4'>{voteType[4]}</option>
                            <option value='5'>{voteType[5]}</option>
                        </Select>

                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Choose your bet amount
                        </Heading>
                        <Input type={'number'} placeholder={'deposit amount'} value={newValue}
                               onChange={(e) => {
                                   setNewValue(e.target.value)
                               }}></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='blue' mr={3} onClick={() => callAskDaoVote(voteTypeIndex, newValue)} isLoading={isloading}>
                            Create Vote
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}