"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
    const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                const response = await fetch("/api/session");
                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(!!data?.session);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                setIsLoggedIn(false);
            }
        };

        checkLoggedInStatus();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false); // Close the dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Add event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (response.ok) {
                setIsLoggedIn(false);
                router.push("/");
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleLogin = () => router.push("/login");
    const handleRegister = () => router.push("/register");
    const handleDashboard = () => router.push("/dashboard");
    const handleHome = () => router.push("/");

    // Toggle the dropdown when the avatar is clicked
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="flex justify-between items-center py-4 px-8 border-b border-gray-200">
            <h1
                className="text-2xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 hover:text-blue-600"
                onClick={() => router.push(isLoggedIn ? "/dashboard" : "/")}
            >
                Data to report
            </h1>
            <div className="relative flex items-center">
                {isLoggedIn ? (
                    <>
                        {pathname.startsWith("/dashboard") ? (
                            <Button variant="outline" onClick={handleHome} className="h-10">
                                ホーム
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={handleDashboard} className="h-10">
                                ダッシュボード
                            </Button>
                        )}
                        <Button className="ml-2 h-10" onClick={handleLogout}>
                            ログアウト
                        </Button>

                        {/* User Avatar with Dropdown */}
                        <div className="ml-4 relative inline-block" ref={dropdownRef}>
                            <Image
                                src="/profile.jpg" // プロフィール画像のパス
                                alt="Profile Picture"
                                width={40} // Adjusted size for the avatar
                                height={40}
                                className="rounded-full cursor-pointer h-10 w-10 object-cover"
                                onClick={toggleDropdown} // Toggle the dropdown on click
                            />
                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <ul className="py-2">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => router.push("/dashboard/edit/user")}
                                        >
                                            ユーザー情報編集
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => router.push("/dashboard/edit/account")}
                                        >
                                            アカウント設定
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Button variant="outline" onClick={handleLogin} className="h-10">
                            ログイン
                        </Button>
                        <Button className="ml-2 h-10" onClick={handleRegister}>
                            新規登録
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}