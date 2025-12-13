"use client";

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

export default function FeatureIcons() {

    return (
        <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-gray-50 py-12">
                <h2 className="text-3xl font-bold text-center mb-10">機能が盛りだくさん！</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center max-w-4xl mx-auto">
                    {features.map(({ icon, label }, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand rounded-lg grid place-items-center shadow-sm hover:shadow-md transition-shadow duration-200 text-3xl">
                                {icon}
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}