import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F1F5FB] flex flex-col items-center justify-center px-4 text-center">

            <p className="text-[13px] tracking-[0.35em] uppercase text-[#2F6FED] mb-4 font-medium">
                Error 404
            </p>

            <h1 className="text-7xl font-bold text-[#0F2A43] mb-4">
                Oops!
            </h1>

            <p className="text-[#5B7290] text-lg max-w-md mb-8">
                We couldn&apos;t find the page you&apos;re looking for.
                It might have been moved or doesn&apos;t exist.
            </p>

            <Link
                href="/"
                className="btn px-8 py-4 rounded-xl bg-gradient-to-r from-[#2F6FED] to-[#4FD1E8] text-white text-lg font-bold border-none"
            >
                Back to Home
            </Link>

        </div>
    );
}