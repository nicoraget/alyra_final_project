'use client'
import {AddSimpleBetModal} from "@/components/Modal/AddSimpleBetModal";
import {BetList} from "@/components/BetList/BetList";

export default function Home() {

    const wrapperStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',

    }

    return <div style={wrapperStyle}>
        <AddSimpleBetModal/>
        <BetList/>
    </div>
}