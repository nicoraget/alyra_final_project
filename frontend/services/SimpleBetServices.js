import {betWaveOrganizer} from "@/constants/BetWaveOrganizer";
import {simpleBet} from "@/constants/SimpleBet";
import {getWalletClient, prepareWriteContract, writeContract} from "@wagmi/core";
import {parseEther} from "viem";

export const deploySimpleBet = async (betName,competitor1,competitor2) => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveOrganizer.address,
            abi: betWaveOrganizer.abi,
            account: walletClient?.account,
            args: [betName,competitor1, competitor2],
            functionName: "deployNewBet",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const redeemGain = async (address) => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: address,
            abi: simpleBet.abi,
            account: walletClient?.account,
            functionName: "redeemToBettor",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const SetNewBet = async (address, betId, value) => {
    try {
        console.log(value)
        console.log(betId)
        const amountToSend = parseEther(value)
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: address,
            abi: simpleBet.abi,
            account: walletClient?.account,
            args: [betId],
            functionName: "setBet",
            value: amountToSend,

        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const getNewBet = async (publicClient) => {
    const logs = await publicClient.getContractEvents({
        address: betWaveOrganizer.address,
        abi: betWaveOrganizer.abi,
        eventName: "newBet",
        fromBlock: BigInt(betWaveOrganizer.blockNumber),
        toBlock: "latest",
    });
    const eventList = logs.map((log) => log.args);
    return eventList.map(eventInList => {
        return {
            address: eventInList[0],
            comp1: eventInList[1],
            comp2: eventInList[2]
        }
    })
}

export const getSimpleBetData = async (simpleBetAddress, publicClient) => {

    const logs = await publicClient.getContractEvents({
        address: simpleBetAddress,
        abi: simpleBet.abi,
        eventName: "newBid",
        fromBlock: BigInt(1),
        toBlock: "latest",
    });
    const eventList = logs.map((log) => log.args);
    return eventList.map(eventInList => {
        return {
            address: eventInList[0],
            betNumberComp1: eventInList[1],
            betAmountComp1: eventInList[2],
            oddComp1: eventInList[3],
            BetNumberComp2: eventInList[4],
            BetAmountComp2: eventInList[5],
            oddComp2: eventInList[6]
        }
    })
}

