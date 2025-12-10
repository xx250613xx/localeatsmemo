"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TfiMapAlt } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiShootingStarBold } from "react-icons/pi";

const features = [
    { icon: <TfiMapAlt className="text-white" />, label: "地域密着" },
    { icon: <LuNotebookPen className="text-white" />, label: "簡単記録" },
    { icon: <IoShareSocialOutline className="text-white" />, label: "投稿シェア" },
    { icon: <PiShootingStarBold className="text-white" />, label: "お気に入り" },
];

const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.12, duration: 0.4, ease: "easeOut" },
    },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ランダムな動きを生成する関数
function genKeyframes(seed) {
    const rand = (min, max) =>
        min + (Math.sin(seed++) * 0.5 + 0.5) * (max - min);

    const steps = 5;
    const x = [];
    const y = [];
    for (let i = 0; i < steps; i++) {
        x.push(rand(-12, 12));
        y.push(rand(-12, 12));
    }
    // 最後に原点へ戻す
    x.push(0);
    y.push(0);
    return { x, y };
}

export default function FeatureIcons() {
    const keyframes = useMemo(
        () => features.map((_, i) => genKeyframes(i + 1)),
        []
    );

    return (
        <section className="bg-gray-50 py-12">
            <h2 className="text-3xl font-bold text-center mb-10">機能が盛りだくさん！</h2>

            <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={container}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4"
            >
                {features.map(({ icon, label }, i) => (
                    <motion.li
                        key={i}
                        variants={item}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-brand rounded-lg grid place-items-center shadow-sm hover:shadow-md transition-shadow duration-200">
                            <motion.div
                                className="text-2xl md:text-3xl"
                                animate={{
                                    x: keyframes[i].x,
                                    y: keyframes[i].y,
                                }}
                                transition={{
                                    duration: 2.2,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ x: 0, y: 0 }}
                            >
                                {icon}
                            </motion.div>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700">
                            {label}
                        </span>
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
}