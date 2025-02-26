import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Auth app",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        {children}
        </>
    );
}