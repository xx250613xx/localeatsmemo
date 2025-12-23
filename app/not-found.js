export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                お探しのページは見つかりませんでした。
            </p>

            <a
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                トップページへ戻る
            </a>
        </main>
    );
}
