"use client"

import Link from "next/link";
import { motion } from "framer-motion";

export default function MenuList({ menus }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {menus.map((menu, index) => (
                    <Link
                        key={index}
                        href={menu.link}
                        className="block bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                    >
                        <dl>
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
        </motion.div>
    );
}