'use client'
import {useAccount} from 'wagmi'
import {AddSimpleBetModal} from "@/components/Modal/AddSimpleBetModal";
import {AddUser} from "@/components/UserManagement/AddUser";
import {useEffect, useState} from "react";
import {isUserExist} from "@/services/betDAOService";
import {BetList} from "@/components/BetList/BetList";


export default function Home() {
    return <div>
        <AddSimpleBetModal/>
        <BetList/>
    </div>
}