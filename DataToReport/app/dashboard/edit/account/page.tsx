"use client";

import { useState } from "react";

export default function AccountSettings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    const handleSave = () => {
        if (newPassword === confirmPassword) {
            // 保存ロジックを追加
            console.log("Account settings updated:", { currentPassword, newPassword, twoFactorAuth });
        } else {
            alert("新しいパスワードが一致しません");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">アカウント設定</h1>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">現在のパスワード</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="現在のパスワード"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">新しいパスワード</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="新しいパスワード"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">新しいパスワードの確認</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="新しいパスワードの確認"
                />
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={twoFactorAuth}
                        onChange={(e) => setTwoFactorAuth(e.target.checked)}
                        className="mr-2"
                    />
                    二段階認証を有効にする
                </label>
            </div>
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                保存する
            </button>
        </div>
    );
}