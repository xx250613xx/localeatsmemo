import MenuList from "./components/menu_list";
import UserTestimonials from "./components/UserTestiMonials";
import FeatureIcons from "./components/FeatureIcon";
import Top_slider from "./components/top_slider";
import DiagonalBackgroundText from "./components/BackGroundIcons";

export default function Home() {

  const menus = [
    {
      title: "店舗一覧。",
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
      text: "サービス一覧から気になる機能を探す",
      link: "/store_map",
      sumb: "https://placehold.jp/fec190/ffffff/307x307.png?text=Map&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2240px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23f58529)%2C%20to(%23fec190))%22%7D"
    }
  ];

  return (
    <>
      <main>
        <DiagonalBackgroundText />
        {/* MV Section */}
        <section className="w-full text-center py-16 animate-fadeInUp">
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
        <section className="max-w-6xl mx-auto px-6 py-16 animate-fadeInUp">
          <MenuList menus={menus} />
        </section>

        {/* Testimonials Section */}
        <section className="py-16 animate-fadeInUp">
          <UserTestimonials />
        </section>

        {/* FeatureIcon Section */}
        <section className="py-16">
          <FeatureIcons />
        </section>
      </main>
    </>
  );
}