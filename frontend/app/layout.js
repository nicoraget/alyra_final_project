'use client'
import '@rainbow-me/rainbowkit/styles.css';
import Layout from "@/components/Layout/Layout";
import {Providers} from "@/app/provider";


export default function RootLayout({children}) {

    const heightStyle = {
        height: '100vh',
    }

    return (
        <html lang="en" style={heightStyle}>
        <body style={heightStyle}>
        <Providers style={heightStyle}>
            <Layout>
                {children}
            </Layout>
        </Providers>
        </body>
        </html>
    );
}
