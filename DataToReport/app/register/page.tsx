"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Google Cloud Consoleから取得したクライアントID

    // Google Sign-In用のスクリプトを読み込み
    useEffect(() => {
        const loadGoogleSignInScript = () => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = () => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: GOOGLE_CLIENT_ID,
                        callback: handleGoogleSignIn,
                    });
                    window.google.accounts.id.renderButton(
                        document.getElementById("google-signin-button"),
                        { theme: "outline", size: "large" }
                    );
                }
            };
            document.body.appendChild(script);
        };

        loadGoogleSignInScript();
    }, []);

    // Googleログイン後の処理
    const handleGoogleSignIn = async (response: any) => {
        const token = response.credential; // Googleトークン
        try {
            const res = await fetch("/api/google-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            if (res.ok) {
                setSuccessMessage("Googleアカウントでの登録に成功しました！ログインページに移動します...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "Googleアカウントでの登録に失敗しました。");
            }
        } catch (error) {
            setErrorMessage("Googleアカウントでの登録中にエラーが発生しました");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (res.ok) {
                setSuccessMessage("登録に成功しました！ログインページに移動します...");
                setTimeout(() => {
                    router.push("/login"); // 成功したらログインページに遷移
                }, 2000);
            } else {
                const errorData = await res.json();
                setErrorMessage(errorData.message || "登録に失敗しました。");
            }
        } catch (error) {
            setErrorMessage("サーバーエラーが発生しました。もう一度お試しください。");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">新規登録</h1>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium">
                            ユーザー名
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">
                            メールアドレス
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium">
                            パスワード
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        登録
                    </button>
                </form>

                {/* Googleログインボタン */}
                <div id="google-signin-button" className="mt-4"></div>

                {/* ログインページへのリンク */}
                <p className="text-center text-gray-600 mt-6">
                    既にアカウントをお持ちですか？{" "}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        ログインはこちら
                    </a>
                </p>
            </div>
        </div>
    );
}