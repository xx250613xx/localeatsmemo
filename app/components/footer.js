"use client"; // フックを使うので必須

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname(); // 現在のパスを取得
    const segments = pathname.split("/").filter(Boolean); // "/"で分割して空要素除去

    return (
        <footer className="bg-gray-800 text-white p-4">
            <nav className="mt-2">
                <Link href="/" className="mr-2">
                    Home
                </Link>
                {/* パンくずリスト */}
                {segments.map((segment, index) => {
                    // パンくず用のリンクパスを生成
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

                    return (
                        <span key={href}>
                            {" > "}
                            {isLast ? (
                                <span>{segment}</span> // 最後はリンクなし
                            ) : (
                                <Link href={href}>{segment}</Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </footer>
    );
}