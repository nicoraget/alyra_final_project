'use client'
import '@rainbow-me/rainbowkit/styles.css';
import Layout from "@/components/Layout/Layout";
import {Providers} from "@/app/provider";


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <Layout>
                {children}
            </Layout>
        </Providers>
        </body>
        </html>
    );
}
