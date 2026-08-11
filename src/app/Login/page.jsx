"use client";

import Link from "next/link";
import { Suspense, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, googleLogin } = useContext(AuthContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");

    const redirectPath = searchParams.get("redirect") || "/";

    const validateEmail = (email) => {
        if (!email.includes("@")) {
            return "Email must contain @";
        }
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
            return "Only Gmail addresses are allowed (e.g. yourname@gmail.com)";
        }
        return "";
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailError(validateEmail(value));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        // Client-side Validation Check
        const err = validateEmail(email);
        if (err) {
            setEmailError(err);
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email, password);
            toast.success("Login Successful");
            router.push(redirectPath);
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-sky-50 px-4">
            {/* Dark strip so navbar stays visible on top */}
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
                                onChange={handleEmailChange}
                                placeholder="you@gmail.com"
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${emailError
                                        ? "border-red-400 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-sky-500"
                                    }`}
                                required
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-500">{emailError}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !!emailError}
                            className="mt-2 rounded-lg bg-sky-600 py-2 font-semibold text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            locale="en"
                            onSuccess={async (credentialResponse) => {
                                try {
                                    await googleLogin(credentialResponse.credential);
                                    toast.success("Login Successful");
                                    router.push(redirectPath);
                                } catch (error) {
                                    toast.error(error.message || "Google login failed");
                                }
                            }}
                            onError={() => {
                                toast.error("Google login failed");
                            }}
                        />
                    </div>

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

const LoginPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-sky-50">
                    <span className="loading loading-spinner loading-lg text-sky-500"></span>
                </div>
            }
        >
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;