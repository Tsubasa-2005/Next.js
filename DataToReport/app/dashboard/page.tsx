"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // サイドバーの開閉状態

    // サイドバーの表示を切り替える関数
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex">


            {/* メインコンテンツ */}
            <div className="flex-1 flex flex-col">
                {/* ヘッダー */}
                <header className="bg-gray-100 shadow-lg flex justify-between items-center py-4 px-6">
                    <h1 className="text-2xl font-bold ml-4">ダッシュボード</h1>
                </header>

                {/* コンテンツ */}
                <main className="flex-1 bg-gray-100 flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                        <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                ここからレポートの管理や設定の変更ができます。
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full"
                                onClick={() => router.push("/reports")}
                            >
                                レポートを表示
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full"
                                onClick={() => router.push("/users")}
                            >
                                ユーザー管理
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full"
                                onClick={() => router.push("/settings")}
                            >
                                設定
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}