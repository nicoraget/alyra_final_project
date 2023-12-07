import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {betWaveOrganizer} from "@/constants/BetWaveOrganizer";

export const getBetFromBetOrganizer = async (betAddress) => {
    const bet = await readContract({
        address: betWaveOrganizer.address,
        abi: betWaveOrganizer.abi,
        args: [betAddress],
        functionName: "betList",
    });
    return {
        competitor1: bet[0],
        competitor2: bet[1],
        owner: bet[2],
        betStatus: bet[6]
    }
}

export const startValidation = async (betAddress) => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveOrganizer.address,
            abi: betWaveOrganizer.abi,
            account: walletClient?.account,
            args: [betAddress],
            functionName: "startBetValidation",

        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const setBetVote = async (competitorId,betAddress) => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveOrganizer.address,
            abi: betWaveOrganizer.abi,
            account: walletClient?.account,
            args: [competitorId,betAddress],
            functionName: "setBetVote",

        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const getStartValidationEvent = async (publicClient) => {
    const logs = await publicClient.getContractEvents({
        address: betWaveOrganizer.address,
        abi: betWaveOrganizer.abi,
        eventName: "startValidation",
        fromBlock: BigInt(betWaveOrganizer.blockNumber),
        toBlock: "latest",
    });
    return logs.map((log) => log.args);
}