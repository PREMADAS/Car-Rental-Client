"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push("/Login?redirect=/private/My-bookings");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`/api/bookings?email=${user.email}`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setBookings(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load bookings");
            })
            .finally(() => setLoading(false));
    }, [user, authLoading, router, retryCount]);

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#2F6FED]"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => setRetryCount((c) => c + 1)}
                    className="rounded-lg bg-[#2F6FED] text-white px-5 py-2 text-sm font-semibold hover:brightness-105"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <section className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0F2A43] mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <p className="text-[#5B7290]">You haven&apos;t booked any cars yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => {
                            const bookingDate = booking.createdAt
                                ? new Date(booking.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "N/A";

                            return (
                                <div
                                    key={booking._id}
                                    className="rounded-2xl border border-[#D9E4F5] bg-white p-4 shadow-md"
                                >
                                    <img
                                        src={booking.carImage || "/default-car.png"}
                                        alt={booking.carBrand || "Car"}
                                        className="w-full h-40 object-cover rounded-xl"
                                        onError={(e) => {
                                            e.currentTarget.src = "/default-car.png";
                                        }}
                                    />

                                    {/* Car Name */}
                                    <h3 className="mt-3 font-bold text-lg text-[#0F2A43]">
                                        {booking.carBrand || "Unknown Car"}
                                    </h3>

                                    {/* Total Price */}
                                    <p className="text-[#2F6FED] font-semibold">
                                        Total: ${booking.pricePerDay ?? "N/A"}
                                    </p>

                                    {/* Booking Date */}
                                    <p className="text-sm text-[#5B7290] mt-1">
                                        Booked on: {bookingDate}
                                    </p>

                                    {/* Other info */}
                                    <p className="text-sm text-[#5B7290] mt-1">
                                        Driver: {booking.driverNeeded ? "Yes" : "No"}
                                    </p>
                                    {booking.specialNote && (
                                        <p className="text-sm text-[#5B7290] mt-1">
                                            Note: {booking.specialNote}
                                        </p>
                                    )}

                                    <span
                                        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : booking.status === "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}