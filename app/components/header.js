"use client";
import PageList from "../config_allPageList/_config";
import Link from "next/link";

export default function Header() {

    const allpage = PageList();
    return (
        <header className="bg-brand-dark text-white p-4">
            <h1 className="text-xl mb-2 md:mb-0">Local Eats Memo</h1>
            <nav>
                <ul className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 p-2 rounded">
                    {
                        allpage.map((page) => {
                            return (
                                <li key={page} className="hover:underline bg-brand-dark rounded-md p-2 md:p-1 w-full md:w-auto">
                                    <Link href={`/${page}`} className="block w-full text-center md:w-auto">{page}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    );
}