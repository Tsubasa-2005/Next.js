"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {pingServer} from "@/api/ping";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkPing = async () => {
      const result = await pingServer();

      if (result !== null) {
        console.log(result);
        setHasError(true);
        router.push('/404');
      } else {
        setLoading(false);
      }
    };

    checkPing().then(r => r);
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return null;
  }

  return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gray-100 py-20 px-8">
          <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl font-bold leading-tight">
                会計業務を効率化する
              </h1>
              <p className="mt-4 text-gray-700 text-lg">
                データを簡単に管理し、会計レポートを自動で生成。時間を節約し、より重要な業務に集中できるようサポートします。
              </p>
              <button
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                  onClick={() => router.push("/login")}
              >
                今すぐ始める
              </button>
            </div>
            <div className="md:w-1/2">
              <Image
                  src="/images/accounting-hero.png"
                  alt="会計業務効率化"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-semibold text-center mb-12">
              製品の特徴
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src="/images/feature1.png"
                    alt="簡単なデータ管理"
                    width={150}
                    height={150}
                    className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">簡単なデータ管理</h3>
                  <p className="mt-2 text-gray-600">
                    会計データを一元管理し、簡単にレポートを作成できます。
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src="/images/feature2.png"
                    alt="自動レポート生成"
                    width={150}
                    height={150}
                    className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">自動レポート生成</h3>
                  <p className="mt-2 text-gray-600">
                    会計データに基づき、システムが自動でレポートを生成します。
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src="/images/feature3.png"
                    alt="クラウドで安全なデータ管理"
                    width={150}
                    height={150}
                    className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">クラウドで安全なデータ管理</h3>
                  <p className="mt-2 text-gray-600">
                    データはクラウド上で安全に管理され、いつでもアクセス可能です。
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src="/images/feature4.png"
                    alt="多機能インターフェース"
                    width={150}
                    height={150}
                    className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">多機能インターフェース</h3>
                  <p className="mt-2 text-gray-600">
                    直感的な操作で、必要なデータや機能にすぐアクセスできます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white text-center">
          <h2 className="text-3xl font-bold">会計業務を効率化する準備はできましたか？</h2>
          <p className="mt-4 text-lg">今すぐ始めて、時間とコストを削減しましょう！</p>
          <button
              className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-200 transition"
              onClick={() => router.push("/login")}
          >
            今すぐ始める
          </button>
        </section>
      </div>
  );
}