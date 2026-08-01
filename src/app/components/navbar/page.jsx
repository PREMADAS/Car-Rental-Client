"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const NavbarPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="navbar bg-gradient-to-r from-white to-orange-50 shadow-md sticky top-0 z-50 h-20 md:h-24 px-4 md:px-8">

            {/* Logo */}
            <div className="navbar-start flex-1">
                <div className="h-14 md:h-20 w-auto overflow-hidden flex items-center">
                    <Image
                        src="/images/logo.jpg"
                        alt="RentQ Logo"
                        width={200}
                        height={200}
                        className="h-full w-auto object-contain"
                    />
                </div>
            </div>

            {/* Menu items - only visible on laptop/desktop */}
            <div className="navbar-center hidden lg:flex flex-none">
                <ul className="menu menu-horizontal gap-6 font-semibold">
                    <Link href='/'><li className="text-orange-600 border-b-2 border-orange-600">Home</li></Link>
                    <li><a className="text-gray-700 hover:text-orange-600">Explore Cars</a></li>
                    <li><a className="text-gray-700 hover:text-orange-600">Add Car</a></li>
                    <li><a className="text-gray-700 hover:text-orange-600">My Bookings</a></li>
                </ul>
            </div>

            {/* Login / Register - only visible on laptop/desktop */}
            <div className="navbar-end flex-1 hidden lg:flex gap-3">
                <Link href="/Login" className="btn btn-outline border-orange-600 text-orange-600 hover:bg-orange-50">Login</Link>
                <Link href="/Register" className="btn bg-orange-600 hover:bg-orange-700 text-white border-none">Register</Link>
            </div>

            {/* Hamburger - mobile & tablet only */}
            <div className="navbar-end lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost">
                    ☰
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden flex flex-col p-4 gap-3 z-40">
                    <Link href='/' className="text-orange-600 font-semibold">Home</Link>
                    <a className="text-gray-700 font-semibold">Explore Cars</a>
                    <a className="text-gray-700 font-semibold">Add Car</a>
                    <a className="text-gray-700 font-semibold">My Bookings</a>
                    <Link href="/Login"> <a className="btn btn-outline border-orange-600 text-orange-600">Login</a></Link>
                    <Link href="/Register" className="btn bg-orange-600 text-white border-none">Register</Link>
                </div>
            )}

        </div>
    )
}

export default NavbarPage;