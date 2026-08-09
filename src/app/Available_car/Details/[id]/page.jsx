"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Users, Fuel, Gauge, Settings2, MapPin, X } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function Page() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    // Booking modal state
    const [showModal, setShowModal] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState(false);
    const [specialNote, setSpecialNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleBookNowClick = () => {
        if (!user) {
            router.push(`/Login?redirect=${pathname}`);
            return;
        }
        setShowModal(true);
    };

    const handleConfirmBooking = async () => {
        setSubmitting(true);

        const bookingData = {
            carId: car._id || id,
            carBrand: car.name,
            carImage: car.image,
            pricePerDay: car.pricePerDay,

            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,

            driverNeeded,
            specialNote,
        };

        try {
            const res = await fetch("http://localhost:5000/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });
            const data = await res.json();

            if (data.insertedId) {
                toast.success("Booking successful!");
                setShowModal(false);
                setDriverNeeded(false);
                setSpecialNote("");
                router.push("/private/My-bookings"); 
            } else {
                toast.error("Booking failed. Try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setCar(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!car) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 pt-28 pb-12 px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Car Brand */}
                <div className="px-8 py-6 border-b">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {car.name}
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        {car.year} Model
                    </p>
                </div>

                {/* Main Section */}
                <div className="grid lg:grid-cols-2 gap-8 p-8">

                    {/* Left Side Image */}
                    <div>
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-[500px] object-cover rounded-2xl shadow-md"
                        />

                        {/* Description */}
                        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
                            <h2 className="text-xl font-semibold mb-3">
                                Description
                            </h2>

                            <p className="text-gray-600 leading-8">
                                {car.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">

                        {/* Price */}
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                            <h2 className="text-4xl font-bold text-orange-500">
                                ${car.pricePerDay}
                                <span className="text-lg text-gray-500">
                                    /day
                                </span>
                            </h2>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Location</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={18} className="text-orange-500" />
                                    <span className="font-semibold">
                                        {car.location}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Seats</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Users size={18} className="text-orange-500" />
                                    <span className="font-semibold">
                                        {car.seats}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Fuel Type</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Fuel size={18} className="text-orange-500" />
                                    <span className="font-semibold">
                                        {car.fuelType}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Transmission</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Settings2 size={18} className="text-orange-500" />
                                    <span className="font-semibold">
                                        {car.transmission}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Mileage</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Gauge size={18} className="text-orange-500" />
                                    <span className="font-semibold">
                                        {car.mileage}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500">Rating</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                    <span className="font-semibold">
                                        {car.rating}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Book Button */}
                        <div className="px-6 pt-5 pb-6">
                            <button
                                onClick={handleBookNowClick}
                                className="btn w-full py-4 rounded-xl bg-gradient-to-r from-[#2F6FED] to-[#4FD1E8] text-white cd-display text-xl font-bold tracking-wide hover:brightness-105 transition duration-200 border-none shadow-[0_10px_25px_rgba(47,111,237,0.35)]"
                            >
                                Book Now
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                        >
                            <X size={20} />
                        </button>

                        <p className="text-xs tracking-widest uppercase text-orange-500 mb-1">
                            Confirm Booking
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-5">
                            {car.name}
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Driver Needed?
                            </label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={driverNeeded === true}
                                        onChange={() => setDriverNeeded(true)}
                                        className="checkbox"
                                    />
                                    <span className="text-sm text-gray-500">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={driverNeeded === false}
                                        onChange={() => setDriverNeeded(false)}
                                        className="checkbox"
                                    />
                                    <span className="text-sm text-gray-500">No</span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-900 mb-1">
                                Special Note
                            </label>
                            <textarea
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                                placeholder="Any special request..."
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={submitting}
                            className="btn w-full py-3 rounded-xl bg-gradient-to-r from-[#2F6FED] to-[#4FD1E8] text-white text-lg font-bold tracking-wide hover:brightness-105 transition duration-200 border-none disabled:opacity-60"
                        >
                            {submitting ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}