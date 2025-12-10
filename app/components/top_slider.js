const mvImages = [
    "/images/mv_01.jpg",
    "/images/mv_02.jpg",
    "/images/mv_03.jpg",
    "/images/mv_04.jpg",
];

export default function HeroMarquee() {
    return (
        <div className="w-screen h-90 overflow-hidden relative">
            <div className="flex animate-marquee min-w-max">
                {mvImages.concat(mvImages).map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`MV ${i + 1}`}
                        className="h-full max-h-90 w-auto object-contain flex-shrink-0"
                    />
                ))}
            </div>
        </div>
    );
}