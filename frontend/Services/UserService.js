import {getWalletClient, readContract} from "@wagmi/core";
import {betWaveDAO} from "@/constants/BetWaveDAO";

export const isUserExist = async() => {
            const walletClient = await getWalletClient();
    return await readContract({
               address: betWaveDAO.address,
               abi: betWaveDAO.abi,
               args: [walletClient?.account.address],
               functionName: "userToId",
           });
}