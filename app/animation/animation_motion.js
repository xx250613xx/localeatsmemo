import { motion } from "framer-motion";
import { useState } from "react";

export default function Animate_motion({ children }) {
    const [animateLine, setAnimateLine] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }} // 毎回スクロールで発火
            onViewportEnter={() => { // 要素がウィンドウに入ったときに呼ばれるイベント
                setAnimateLine(false);
                setTimeout(() => setAnimateLine(true), 50);
            }}
        >
            {/* 
            通常のJSX:そのまま描画
            関数(コンポネに切り出してる要素のJSX)：animateLineをpropsで渡す
            */}
            {typeof children === "function"
                ? children({ animateLine })
                : children}
        </motion.div>
    );
}