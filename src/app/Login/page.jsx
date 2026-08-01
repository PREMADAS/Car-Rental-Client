import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>

                {/* Login Form */}
                <form className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <button type="submit" className="btn bg-orange-600 hover:bg-orange-700 text-white border-none mt-2">
                        Login
                    </button>
                </form>

                <div className="divider text-gray-400 text-sm">OR</div>

                <button className="btn btn-outline w-full">
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/Register" className="text-orange-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage;