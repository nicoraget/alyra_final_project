import {getWalletClient, prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {betWaveDAO} from "@/constants/BetWaveDAO";
import {parseEther} from "viem";

export const isUserExist = async() => {
            const walletClient = await getWalletClient();
    return await readContract({
               address: betWaveDAO.address,
               abi: betWaveDAO.abi,
               args: [walletClient?.account.address],
               functionName: "userToId",
           });
}

export const getDAOControlValue = async() => {
    const rawValue = await readContract({
        address: betWaveDAO.address,
        abi: betWaveDAO.abi,
        functionName: "getDaoControlValue",
    });
    return {
        validatorNumberRequired:rawValue[0],
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
        console.log(error)
    }
}

export const askDaoVote = async (voteType,newValue) => {
    try {
        const walletClient = await getWalletClient();
        const {request} = await prepareWriteContract({
            address: betWaveDAO.address,
            abi: betWaveDAO.abi,
            account: walletClient?.account,
            args:[voteType,newValue],
            functionName: "askDAOVote",
        });
        const {hash} = await writeContract(request)
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
}

export const withdrawFormValidator = async () => {
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
        console.log(error)
    }
}