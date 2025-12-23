
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata = {
  title: "Local Eats Memo",
  description: "食事メモアプリ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
