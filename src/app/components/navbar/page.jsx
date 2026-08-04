"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Cars", href: "/explore-cars" },
        { name: "Add Car", href: "/Add-car" },
        { name: "My Bookings", href: "/my-bookings" },
    ];

    const mobileVisibleLinks = navLinks.slice(0, 2);
    const mobileHiddenLinks = navLinks.slice(2);


    const navBackground = isHomePage
        ? scrolled
            ? "bg-slate-900 shadow-md"
            : "bg-transparent"
        : "bg-slate-900";

    return (
        <nav className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${navBackground}`}>
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-16">
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Rent<span className="text-emerald-400">Q</span>
                </h1>

                <div className="hidden items-center gap-8 lg:flex">
                    <ul className="flex gap-6 text-sm text-white lg:gap-8 lg:text-base">
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <a
                                    href={link.href}
                                    className={
                                        pathname === link.href
                                            ? "text-emerald-400"
                                            : "text-white hover:text-emerald-400"
                                    }
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="flex items-center gap-5 text-sm text-white lg:hidden">
                    {mobileVisibleLinks.map((link, i) => (
                        <li key={i}>
                            <a
                                href={link.href}
                                className={
                                    pathname === link.href
                                        ? "text-emerald-400"
                                        : "text-white hover:text-emerald-400"
                                }
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link href="/Login" className="text-sm text-white hover:text-emerald-400 lg:text-base">
                        Login
                    </Link>
                    <Link href="/Register" className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500 lg:text-base">
                        Register
                    </Link>
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className="z-30 text-white lg:hidden" aria-label="Toggle menu">
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 sm:h-7 sm:w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 sm:h-7 sm:w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {menuOpen && (
                <ul className="absolute top-full left-0 flex w-full flex-col gap-4 bg-black/90 px-4 py-6 text-white sm:px-6 lg:hidden">
                    {mobileHiddenLinks.map((link, i) => (
                        <li key={i}>
                            <a
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block ${pathname === link.href
                                        ? "text-emerald-400"
                                        : "text-white hover:text-emerald-400"
                                    }`}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}

                    <li className="mt-2 border-t border-white/20 pt-4">
                        <Link href="/Login" onClick={() => setMenuOpen(false)} className="block text-white hover:text-emerald-400">
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link href="/Register" onClick={() => setMenuOpen(false)} className="mt-2 block w-fit rounded-full bg-emerald-400 px-5 py-2 font-semibold text-white hover:bg-emerald-500">
                            Register
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}