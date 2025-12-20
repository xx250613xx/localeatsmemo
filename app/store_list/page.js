"use client";

import { useEffect, useState } from "react";
import BackGroundIcons from "../components/BackGroundIcons";
import { GiElephant } from "react-icons/gi";
import Animate_motion from "../animation/animation_motion";
import Link from "next/link";
import ServiceMenu from "../components/ServiceMenu"
import FeatureIcons from "../components/FeatureIcon";
import SnsIcons from "../components/SnsIcons";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");   // areaフィルタ
  const [selectedTag, setSelectedTag] = useState("");     // tagフィルタ

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("/config/_config_storelist.json");
        if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
        const data = await res.json();
        setStores(data);
      } catch (err) {
        console.error("店舗データ取得エラー:", err);
      }
    };
    fetchStores();
  }, []);

  // storesオブジェクトを順番にチェック
  // エリアとタグの選択(状態管理)に一致するものを新しい配列(filteredStores)に格納
  const filteredStores = stores.filter((store) => {
    const areaMatch = selectedArea ? store.area === selectedArea : true;
    const tagMatch = selectedTag ? store.tags.includes(selectedTag) : true;
    return areaMatch && tagMatch;
  });

  // storesオブジェクトからarea一覧とtag一覧を取り出して、新しい配列に格納
  // Setとすると、重複を排除できるので、店舗数が増えて、areaとtagsが増えても重複しない
  const areas = [...new Set(stores.map((store) => store.area))];
  const tags = [...new Set(stores.flatMap((store) => store.tags))];

  return (
    <>
      <BackGroundIcons textIcon="🐘" iconElement={<GiElephant />} />
      <main className="max-w-6xl mx-auto px-4 py-12 pt-16">
        <h2 className="text-3xl font-bold text-center mb-10">店舗一覧</h2>

        {/* 再レンダリング(状態が変わるので、エリアかタグ選択でも)の度に、
            29行目のロジックで候補がフィルタリングされた後のareasが渡る。
            後は、mapで要素生成するだけ。 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">全エリア</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">全タグ</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* 店舗カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 justify-items-center">
          {filteredStores.map((store, index) => (
            <Animate_motion key={index}>
              <Link href={"#"}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow 
                p-6 text-center flex flex-col relative z-10
                w-full sm:w-[520px] h-[380px]">
                  <div className="h-56 flex items-center justify-center mb-4">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="max-h-full max-w-full object-contain rounded-md"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{store.name}</h3>
                  <p className="text-base text-gray-600 flex-grow">{store.description}</p>
                </div>

              </Link>
            </Animate_motion>
          ))}
        </div>
      </main>
      <div className="relative z-10">
        <ServiceMenu />
      </div>
      <div className="py-[4%] relative z-10">
        <FeatureIcons />
      </div>
      <div className="pb-[4%] relative z-10">
        <SnsIcons />
      </div>
    </>
  );
}