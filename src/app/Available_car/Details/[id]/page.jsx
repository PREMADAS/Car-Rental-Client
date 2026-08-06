"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Users, Fuel, Gauge, Settings2, MapPin } from "lucide-react";

export default function Page() {
    const { id } = useParams();
    const [car, setCar] = useState(null);

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
                        <button className="btn w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xl font-bold hover:scale-[1.02] transition duration-300">
                            Book Now
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}