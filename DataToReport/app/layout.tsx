"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from "@/app/features/sidebar-feature/components/SidebarComponent/Sidebar";
import { ProSidebarProvider } from 'react-pro-sidebar'; // Import ProSidebarProvider

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // Get the current pathname

    return (
        <RecoilRoot>
            <html lang="ja">
            <body className={inter.className}>
            <Header />
            <div className="flex">
                {/* Display the sidebar only for /dashboard routes */}
                {pathname.startsWith('/dashboard') && (
                    <ProSidebarProvider> {/* Wrap Sidebar in ProSidebarProvider */}
                        <div className="h-full"> {/* Remove mt-16 */}
                            <Sidebar />
                        </div>
                    </ProSidebarProvider>
                )}
                <main className="flex-1">{children}</main>
            </div>
            <Footer />
            </body>
            </html>
        </RecoilRoot>
    );
}