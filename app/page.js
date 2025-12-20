import MenuList from "./components/ServiceMenu";
import UserTestimonials from "./components/UserTestiMonials";
import FeatureIcons from "./components/FeatureIcon";
import Top_slider from "./components/top_slider";
import HowToUse from "./components/HowToUse";
import SnsIcons from "./components/SnsIcons";
import BackGroundIcons from "./components/BackGroundIcons";
import { SiFoodpanda } from "react-icons/si";

export default function Home() {

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
          <MenuList />
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