"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Users, Fuel, Gauge, Settings2, MapPin, X, Calendar } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function CarDetailsPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    
    const [showModal, setShowModal] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [specialNote, setSpecialNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    
    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return { days: 0, total: 0 };
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (days <= 0) return { days: 0, total: 0 };
        return { days, total: days * (car?.pricePerDay || 0) };
    };

    const { days, total } = calculateTotalPrice();

    const handleBookNowClick = () => {
        if (!user) {
            router.push(`/Login?redirect=${pathname}`);
            return;
        }
        setShowModal(true);
    };

    const handleConfirmBooking = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both Pick-up and Return dates");
            return;
        }
        if (days <= 0) {
            toast.error("Return date must be after Pick-up date");
            return;
        }

        setSubmitting(true);

        const bookingData = {
            carId: car?._id || id,
            carBrand: car?.brand || car?.name || "N/A",
            carImage: car?.imageUrl || car?.image,
            pricePerDay: car?.pricePerDay,
            totalDays: days,
            totalPrice: total,
            startDate,
            endDate,
            userEmail: user?.email,
            userName: user?.displayName || user?.name,
            userPhoto: user?.photoURL || user?.image,
            driverNeeded,
            specialNote,
            status: "Pending"
        };

        try {
            const res = await fetch(`/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(bookingData),
            });
            const data = await res.json();

            if (data.insertedId || data.acknowledged) {
                toast.success("Booking successful!");
                setShowModal(false);
                setDriverNeeded(false);
                setStartDate("");
                setEndDate("");
                setSpecialNote("");
                router.push("/private/My-bookings");
            } else {
                toast.error(data.message || "Booking failed. Try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong with the booking.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        // Standardized API path fallback check
        fetch(`/api/cars/${id}`)
            .then(async (res) => {
                if (!res.ok) throw new Error(`Server status: ${res.status}`);
                return res.json();
            })
            .then((data) => setCar(data))
            .catch((err) => {
                console.error(err);
                setError("Failed to load car details. Please verify your backend server.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-3 bg-slate-50">
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
                <p className="text-sm font-semibold text-gray-500">Fetching car record...</p>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-3 bg-slate-50 px-4 text-center">
                <p className="text-red-500 font-bold text-lg">{error || "Car not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const carName = car.name || car.brand || `${car.brand || ''} ${car.model || ''}`.trim();
    const carImage = car.image || car.imageUrl;

    return (
        <div className="min-h-screen bg-slate-100 pt-28 pb-12 px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{carName}</h1>
                        <p className="text-gray-500 mt-1 text-sm">{car.year || "N/A"} Model</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 px-5 py-2.5 rounded-2xl">
                        <span className="text-2xl font-bold text-orange-500">${car.pricePerDay}</span>
                        <span className="text-xs text-gray-500 font-medium"> / day</span>
                    </div>
                </div>

                {/* Content Body */}
                <div className="grid lg:grid-cols-2 gap-8 p-8">

                    {/* Image & Description */}
                    <div className="space-y-6">
                        <img
                            src={carImage}
                            alt={carName}
                            className="w-full h-[400px] object-cover rounded-2xl shadow-md bg-gray-100"
                        />
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {car.description || "No detailed description available."}
                            </p>
                        </div>
                    </div>

                    {/* Vehicle Specifications Grid */}
                    <div className="space-y-6 flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={18} className="text-orange-500" />
                                    <span className="font-semibold text-sm text-gray-800">{car.location || "N/A"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Seats</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Users size={18} className="text-orange-500" />
                                    <span className="font-semibold text-sm text-gray-800">{car.seats || "N/A"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Fuel Type</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Fuel size={18} className="text-orange-500" />
                                    <span className="font-semibold text-sm text-gray-800">{car.fuelType || "N/A"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Transmission</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Settings2 size={18} className="text-orange-500" />
                                    <span className="font-semibold text-sm text-gray-800">{car.transmission || "N/A"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Mileage</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Gauge size={18} className="text-orange-500" />
                                    <span className="font-semibold text-sm text-gray-800">{car.mileage || "N/A"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Rating</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-yellow-500 text-xs">★</span>
                                    <span className="font-semibold text-sm text-gray-800">{car.rating || "5.0"} / 5</span>
                                </div>
                            </div>

                        </div>

                        <button
                            onClick={handleBookNowClick}
                            className="w-full py-4 rounded-xl bg-orange-500 text-white text-lg font-bold hover:bg-orange-600 transition duration-200 shadow-lg shadow-orange-500/20"
                        >
                            Book Now
                        </button>
                    </div>

                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>

                        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
                            Confirm Rental
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{carName}</h2>

                        {/* Date Pickers */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Pick-up Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate || new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Rental Summary */}
                        {days > 0 && (
                            <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-100 flex justify-between items-center text-xs">
                                <span className="text-gray-600 font-medium">Duration: {days} Days</span>
                                <span className="font-bold text-orange-600 text-sm">Total: ${total}</span>
                            </div>
                        )}

                        {/* Driver Choice Radio Group */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                                Need a Professional Driver?
                            </label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-600">
                                    <input
                                        type="radio"
                                        name="driverChoice"
                                        checked={driverNeeded === true}
                                        onChange={() => setDriverNeeded(true)}
                                        className="radio radio-xs radio-warning"
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-600">
                                    <input
                                        type="radio"
                                        name="driverChoice"
                                        checked={driverNeeded === false}
                                        onChange={() => setDriverNeeded(false)}
                                        className="radio radio-xs radio-warning"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Special Note Input */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Special Requests
                            </label>
                            <textarea
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                                placeholder="Any additional requirements..."
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={submitting}
                            className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition duration-200 border-none disabled:opacity-50"
                        >
                            {submitting ? "Processing..." : "Confirm & Book"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}