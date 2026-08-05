import Image from "next/image";
import Navbar from "../components/navbar/page";
import Link from "next/link";


export default function Hero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/bg_1.jpg" // tomar image path diyo
                alt="Rent a car"
                fill
                priority
                className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Navbar - image-er upore boshbe */}
            <Navbar />

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6 md:pt-28">
                <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl mt-3">
                    Fast & Easy Way To Rent A Car
                </h1>

                <p className="mt-5 max-w-xl text-sm text-gray-200 sm:max-w-2xl sm:text-base md:text-lg">
                    A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts
                </p>

                {/* Play button + text */}
                <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
                    <Link href="/Explore-car"> <button className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 sm:px-8 sm:py-3 sm:text-base">
                        Explore Cars
                    </button>
                    </Link>


                </div>



            </div>
        </div>
    );
}