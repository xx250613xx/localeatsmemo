
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import BackGroundIcons from "./components/BackGroundIcons";

export const metadata = {
  title: "Local Eats Memo",
  description: "食事メモアプリ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
