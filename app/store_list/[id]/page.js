import fs from "fs/promises";
import path from "path";
import SnsIcons from "@/app/components/SnsIcons";
import FeatureIcons from "@/app/components/FeatureIcon";
import ServiceMenu from "@/app/components/ServiceMenu"
import BackGroundIcons from "@/app/components/BackGroundIcons";
import { GiHorseHead } from "react-icons/gi";

import { notFound } from "next/navigation";
async function getStore(id) {
    const filePath = path.join(process.cwd(), "public", "config", "_config_storelist.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const stores = JSON.parse(jsonData);

    const store = stores.find((s) => s.id === id);

    if (!store) {
        notFound(); // 存在しない店舗ページにアクセスされた場合、app/not-found.jsが表示される
    }

    return store;
}


/*
バグ説、SSRで起きたことまとめ

・SSRのページでエラー発生
→内容はsource map関連のエラー
Git\localeatsmemo\.next\dev\server\chunks\ssr\node_modules_473cc24e._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed

・原因
→特定の条件下でparamsが同期オブジェクトではなくPromiseとして渡されることがあり、
paramsがundefined → fetch が失敗 → エラー → source mapエラー。となる。

・解決策
→paramsをawaitで受け取り、Promiseのエラーが出ないようにしてあげる。

・paramsとは？
→少し難解だが、propsの一部という理解で良さそう。
→propsなのにPromiseなのはなぜか？
→ここも難解なので、とりあえず「特定の条件がそろうと内部的にPromiseになる場合がある」、「このエラーが出たら、まずawaitで受け取ってあげて解消するか確認する」と理解しておけば良さそう。
*/

export default async function StorePage({ params }) {
    const { id } = await params; // ← Promise 対策（今回の重要ポイント）
    const store = await getStore(id);

    return (
        <>
            <BackGroundIcons textIcon="🐴" iconElement={<GiHorseHead />} />
            <main className="max-w-3xl mx-auto px-4 py-10 mt-10 relative z-10">
                <div className="mb-6">
                    <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-110 object-cover rounded-lg shadow"
                    />
                </div>

                <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
                <p className="text-gray-600 mb-4">{store.area}</p>
                <p className="text-lg leading-relaxed mb-6">{store.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {store.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">店舗情報</h2>
                    <p className="mb-1">
                        <span className="font-medium">住所：</span>
                        {store.location.address}
                    </p>
                    <p>
                        <span className="font-medium">営業時間：</span>
                        {store.location.hours}
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">地図</h2>
                    <iframe
                        src={`https://www.google.com/maps?q=${store.location.lat},${store.location.lng}&z=16&output=embed`}
                        width="100%"
                        height="350"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg shadow"
                    ></iframe>
                </div>

            </main>
            <div className="relative z-10">
                <ServiceMenu />
            </div>
            <div className="relative z-10 py-[4%]">
                <FeatureIcons />
            </div>
            <div className="relative z-10 pb-[4%]">
                <SnsIcons />
            </div>
        </>
    );
}


