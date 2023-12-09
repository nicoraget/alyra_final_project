import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {betWaveDAO} from "@/constants/BetWaveDAO";
import {parseEther} from "viem";

export const addUser = async () => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            functionName: "addUser",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const isUserExist = async () => {
    const walletClient = await getWalletClient();
    if (walletClient !== null) {
        return await readContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            args: [walletClient?.account.address],
            functionName: "userToId",
        });
    } else {
        return 0n;
    }
}

export const getDAOVoteNumber = async () => {
      return await readContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            functionName: "daoVoteNumber",
        });
}

export const getIsValidator = async (address) => {
    const validator = await readContract({
        address: betWaveDAO.address,
        abi: betWaveDAO.abi,
        functionName: "validators",
        args:[address],
    });
    return{
        userAddress: validator[0],
        isBlacklisted:validator[1],
        strike: validator[2],
    }
}

export const getDAOVoteList = async (voteNumber) => {
    const daoVote = [];
    for(let i=0;i< voteNumber; i++) {
       const daoVoteFromContract = await readContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            args:[i],
            functionName: "DAOVoteList",
        });
           daoVote.push({
               voteType:daoVoteFromContract[0],
               voteFor: Number(daoVoteFromContract[1]),
               voteAgainst: Number(daoVoteFromContract[2]),
               newValue: daoVoteFromContract[3],
               voteEnded:daoVoteFromContract[4],
           });
    }
    return daoVote;
}

export const getDAOControlValue = async () => {
    const rawValue = await readContract({
        address: betWaveDAO.address,
        abi: betWaveDAO.abi,
        functionName: "getDaoControlValue",
    });
    return {
        validatorNumberRequired: rawValue[0],
        platformFees: rawValue[1],
        creatorFees: rawValue[2],
        betQuorum: rawValue[3],
        DAOQuorum: rawValue[4],
        validatorFees: rawValue[5]
    }
}

export const addValidator = async () => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            functionName: "addValidators",
            value: parseEther('1'),
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        throw error;
    }
}

export const setDaoVote = async (id,option) => {
    try {
        console.log(id)
        console.log(option)
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            functionName: "setDaoVote",
            args:[id,option]
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        throw error;
    }
}

export const askDaoVote = async (voteType, newValue) => {
    const newValueToPercentage = Math.round(100/newValue);
    console.log(newValueToPercentage)
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            args: [voteType, newValueToPercentage],
            functionName: "askDAOVote",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        throw error;
    }
}

export const withdrawFromValidator = async () => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            functionName: "withdrawFromValidators",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        throw error;
    }
}