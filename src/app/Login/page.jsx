"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const LoginPage = () => {
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            await login(email, password);

            alert("Login Successful");
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="relative min-h-screen bg-sky-50 px-4">
            {/* Dark strip so navbar (white text) stays visible on top */}
            <div className="absolute top-0 left-0 h-20 w-full bg-slate-900 sm:h-24" />

            {/* Login Card */}
            <div className="relative z-10 flex min-h-screen items-center justify-center pt-20 pb-10 sm:pt-24">
                <div className="w-full mt-10 max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                        Login
                    </h1>

                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 rounded-lg bg-sky-600 py-2 font-semibold text-white transition-colors hover:bg-sky-700"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        <FcGoogle size={20} />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/Register"
                            className="font-semibold text-sky-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;