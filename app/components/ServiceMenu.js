"use client";

import Link from "next/link";
import Animate_motion from "../animation/animation_motion";

export default function MenuList({ menus }) {
    return (
        <Animate_motion>
            {({ animateLine }) => (
                <>
                    <div className="relative mb-12 text-center">
                        <h2 className="relative inline-block text-3xl font-bold">
                            サービスメニュー
                            <span className={`block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2 ${animateLine ? "animate-draw" : ""
                            }`}></span>
                        </h2>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {menus.map((menu, index) => (
                            <Link
                                key={index}
                                href={menu.link}
                                className="block bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                            >
                                <dl className="relative z-10">
                                    <img
                                        src={menu.sumb}
                                        alt={menu.title}
                                        className="mx-auto mb-4 w-full max-w-[240px] h-auto rounded-md"
                                    />
                                    <dt className="font-bold text-lg mb-2">{menu.title}</dt>
                                    <dd className="text-gray-600">{menu.text}</dd>
                                </dl>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </Animate_motion>
    );
}