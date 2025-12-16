"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import BackGroundIcons from "../components/BackGroundIcons";
import { GiTigerHead } from "react-icons/gi";
import Animate_motion from "../animation/animation_motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 使いたい機能を明示的に ChartJS.register(...) で登録しないとグラフが描画されない
ChartJS.register(
  CategoryScale, // X軸などのカテゴリ軸（ラベルを扱う）
  LinearScale, // Y軸などの数値軸（数値を扱う）
  BarElement, // 棒グラフの描画要素
  PointElement, // 折れ線グラフの点の描画要素
  LineElement, // 折れ線グラフの線の描画要素
  Title, // グラフ上部のタイトル表示機能
  Tooltip, // マウスホバー時の説明文表示機能
  Legend // グラフの凡例（ラベル一覧）表示機能
);

export default function RankingPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await fetch("/config/_config_storelist.json");
      const data = await res.json();
      setStores(data);
    };
    fetchStores();
  }, []);

  // タグランキング
  const tagCounts = {};
  stores.forEach((store) => {
    // 店舗ごとに持っているタグをループ
    store.tags.forEach((tag) => {
      if (!tagCounts[tag]) {
        // tagCountsオブジェクトに、全店舗分のタグ合計数を記録していく。
        tagCounts[tag] = 0;
      }
      tagCounts[tag] += 1;
    });
  });
  const tagLabels = Object.keys(tagCounts);
  const tagValues = Object.values(tagCounts);

  // Chart.jsを使用する場合の、基本フォーマット。グラフ描画のために、オブジェクトを渡す。
  const tagData = {
    labels: tagLabels, // タグ名一覧
    datasets: [ // グラフに描画する要素
      {
        label: "タグ出現回数", // マウスホバー時に表示される文言
        data: tagValues, // 各ラベルに対応する数値
        backgroundColor: "#f97316", // 棒グラフの色
      },
    ],
  };

  // エリア別ランキング
  const areaCounts = {};
  stores.forEach((store) => {
    // 分かりづらいけど、ショートハンドで書いてるだけで、タグランキングの
    // if (!tagCounts[tag]) {...} tagCounts[tag] += 1;の部分と同じ意味。
    areaCounts[store.area] = (areaCounts[store.area] || 0) + 1;
  });
  const areaLabels = Object.keys(areaCounts);
  const areaValues = Object.values(areaCounts);

  const areaData = {
    labels: areaLabels,
    datasets: [
      {
        label: "エリア別店舗数",
        data: areaValues,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  // タグ × エリア クロス集計
  const allTags = [...new Set(stores.flatMap((s) => s.tags))];
  const allAreas = [...new Set(stores.map((s) => s.area))];

  const crossTable = allTags.map((tag) => {
    const row = {};
    allAreas.forEach((area) => {
      row[area] = stores.filter(
        (s) => s.area === area && s.tags.includes(tag)
      ).length;
    });
    return { tag, ...row };
  });

  return (
    <>
      <BackGroundIcons textIcon="🐯" iconElement={<GiTigerHead />} />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">ランキング・分析</h2>

        {/* タグランキング */}
        <section className="mb-12">
          <Animate_motion>
            <h3 className="text-2xl font-semibold mb-4">タグランキング</h3>
            <div className="bg-white shadow-md rounded-lg p-6 w-full overflow-x-auto relative z-10">
              <Bar data={tagData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Animate_motion>
        </section>

        {/* エリア別ランキング */}
        <section className="mb-12">
          <Animate_motion>
            <h3 className="text-2xl font-semibold mb-4">エリア別ランキング</h3>
            <div className="bg-white shadow-md rounded-lg p-6 w-full overflow-x-auto relative z-10">
              <Line data={areaData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Animate_motion>
        </section>

        {/* タグ × エリア クロス集計 */}
        <section>
          <Animate_motion>
            <h3 className="text-2xl font-semibold mb-4">タグ × エリア クロス集計</h3>
            <div className="w-full bg-white shadow-md rounded-lg p-6 overflow-x-auto relative z-10">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 sm:px-4 py-2 text-left">タグ</th>
                    {allAreas.map((area) => (
                      <th key={area} className="border px-2 sm:px-4 py-2 text-center">{area}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {crossTable.map((row) => (
                    <tr key={row.tag}>
                      <td className="border px-2 sm:px-4 py-2 font-semibold">{row.tag}</td>
                      {allAreas.map((area) => {
                        const value = row[area];
                        const bgColor =
                          value === 0
                            ? "bg-white"
                            : value === 1
                              ? "bg-orange-100"
                              : value === 2
                                ? "bg-orange-200"
                                : value === 3
                                  ? "bg-orange-300"
                                  : "bg-orange-400";
                        return (
                          <td key={area} className={`border px-2 sm:px-4 py-2 text-center ${bgColor}`}>
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animate_motion>
        </section>
      </main>
    </>
  );
}