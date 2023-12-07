'use client'
import {useAccount} from 'wagmi'
import {AddSimpleBetModal} from "@/components/Modal/AddSimpleBetModal";
import {AddUser} from "@/components/UserManagement/AddUser";
import {useEffect, useState} from "react";
import {isUserExist} from "@/Services/UserService";
import {BetList} from "@/components/BetList/BetList";


export default function Home() {
    const {address, isConnected} = useAccount()
    const [userExist, setUserExist] = useState(false);
    useEffect(() => {
        const getUserToId = async () => {
            if (BigInt(await isUserExist()) === 1n) {
                setUserExist(true);
            } else if (BigInt(await isUserExist()) === 0n) {
                setUserExist(false)
            }
        }
        getUserToId();
    });
    if (!isConnected) return <div>Please connect your wallet</div>
    return <div>
        {!userExist && <AddUser/>}
        <AddSimpleBetModal/>
        <BetList/>
    </div>
}