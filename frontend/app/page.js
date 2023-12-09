'use client'
import {AddSimpleBetModal} from "@/components/Modal/AddSimpleBetModal";
import {BetList} from "@/components/BetList/BetList";

export default function Home() {

    return <div>
        <AddSimpleBetModal/>
        <BetList/>
    </div>
}