'use client'

import {
    Button, Heading, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Text,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";
import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {useAccount} from "wagmi";
import {betWaveOrganizer, BetWaveOrganizerAbi, BetWaveOrganizerAddress} from "@/constants/BetWaveOrganizer";

export const SetNewBetModal = (competitor1,competitor2) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [depositAmount, setDepositAmount] = useState('');


    const modalButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <>
            <div style={modalButton}>
                <Button onClick={onOpen} colorScheme='telegram'>Bet</Button>
            </div>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create your bet</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                            Choose your champion
                        </Heading>
                        <Select>
                        <option value='0'>{competitor1}</option>
                        <option value='1'>{competitor2}</option>
                        </Select>

                        <Heading as={'h2'} size={'m'} mt={'2rem'}>
                           Choose your bet amount
                        </Heading>
                        <Input placeholder={'deposit amount'} value={depositAmount}
                               onChange={(e) => {
                                   setDepositAmount(e.target.value)
                               }}></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={deploySimpleBet}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}