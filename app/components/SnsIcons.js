"use client"

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Animate_motion from "../animation/animation_motion";

export default function SnsIcons() {
    return (
        <Animate_motion>
            {({ animateLine }) => (
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-6 inline-block">
                    SNSで最新情報をチェック！
                    <span className={`block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2 ${animateLine ? "animate-draw" : ""
                            }`}></span>
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    Local Eats Memo の最新情報やおすすめ店舗をSNSで発信しています。<br></br>
                    フォローして地域のグルメをもっと楽しもう！
                </p>
                <div className="flex justify-center space-x-8">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-900 hover:opacity-70 text-6xl"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:opacity-70 text-6xl"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:opacity-70 text-6xl"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
            )}
        </Animate_motion>
    )
}