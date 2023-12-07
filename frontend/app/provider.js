"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./wagmiConfig";
import { useState, useEffect } from "react";

/** Component wrapper for all necessary providers for app */
export function Providers({ children }) {
    // This state come from Wagmi next.js template documentation
    // @see https://github.com/wagmi-dev/create-wagmi/blob/main/templates/next/rainbowkit/src/app/providers.tsx
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <CacheProvider>
            <ChakraProvider>
                <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider chains={chains}>
                        {mounted && children}
                    </RainbowKitProvider>
                </WagmiConfig>
            </ChakraProvider>
        </CacheProvider>
    );
}