import {Button} from "@chakra-ui/react";
import {getWalletClient, prepareWriteContract, writeContract} from "@wagmi/core";
import {betWaveDAO} from "@/constants/BetWaveDAO";

export const AddUser = () => {

    const addUser = async () => {
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

    const registerButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        colorScheme: 'telegram',
    }

    return (
        <div style={registerButton}>
        <Button onClick={addUser} >register</Button>
        </div>
    )
}