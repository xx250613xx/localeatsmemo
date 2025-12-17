"use client"

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import FeatureIcons from "../components/FeatureIcon";
import ServiceMenu from "../components/ServiceMenu"
import SnsIcons from "../components/SnsIcons";
import BackGroundIcons from "../components/BackGroundIcons";
import { IoFishSharp } from "react-icons/io5";

export default function MapPage() {
  const menus = [
    {
      title: "店舗一覧",
      text: "全店舗から条件を絞って検索。",
      link: "/store_list",
      sumb: "https://placehold.jp/fec190/ffffff/307x307.png?text=Store List&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2240px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23f58529)%2C%20to(%23fec190))%22%7D"
    },
    {
      title: "ランキング",
      text: "人気グルメランキングをチェック。",
      link: "/ranking",
      sumb: "https://placehold.jp/fec190/ffffff/307x307.png?text=Ranking&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2240px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23f58529)%2C%20to(%23fec190))%22%7D"
    },
    {
      title: "店舗マップ",
      text: "エリアごとに気になる店舗を探す",
      link: "/store_map",
      sumb: "https://placehold.jp/fec190/ffffff/307x307.png?text=Map&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2240px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23f58529)%2C%20to(%23fec190))%22%7D"
    }
  ];

  // 地図インスタンスに限らず、reactでは何らかの状態が変わると、コンポーネント全体が再レンダリングされる
  // ので、状態が変わっても値を保持できるuserefで、値(マップのインスタンスと、dom)を保持する
  // 関係のない再レンダリングの度に地図が初期化されるような、無駄な更新をしないようにしてるイメージ
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // サイドバーに表示する選択店舗
  const [selectedStore, setSelectedStore] = useState(null);
  // 初期表示用の店舗一覧
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/config/_config_storelist.json");
      const data = await res.json();

      // 取得した店舗一覧を状態に保持（初期表示用）
      setStores(data);

      // マップ初期化
      const map = new maplibregl.Map({
        container: containerRef.current, // 地図を描画するDOM要素
        style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json", // OpenStreetMap Foundation Japanのデータを利用、商用(今回は違うが)利用ok
        center: [127.8570, 26.3940], // 初期位置(沖縄県うるま市付近)
        zoom: 8, // 初期ズームレベル
      });
      mapRef.current = map;

      map.on("load", () => {
        data.forEach((store) => {
          if (store.location.lat && store.location.lng) {
            const marker = new maplibregl.Marker() // 地図上にピンを生成
              .setLngLat([store.location.lng, store.location.lat]) // 店舗の緯度経度にピンを配置
              .setPopup( // マーカーをクリックすると表示される吹き出し（ポップアップ）を定義
                new maplibregl.Popup().setHTML(`
                  <div style="font-weight:600">${store.name}</div>
                  <div style="font-size:12px;color:#475569">${store.location.address}</div>
                  <div style="font-size:12px">${store.description}</div>
                  <div style="font-size:12px;color:#2563eb">営業時間: ${store.location.hours}</div>
                `)
              )
              .addTo(map);

            // ピンをクリックしたら選択店舗を更新 → サイドバーに反映
            marker.getElement().addEventListener("click", () => {
              setSelectedStore(store);
            });
          }
        });

        // 全店舗を収めるようにズーム調整
        const bounds = new maplibregl.LngLatBounds();// 地図上の「表示範囲」を表すオブジェクトを初期化
        data.forEach((store) => {

          // 各店舗の緯度経度をboundsオブジェクトに追加していき、全店舗を含む表示範囲を計算。
          // extendはmaplibre-glの、LngLatBoundsクラスに準備されているメソッドで、表示範囲を新しい座標を含むように拡張する処理をしている
          if (store.location.lat && store.location.lng) {
            bounds.extend([store.location.lng, store.location.lat]);
          }
        });
        if (!bounds.isEmpty()) {
          // ↑で計算したオブジェクトを渡して、地図の表示範囲を、全店舗が画面内に収まるように調整
          map.fitBounds(bounds, { padding: 40, maxZoom: 14 });
        }
      });
    };

    init();

    // udemyでも出てきたやつ。コンポーネントがアンマウントされるときに呼ばれて、mapインスタンスを削除する。
    // 無くても動くが、パフォーマンス観点で設定するのが一般的(たぶん)。
    return () => mapRef.current?.remove();
  }, []);

  return (
    <>
      <BackGroundIcons textIcon="🐟" iconElement={<IoFishSharp />} />
      <div className="min-h-screen bg-white">
        <h1 className="text-lg md:text-2xl font-semibold text-slate-800 px-4 py-4">
          店舗マップ
        </h1>
        <p className="text-sm text-slate-500 px-4">
          JSONから取得した店舗情報をマップに表示します
        </p>
        <main className="px-4 py-4 mb-[5%]">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
            <div className="md:col-span-7">
              <div
                ref={containerRef}
                className="h-[70vh] w-full rounded-lg overflow-hidden shadow bg-white"
              />
            </div>
            <aside className="md:col-span-3 relative z-10">
              <div className="h-[70vh] rounded-lg shadow bg-white p-4 overflow-y-auto">
                {selectedStore ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedStore(null)}
                      className="text-sm hover:underline mb-2 cursor-pointer w-[100%] text-left font-bold"
                    >
                      ← 店舗一覧に戻る
                      <span className="block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2"></span>
                    </button>
                    <img
                      src={selectedStore.image}
                      alt={selectedStore.name}
                      className="w-full h-auto rounded object-cover"
                    />
                    <div className="text-base font-semibold text-slate-800">
                      {selectedStore.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {selectedStore.location.address}
                    </div>
                    <div className="text-sm text-slate-500">
                      {selectedStore.description}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-500">
                    <p className="font-bold text-black">
                      マップ上のピンをクリックすると店舗情報詳細を表示します
                      <span className="block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2"></span>
                    </p>
                    <ul className="mt-3 space-y-2">
                      {stores.map((store) => (
                        <li
                          key={store.id}
                          className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 cursor-pointer"
                          onClick={() => setSelectedStore(store)}
                        >
                          <img
                            src={store.image}
                            alt={store.name}
                            className="w-12 h-12 rounded object-cover"
                            loading="lazy"
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-800 truncate">
                              {store.name}
                            </div>
                            <div className="text-xs text-slate-600 truncate">
                              {store.area}・{store.location.hours}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
        <div className="relative z-10">
          <ServiceMenu menus={menus} />
        </div>
        <div className="relative z-10 py-[4%]">
          <FeatureIcons />
        </div>
        <div className="relative z-10 pb-[4%]">
          <SnsIcons />
        </div>
      </div>
    </>
  );
}