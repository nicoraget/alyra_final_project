'use client'

import {
    Button, Heading, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";
import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {useAccount} from "wagmi";
import {betWaveOrganizer, BetWaveOrganizerAbi, BetWaveOrganizerAddress} from "@/constants/BetWaveOrganizer";
import {deploySimpleBet} from "@/services/SimpleBetServices";

export const AddSimpleBetModal = () => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [competitor1, setCompetitor1] = useState('');
    const [competitor2, setCompetitor2] = useState('');
    const [betName, setBetName] = useState('');

    const modalButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '1rem',
    }

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
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
                        <Button colorScheme='blue' mr={3} onClick={()=> deploySimpleBet(betName,competitor1,competitor2)}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}