"use client";

import { TfiMapAlt } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiShootingStarBold } from "react-icons/pi";
import Animate_motion from "../animation/animation_motion";

const features = [
    { icon: <TfiMapAlt className="text-white" />, label: "地域密着" },
    { icon: <LuNotebookPen className="text-white" />, label: "簡単記録" },
    { icon: <IoShareSocialOutline className="text-white" />, label: "投稿シェア" },
    { icon: <PiShootingStarBold className="text-white" />, label: "お気に入り" },
];

export default function FeatureIcons() {

    return (
        /*
        ・Animate_motionが呼ばれ、chirdrenに関数式({({ animateLine }) => ()の部分)が渡される
        ・animate_motion.js内で、animateLineという状態を初期値falseで初期化
        ・animate_motion.js内で、chirdrenに対してanimateLine(中身はtrue)を引数で渡す
        ・あとは、以下のanimateLineがtrueで渡ってきてるので、spanの分岐でanimate-drawというclassが付与され
        左からスライドするアニメーションと、線が引かれるアニメーションが、ウィンドウに要素が入るたびに発火する。
        */ 
        <Animate_motion>
            {({ animateLine }) => (
            <div className="bg-gray-50 py-12 text-center">
                <h2 className="text-3xl font-bold text-center mb-10 inline-block">
                    機能が盛りだくさん！
                    <span
                        className={`block h-[4px] bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light rounded-full mt-2 ${animateLine ? "animate-draw" : ""
                            }`}
                    ></span>
                </h2>

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
            )}
        </Animate_motion>
    );

}