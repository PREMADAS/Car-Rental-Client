"use client";
import Link from 'next/link';

const RegisterPage = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const registerData = new FormData(e.currentTarget);
        const data = {};

        registerData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log(data);
    }
    return (
        <div className="relative min-h-screen bg-sky-50 px-4">
            {/* Dark strip so navbar (white text) stays visible on top */}
            <div className="absolute top-0 left-0 h-20 w-full bg-slate-900 sm:h-24" />

            {/* Register Card */}
            <div className="relative z-10 flex min-h-screen items-center justify-center pt-20 pb-10 sm:pt-24">
                <div className="w-full mt-10 max-w-md bg-white shadow-lg rounded-2xl p-8">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Register
                    </h1>

                    {/* Register Form */}
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="https://example.com/photo.jpg"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 transition-colors"
                        >
                            Register
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-sm">OR</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        className="w-full rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/Login" className="text-sky-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default RegisterPage;