export function genKeyframes(seed) {
    const rand = (min, max) =>
        min + (Math.sin(seed++) * 0.5 + 0.5) * (max - min);

    const steps = 6;
    const x = [];
    const y = [];
    for (let i = 0; i < steps; i++) {
        x.push(rand(-400, 400)); // 横方向のランダム範囲
        y.push(rand(-400, 400)); // 縦方向のランダム範囲
    }
    // 最後に原点へ戻す
    x.push(0);
    y.push(0);
    return { x, y };
}