"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UserTestiMonials() {
    const [testiMonials, setTestiMonials] = useState([]);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                // public配下に置けば、「/」から始まるpathでアクセス可能
                const res = await fetch("/config_userTestimonials/_config.json");
                if (!res.ok) {
                    throw new Error(`HTTPエラー: ${res.status}`);
                }
                const data = await res.json();
                setTestiMonials(data);
            } catch (err) {
                console.error("JSON取得エラー:", err);
            }
        };

        fetchVoices();
    }, []);

    return (
        <section className="p-6">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {testiMonials.map((voice, index) => (
                        <ul key={index} className="bg-white rounded-lg hover:shadow-lg transition-shadow shadow-md p-4 text-center">
                            <li className="mb-4 text-gray-800">“{voice.comment}”</li>
                            <li className="font-bold">{voice.name}</li>
                            <li className="text-sm text-gray-500">{voice.job}</li>
                        </ul>
                    ))}
                </div>
            </motion.div>
        </section>

    );
}