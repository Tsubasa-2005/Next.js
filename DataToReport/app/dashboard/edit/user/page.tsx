"use client";

import { useState } from "react";

export default function EditProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    const handleSave = () => {
        // 保存ロジックを追加
        console.log("Profile updated:", { username, email, bio });
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">ユーザ情報編集</h1>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">ユーザ名</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="ユーザ名"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="メールアドレス"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">自己紹介</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="自己紹介"
                />
            </div>
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                保存する
            </button>
        </div>
    );
}