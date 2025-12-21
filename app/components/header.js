"use client";
import { useState, useEffect } from "react";
import PageList from "../../public/config/_config_allPageList";
import Link from "next/link";

import { PiListHeartBold } from "react-icons/pi";
import { GiCrownedHeart } from "react-icons/gi";
import { TbMapHeart } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function Header() {
    const allpage = PageList();

    const iconMap = {
        store_list: <PiListHeartBold />,
        ranking: <GiCrownedHeart />,
        store_map: <TbMapHeart />,
        inquiry: <FaHandHoldingHeart />,
    };

    // headerの表示状態
    const [showHeader, setShowHeader] = useState(true);
    // スクロール位置(数値)の状態
    const [lastScrollY, setLastScrollY] = useState(0);

    // ハンバーガーメニューの開閉状態
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY; // 現在のスクロール位置
            /*
            現在と前回のスクロール位置(ページ最上部が0)を比較し、現在の方が小さい = 上スクロールしてるので
            setShowHeaderにtrueが渡り、headerが表示される。
            */
            setShowHeader(currentY < lastScrollY);
            setLastScrollY(currentY); // 今回のスクロール位置を「前回のスクロール状態(数値)」として保存
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // いつものクリーンアップ
    }, [lastScrollY]);

    return (
        <header
            className={`bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light text-white px-4 sm:px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
        >
            <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-90 transition">
                Local Eats Memo
            </Link>

            {/* ハンバーガーアイコン */}
            <button
                className="md:hidden text-3xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
            </button>

            {/* PCheader */}
            <nav className="hidden md:block">
                <ul className="flex items-center gap-6">
                    {allpage.map((page) => (
                        <li key={page}>
                            <Link
                                href={`/${page}`}
                                className="relative text-lg font-medium hover:text-white/80 hover:border-b-2 hover:border-white flex items-center"
                            >
                                <span className="text-2xl pr-1">{iconMap[page]}</span>
                                {page}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* SPheader */}
            {isOpen && showHeader && (
                <nav className="absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-md md:hidden shadow-lg bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light">
                    <ul className="flex flex-col items-start gap-4 p-4">
                        {allpage.map((page) => (
                            <li key={page} className="w-full">
                                <Link
                                    href={`/${page}`}
                                    className="flex items-center text-lg font-medium hover:text-white/80 hover:border-b-2 hover:border-white pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-2xl pr-2">{iconMap[page]}</span>
                                    {page}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}