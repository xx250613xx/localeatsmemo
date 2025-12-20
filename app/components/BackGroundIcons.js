"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { genKeyframes } from "../animation/animation_BackGroundIcon";

export default function BackGroundIcons({ textIcon, iconElement }) {
    const iconCount = 10;
    const [mounted, setMounted] = useState(false);
    const [positions, setPositions] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    // マウント検知：依存配列空で、初回レンダリング時のみtrueにして、クライアント側で準備できたことを明示
    useEffect(() => {
        setMounted(true);
    }, []);

    // 初期位置設定：クライアント側で準備でき次第、配列生成とgenKeyframesでアイコンの初期位置を決める。
    useEffect(() => {
        if (!mounted) return;
        setPositions(Array.from({ length: iconCount }, (_, i) => genKeyframes(i + 1)));
    }, [mounted]);

    // mountedとisRunningがtrueのときだけ実行。
    // アイコンランダムアニメーション：5秒ごとに、アイコンをランダムな位置に配置
    useEffect(() => {
        if (!mounted || !isRunning) return;
        const interval = setInterval(() => {
            setPositions(
                Array.from({ length: iconCount }, (_, i) =>
                    genKeyframes(i + Math.floor(Math.random() * 100 + 1))
                )
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [mounted, isRunning]);

    /*
    ちょっと難しいので分からなくなったらまた調べるが、
    前提として、サーバーが返すHTMLと、クライアントが最初に描画する内容が一致していないとエラーが起きる。
    
    そもそもNextではページはSSRされるが、"use client"のファイルは、空のプレースホルダーがhtmlに埋め込まれる仕様で
    クライアント側でReactが起動すると、そのプレースホルダーに「本物のコンポーネント」をハイドレーション（再描画）する仕組み。

    このコンポーネントでいうと、ランダムな位置にアイコンを配置しているが、この処理は
    クライアント側ではできるが、サーバ側ではdocumentが無いのでできない。
    →この差分で、SSRとCSRに差が出てHydration Errorが起きてる(たぶん)

    なので、mountedがtrueになるまで待って(つまり、SSR/CSRの最初の描画を合わせてから)、
    その後にランダム処理(use Effect)を実行させればエラー起きないよね。
    というのが、この処理の考え方。
    */

    // エラー対応：SSRとCSRの差で出るエラー抑止用
    if (!mounted) return null;

    return (
        <>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-1">
                    {Array.from({ length: iconCount }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="text-[6rem] text-brand opacity-20 mx-8"
                            animate={
                                isRunning && positions[i]
                                    ? { x: positions[i].x, y: positions[i].y }
                                    : { x: 0, y: 400 }
                            }
                            transition={{ type: "tween", duration: 10, ease: "easeInOut" }}
                        >
                            {iconElement} {/* ← propsで渡されたReactアイコンを描画 */}
                        </motion.div>
                    ))}
                </div>
            </div>

            <button onClick={() => setIsRunning(!isRunning)}>
                <motion.span
                    className="fixed bottom-20 right-8 z-50 px-6 py-3 rounded-full font-semibold tracking-wide text-white bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 cursor-pointer"
                    animate={isRunning ? { x: 0 } : { x: [0, -5, 5, -5, 0] }}
                    transition={
                        isRunning
                            ? { duration: 0 }
                            : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }
                >
                    {isRunning ? `${textIcon} を停止` : `${textIcon} を動かす`}
                </motion.span>
            </button>
        </>
    );
}