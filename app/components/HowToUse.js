"use client"

import Animate_motion from "../animation/animation_motion"

export default function HowToUse() {
    return (
        <Animate_motion>
            {({ animateLine }) => (
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-6 inline-block">使い方はとてもシンプル！
                    <span className={`block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2 ${animateLine ? "animate-draw" : ""
                            }`}></span>
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    Local Eats Memo は、地域のグルメを記録・共有するためのアプリです。
                    気になるお店を探して、訪問したら写真やメモを残しましょう。
                    ランキングやマップ機能で、あなたのまちの新しい味を発見できます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">① 店舗を探す</h3>
                        <p className="text-gray-600">一覧やマップから気になる店舗をチェック。</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">② 記録する</h3>
                        <p className="text-gray-600">訪問したら写真やメモを残して、自分だけのグルメ日記に。</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-3">③ シェアする</h3>
                        <p className="text-gray-600">お気に入りを共有して、みんなで地域の食を楽しもう。</p>
                    </div>
                </div>
            </div>
            )}
        </Animate_motion>
    )
}