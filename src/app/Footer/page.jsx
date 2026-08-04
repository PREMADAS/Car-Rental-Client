"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const FooterPage = () => {
    return (
        <footer className="bg-slate-900 text-blue-100">
            <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left">

                    {/* Company Info */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h2 className="text-2xl font-extrabold text-white">
                            Rent<span className="text-orange-400">Q</span>
                        </h2>
                        <p className="mt-4 text-sm text-blue-200 leading-relaxed max-w-xs sm:max-w-none">
                            RentQ makes car rental simple, affordable, and reliable. Find your
                            perfect ride wherever you go.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="hover:text-white transition-colors">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Available Cars</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li className="flex items-center justify-center sm:justify-start gap-2">
                                <MapPin size={16} className="shrink-0" />
                                Chattogram, Bangladesh
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-2">
                                <Phone size={16} className="shrink-0" />
                                +880 1234-567890
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-2">
                                <Mail size={16} className="shrink-0" />
                                support@rentq.com
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-9 pt-2 border-t border-blue-800 text-center text-sm text-blue-300">
                    © {new Date().getFullYear()} RentQ. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterPage;