export default function Footer() {
    return (
        <footer className="text-center py-4 border-t border-gray-200 mt-8">
            <p>© 2024 Data to report. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
                <a href="/policy" className="text-sm text-gray-600 hover:underline">
                    サイトポリシー
                </a>
                <a href="/contact" className="text-sm text-gray-600 hover:underline">
                    コンタクト情報
                </a>
            </div>
        </footer>
    );
}
