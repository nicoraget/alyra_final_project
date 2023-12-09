'use client'

import {
    Button, Heading, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {useAccount} from "wagmi";
import {betWaveOrganizer, BetWaveOrganizerAbi, BetWaveOrganizerAddress} from "@/constants/BetWaveOrganizer";
import {deploySimpleBet} from "@/services/SimpleBetServices";
import {addUser} from "@/services/betDAOService";
import {BetList} from "@/components/BetList/BetList";
import {deployNewBet} from "@/app/page";

export const AddSimpleBetModal = () => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [competitor1, setCompetitor1] = useState('');
    const [competitor2, setCompetitor2] = useState('');
    const [betName, setBetName] = useState('');
    const toast = useToast();
    const [isloading, setIsloading] = useState(false);

    const modalButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0 1rem 0',
    }

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233',
    }

    const saveAndClose = async (betName, competitor1, competitor2) => {
        try {
            setIsloading(true);
            await deploySimpleBet(betName, competitor1, competitor2);
            setIsloading(false);
            toast({
                title: "New Bet Deployed ",
                status: "success",
            });
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

    return (
        <>
            <div style={modalButton}>
                <Button onClick={onOpen} style={buttonStyle}>Create new bet</Button>
            </div>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create your bet</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Choose your Bet name
                        </Heading>
                        <Input placeholder={'first competitor name'} value={betName} onChange={(e) => {
                            setBetName(e.target.value)
                        }}></Input>
                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Add the first competitor here
                        </Heading>
                        <Input placeholder={'first competitor name'} value={competitor1} onChange={(e) => {
                            setCompetitor1(e.target.value)
                        }}></Input>
                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Add the second competitor here
                        </Heading>
                        <Input placeholder={'first competitor name'} value={competitor2}
                               onChange={(e) => {
                                   setCompetitor2(e.target.value)
                               }}></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                                onClick={() => saveAndClose(betName, competitor1, competitor2)} isLoading={isloading}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}