"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { genKeyframes } from "../animation/animation_BackGroundIcon";
import { SiFoodpanda } from "react-icons/si";

export default function BackGroundIcons() {
    const iconCount = 10;
    const [mounted, setMounted] = useState(false);
    const [positions, setPositions] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        setPositions(Array.from({ length: iconCount }, (_, i) => genKeyframes(i + 1)));
    }, [mounted]);

    useEffect(() => {
        if (!mounted || !isRunning) return;
        const interval = setInterval(() => {
            setPositions(
                Array.from({ length: iconCount }, (_, i) => genKeyframes(i + Math.floor(Math.random() * 100 + 1)))
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [mounted, isRunning]);

    if (!mounted) return null; // SSR/CSR差をなくす

    return (
        <>
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
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
                            <SiFoodpanda />
                        </motion.div>
                    ))}
                </div>
            </div>

            <button onClick={() => setIsRunning(!isRunning)}>
                <motion.span
                    className="fixed bottom-20 right-4 z-50 px-6 py-3 rounded-full font-semibold tracking-wide text-white bg-gradient-to-r from-brand-dark via-brand-dark to-brand-light shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 cursor-pointer"
                    animate={isRunning ? { x: 0 } : { x: [0, -5, 5, -5, 0] }}
                    transition={isRunning ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {isRunning ? "停止" : "🐼 パンダ"}
                </motion.span>
            </button>
        </>
    );
}