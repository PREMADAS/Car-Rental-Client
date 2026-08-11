"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);

    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        if (href.startsWith("/private") && !user) {
            e.preventDefault();
            toast.warning("Please login to access this page");
            router.push(`/Login?redirect=${href}`);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            setDropdownOpen(false);
            setMenuOpen(false);
            router.push("/");
        } catch (error) {
            toast.error(error.message || "Logout failed");
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Cars", href: "/Explore-car" },
        { name: "Add Car", href: "/private/Add-car" },
        { name: "My Bookings", href: "/private/My-bookings" },
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

                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold text-white sm:text-3xl">
                    Drive<span className="text-emerald-400">Fleet</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden items-center gap-8 lg:flex">
                    <ul className="flex gap-6 text-sm text-white lg:gap-8 lg:text-base">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={
                                        pathname === link.href
                                            ? "text-emerald-400 font-semibold"
                                            : "text-white hover:text-emerald-400"
                                    }
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Top Header Visible Links */}
                <ul className="flex items-center gap-5 text-sm text-white lg:hidden">
                    {mobileVisibleLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={(e) => {
                                    handleNavClick(e, link.href);
                                    setMenuOpen(false);
                                }}
                                className={
                                    pathname === link.href
                                        ? "text-emerald-400 font-semibold"
                                        : "text-white hover:text-emerald-400"
                                }
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop User Avatar / Auth Buttons */}
                <div className="hidden items-center gap-3 lg:flex">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex flex-col items-center gap-0.5 focus:outline-none"
                            >
                                <img
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt={user.displayName || user.name || "User"}
                                    className="h-9 w-9 rounded-full object-cover border-2 border-white/20"
                                />
                                <span className="text-white text-xs">Me</span>
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
                                        <Link
                                            href="/private/Add-car"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Add Car
                                        </Link>
                                        <Link
                                            href="/private/My-bookings"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            My Bookings
                                        </Link>
                                        <Link
                                            href="/private/My-added-car"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            My Added Cars
                                        </Link>
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/Login" className="text-sm text-white hover:text-emerald-400 lg:text-base">
                                Login
                            </Link>
                            <Link href="/Register" className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500 lg:text-base">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="z-30 text-white lg:hidden"
                    aria-label="Toggle menu"
                >
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

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <ul className="absolute top-full left-0 flex w-full flex-col gap-4 bg-slate-900/95 backdrop-blur-md px-6 py-6 text-white lg:hidden shadow-lg border-t border-slate-800">
                    {mobileHiddenLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={(e) => {
                                    handleNavClick(e, link.href);
                                    setMenuOpen(false);
                                }}
                                className={`block ${pathname === link.href
                                    ? "text-emerald-400 font-semibold"
                                    : "text-white hover:text-emerald-400"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {user ? (
                        <>
                            <hr className="border-slate-800 my-2" />
                            <li>
                                <Link
                                    href="/private/My-added-car"
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-white hover:text-emerald-400"
                                >
                                    My Added Cars
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-red-400 hover:text-red-300 font-medium pt-2"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2 border-t border-slate-800">
                            <Link
                                href="/Login"
                                onClick={() => setMenuOpen(false)}
                                className="block text-center text-white hover:text-emerald-400 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/Register"
                                onClick={() => setMenuOpen(false)}
                                className="block text-center rounded-full bg-emerald-400 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </ul>
            )}
        </nav>
    );
}