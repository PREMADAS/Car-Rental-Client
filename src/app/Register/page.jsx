"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";

const RegisterPage = () => {
    const router = useRouter();
    const { register } = useContext(AuthContext);
    const { login, googleLogin } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must have an uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must have a lowercase letter";
        }
        return "";
    };
    const validateEmail = (email) => {
        if (!email.includes("@")) {
            return "Email must contain @";
        }
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
            return "Only Gmail addresses are allowed (e.g. yourname@gmail.com)";
        }
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = {
            name: formData.get("name"),
            email: formData.get("email"),
            photoURL: formData.get("photoURL"),
            password: formData.get("password"),
        };

        const emailErr = validateEmail(userData.email);
        if (emailErr) {
            setEmailError(emailErr);
            return;
        }
        setEmailError("");


        const error = validatePassword(userData.password);
        if (error) {
            setPasswordError(error);
            return;
        }
        setPasswordError("");

        setIsSubmitting(true);
        try {
            await register(userData);

            toast.success("Login Successful");

            router.push("/Login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-sky-50 px-4">
            <div className="absolute top-0 left-0 h-20 w-full bg-slate-900 sm:h-24" />

            <div className="relative z-10 flex min-h-screen items-center justify-center pt-20 pb-10 sm:pt-24">
                <div className="w-full mt-10 max-w-md bg-white shadow-lg rounded-2xl p-8">

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Register
                    </h1>

                    <form onSubmit={onSubmit} className="flex flex-col gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setEmailError(validateEmail(e.target.value))}
                                placeholder="you@example.com"
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
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="https://example.com/photo.jpg"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    onChange={(e) => setPasswordError(validatePassword(e.target.value))}
                                    className={`w-full rounded-lg border px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${passwordError
                                        ? "border-red-400 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-sky-500"
                                        }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            {passwordError && (
                                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-sm">OR</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="flex justify-center">

                        <GoogleLogin

                            locale="en"
                            onSuccess={async (credentialResponse) => {
                                try {
                                    await googleLogin(credentialResponse.credential);
                                    toast.success("Login Successful");
                                    router.push("/");
                                } catch (error) {
                                    toast.error(error.message);
                                }
                            }}
                            onError={() => {
                                toast.error("Google login failed");
                            }}

                        />
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/Login"
                            className="text-sky-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;