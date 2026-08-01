import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mt-7">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Register
                </h1>

                {/* Register Form */}
                <form className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <button type="submit" className="btn bg-orange-600 hover:bg-orange-700 text-white border-none mt-2">
                        Register
                    </button>
                </form>

                <div className="divider text-gray-400 text-sm">OR</div>

                <button className="btn btn-outline w-full">
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link href="/Login" className="text-orange-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterPage;