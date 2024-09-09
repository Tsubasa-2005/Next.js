"use client";

import React, { useState } from "react";

export interface FormProps {
    onSubmit: (user_id: number, password: string) => void; // ログイン処理を親コンポーネントに渡す
    errorMessage: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, errorMessage }) => {
    const [userId, setUserId] = useState<string>(""); // 文字列として入力を保持
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 入力が整数かどうかを確認
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber) || !Number.isInteger(userIdNumber)) {
            setInputError("ユーザーIDは整数である必要があります");
            return;
        }

        // エラーがなければ親コンポーネントにデータを渡す
        setInputError("");
        onSubmit(userIdNumber, password);
    };

    return (
        <div>
            {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            {inputError && (
                <p className="text-red-500 text-center mb-4">{inputError}</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user_id" className="block text-sm font-medium">
                        ユーザーID
                    </label>
                    <input
                        id="user_id"
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded mt-1 no-spinner" // no-spinnerクラスを適用
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
                    ログイン
                </button>
            </form>
        </div>
    );
};

export default Form;