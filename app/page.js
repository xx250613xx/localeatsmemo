import MenuList from "./components/ServiceMenu";
import UserTestimonials from "./components/UserTestiMonials";
import FeatureIcons from "./components/FeatureIcon";
import Top_slider from "./components/top_slider";
import HowToUse from "./components/HowToUse";
import SnsIcons from "./components/SnsIcons";
import BackGroundIcons from "./components/BackGroundIcons";
import { SiFoodpanda } from "react-icons/si";

export default function Home() {

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

  return (
    <>
      <BackGroundIcons textIcon="🐼" iconElement={<SiFoodpanda />}/>
      <main>
        {/* MV Section */}
        <section className="w-full text-center pt-16 animate-fadeInUp relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
            地域の食を旅しよう。
            <br />
            あなたのまちの味を楽しく記録・発見。
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            グルメ好きのための新しい体験をここから。
          </p>
          <Top_slider />
        </section>

        {/* Menu Section */}
        <section className="bg-gray-50 py-16 animate-fadeInUp">
          <MenuList menus={menus} />
        </section>

        {/* UserTestiMonials Section */}
        <section className="py-16 animate-fadeInUp">
          <UserTestimonials />
        </section>

        {/* FeatureIcon Section */}
        <section className="py-16 animate-fadeInUp">
          <FeatureIcons />
        </section>

        {/* How to Use Section */}
        <section className="pb-16 animate-fadeInUp">
          <HowToUse />
        </section>

        {/* SNS Section */}
        <section className="bg-gray-100 py-16 animate-fadeInUp">
          <SnsIcons />
        </section>
      </main>
    </>
  );
}