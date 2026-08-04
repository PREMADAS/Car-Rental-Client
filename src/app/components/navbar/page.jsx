"use client";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Cars", href: "/explore-cars" },
        { name: "Add Car", href: "/add-car" },
        { name: "My Bookings", href: "/my-bookings" },
    ];

    return (
        <nav className="absolute top-0 left-0 z-20 w-full">
            <div className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
                <h1 className="text-3xl font-extrabold text-white sm:text-3xl">
                    Rent<span className="text-emerald-400">Q</span>
                </h1>

                <div className="hidden items-center gap-8 lg:flex">
                    <ul className="flex gap-6 text-sm text-white lg:gap-8 lg:text-base">
                        {navLinks.map((link, i) => {
                            return (
                                <li key={i}>
                                    <a href={link.href} className={i === 0 ? "text-emerald-400" : "text-white hover:text-emerald-400"}>
                                        {link.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <a href="/Login" className="text-sm text-white hover:text-emerald-400 lg:text-base">
                        Login
                    </a>
                    <a href="/Register" className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500 lg:text-base">
                        Register
                    </a>
                </div>


                <button onClick={() => setMenuOpen(!menuOpen)} className="z-30 text-white lg:hidden" aria-label="Toggle menu">
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {
                menuOpen && (
                    <ul className="absolute top-full left-0 flex w-full flex-col gap-4 bg-black/90 px-6 py-6 text-white lg:hidden">
                        {navLinks.map((link, i) => {
                            return (
                                <li key={i}>

                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={i === 0 ? "block text-emerald-400" : "block text-white hover:text-emerald-400"}
                                    <a>
                                        {link.name}
                                    </a>
                                </li>

                            );
                        })}

                        <li className="mt-2 border-t border-white/20 pt-4">
                            <a href="/login" onClick={() => setMenuOpen(false)} className="block text-white hover:text-emerald-400">
                                Login
                            </a>
                        </li>

                        <li>

                            href="/register"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 block w-fit rounded-full bg-emerald-400 px-5 py-2 font-semibold text-white hover:bg-emerald-500"
                            <a >
                                Register
                            </a>
                        </li>
                    </ul>
                )
            }
        </nav >
    );
}