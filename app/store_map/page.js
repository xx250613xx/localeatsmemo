"use client"

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapPage() {

  // 地図インスタンスに限らず、reactでは何らかの状態が変わると、コンポーネント全体が再レンダリングされる
  // ので、状態が変わっても値を保持できるuserefで、値(マップのインスタンスと、dom)を保持する
  // 関係のない再レンダリングの度に地図が初期化されるような、無駄な更新をしないようにしてるイメージ
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // サイドバーに表示する選択店舗
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/config/_config_storelist.json");
      const data = await res.json();

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
    <div className="min-h-screen bg-white">
      <h1 className="text-lg md:text-2xl font-semibold text-slate-800 px-4 py-4">
        店舗マップ
      </h1>
      <p className="text-sm text-slate-500 px-4">
        JSONから取得した店舗情報をマップに表示します
      </p>
      <main className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="md:col-span-7">
            <div
              ref={containerRef}
              className="h-[70vh] w-full rounded-lg overflow-hidden shadow bg-white"
            />
          </div>
          <aside className="md:col-span-3">
            <div className="h-full rounded-lg overflow-hidden shadow bg-white p-4">
              {selectedStore ? (
                <div className="space-y-3">
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
                  ピンをクリックすると店舗画像を表示します
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}