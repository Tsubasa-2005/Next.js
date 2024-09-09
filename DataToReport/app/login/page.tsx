"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Form from "@/app/features/login-feature/components/FormComponent";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    // Google Sign-In のクライアントIDを指定
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Google Cloud Console から取得したクライアントID

    // Google Sign-In用のスクリプトを読み込み
    useEffect(() => {
        const loadGoogleSignInScript = () => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleSignIn,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    { theme: "outline", size: "large" }
                );
            };
            document.body.appendChild(script);
        };

        loadGoogleSignInScript();
    }, []);

    // Googleログイン後の処理
    const handleGoogleSignIn = async (response: any) => {
        const token = response.credential; // Googleトークン
        try {
            const res = await fetch("/api/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            if (res.ok) {
                const data = await res.json();
                // クッキーにトークンを保存
                Cookies.set("authToken", data.token, { expires: 1 }); // 1日間有効
                // ダッシュボードにリダイレクト
                router.push("/dashboard");
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "Googleログインに失敗しました");
            }
        } catch (error) {
            setErrorMessage("Googleログイン中にエラーが発生しました");
        }
    };

    const handleLogin = async (userid: number, password: string) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userid, password }),
            });

            if (res.ok) {
                // クッキーはサーバー側でセットされる
                router.push("/dashboard");
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "ログインに失敗しました");
            }
        } catch (error) {
            setErrorMessage("ログイン中にエラーが発生しました");
        }
    };

    // 新規登録ページへの遷移ハンドラ
    const handleRegisterClick = () => {
        router.push("/register");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6"> {/* 親要素にパディングを追加 */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>

                <Form onSubmit={handleLogin} errorMessage={errorMessage}/>

                {/* Googleログインボタン */}
                <div id="google-signin-button" className="mt-4"></div>

                {/* 新規登録への遷移 */}
                <p className="text-center text-gray-600 mt-6">
                    アカウント登録がまだの方は{" "}
                    <span
                        onClick={handleRegisterClick}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                こちらから新規登録
            </span>
                </p>
            </div>
        </div>
    );
}