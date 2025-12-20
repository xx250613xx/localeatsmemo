"use client";

import Link from "next/link";
import Animate_motion from "../animation/animation_motion";
import { PiListHeartBold } from "react-icons/pi";
import { GiCrownedHeart } from "react-icons/gi";
import { TbMapHeart } from "react-icons/tb";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

export default function MenuList() {
    const menus = [
        {
            title: "店舗一覧",
            text: "全店舗から条件を絞って検索。",
            link: "/store_list",
            sumb: <PiListHeartBold />
        },
        {
            title: "ランキング",
            text: "人気グルメランキングをチェック。",
            link: "/ranking",
            sumb: <GiCrownedHeart />
        },
        {
            title: "店舗マップ",
            text: "エリアごとに気になる店舗を探す",
            link: "/store_map",
            sumb: <TbMapHeart />
        }
    ];

    return (
        <Animate_motion>
            {({ animateLine }) => (
                <>
                    <div className="relative mb-12 text-center">
                        <h2 className="relative inline-block text-3xl font-bold">
                            サービスメニュー
                            <span
                                className={`block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2 ${animateLine ? "animate-draw" : ""
                                    }`}
                            ></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {menus.map((menu, index) => (
                            <Link
                                key={index}
                                href={menu.link}
                                className="group relative block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all overflow-hidden"
                            >
                                {/* 花火animation */}
                                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                    {[...Array(7)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`particle-icon absolute text-brand-light opacity-0 group-hover:animate-firework firework-${i}`}
                                            style={{
                                                // 0から15%刻みで値が渡り、90%までの7列配置
                                                left: `${(i % 7) * 15}%`, 
                                                bottom: 0,
                                            }}
                                        >
                                            {menu.sumb}
                                        </span>
                                    ))}
                                </div>



                                {/* 既存のメインコンテンツ */}
                                <div className="flex flex-col items-center text-center relative z-10">
                                    <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-170 group-hover:text-accent">
                                        {menu.sumb}
                                    </div>

                                    <dt className="font-bold text-lg mb-2">{menu.title}</dt>
                                    <dd className="text-gray-600 group-hover:font-bold group-hover:text-black group-hover:border-b-2 group-hover:border-black">{menu.text}</dd>

                                    <div className="mt-4">
                                        <div className="w-10 h-10 flex items-center justify-center text-brand text-5xl group-hover:[transform:scale(1.8)_rotate(360deg)] group-hover:text-accent transition-all duration-300 sm:text-2xl">
                                            <BsArrowUpRightSquareFill />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </Animate_motion>
    );
}