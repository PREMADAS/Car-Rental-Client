"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Users, Fuel, Gauge, Settings2, MapPin } from "lucide-react";
import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";


export default function CarDetailsPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();


    const handleBookNow = (e) => {
        if (!user) {
            e.preventDefault();
            router.push(`/Login?redirect=${pathname}`);
        }


    };

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        fetch(`http://localhost:5000/explore/${id}`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Adjust this line if your backend wraps the car
                // e.g. data.car or data.data instead of data
                setCar(data);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load car details");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const fontStyles = (
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

            .cd-display { font-family: 'Space Grotesk', sans-serif; }
            .cd-mono { font-family: 'IBM Plex Mono', monospace; }
            .cd-body { font-family: 'Inter', sans-serif; }

            .cd-bg {
                background-color: #F1F5FB;
                background-image:
                    linear-gradient(rgba(47,111,237,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(47,111,237,0.05) 1px, transparent 1px);
                background-size: 34px 34px;
            }
            .cd-corner {
                position: absolute;
                width: 22px;
                height: 22px;
                border-color: #2F6FED;
            }
        `}</style>
    );

    if (loading) {
        return (
            <>
                {fontStyles}
                <div className="cd-body cd-bg flex flex-col justify-center items-center h-screen gap-4">
                    <span className="loading loading-spinner loading-lg text-[#2F6FED]"></span>
                    <p className="cd-mono text-xs tracking-[0.3em] uppercase text-[#5B7290]">
                        Loading vehicle record
                    </p>
                </div>
            </>
        );
    }

    if (error || !car) {
        return (
            <>
                {fontStyles}
                <div className="cd-body cd-bg flex flex-col justify-center items-center h-screen gap-3 px-4 text-center">
                    <p className="cd-mono text-xs tracking-[0.3em] uppercase text-[#E0522F]">
                        Record unavailable
                    </p>
                    <p className="text-[#0F2A43] font-semibold text-lg">
                        {error || "Car not found"}
                    </p>
                    <p className="text-[#5B7290] text-sm">
                        Check that your backend is running on http://localhost:5000
                    </p>
                </div>
            </>
        );
    }

    const specRows = [
        { label: "Location", value: car.location, Icon: MapPin },
        { label: "Seats", value: car.seats, Icon: Users },
        { label: "Fuel type", value: car.fuelType, Icon: Fuel },
        { label: "Transmission", value: car.transmission, Icon: Settings2 },
        { label: "Mileage", value: car.mileage, Icon: Gauge },
    ];

    return (
        <>
            {fontStyles}
            <div className="cd-body cd-bg min-h-screen pt-28 pb-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Header row */}
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-6 px-1">
                        <div>
                            <p className="cd-mono text-[11px] tracking-[0.35em] uppercase text-[#2F6FED] mb-2">
                                Vehicle Record · {car.year}
                            </p>
                            <h1 className="cd-display text-5xl md:text-6xl font-bold text-[#0F2A43] leading-none">
                                {car.brand}
                            </h1>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#2F6FED]/25 to-[#4FD1E8]/25 blur-lg"></div>
                            <div className="relative bg-white border border-[#D9E4F5] rounded-2xl px-6 py-3 text-right shadow-sm">
                                <p className="cd-mono text-[10px] tracking-[0.3em] uppercase text-[#5B7290]">
                                    Rate
                                </p>
                                <p className="cd-display text-3xl font-bold text-[#2F6FED] leading-tight">
                                    ${car.pricePerDay}
                                    <span className="cd-mono text-sm text-[#5B7290] font-normal">/Km</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Panel */}
                    <div className="bg-white/80 backdrop-blur border border-[#D9E4F5] rounded-2xl shadow-[0_8px_30px_rgba(15,42,67,0.06)] overflow-hidden">
                        <div className="grid lg:grid-cols-5 gap-0">

                            {/* Left: Image with blueprint-style corner marks */}
                            <div className="lg:col-span-3 relative p-5">
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src={car.imageUrl}
                                        alt={car.brand}
                                        className="w-full h-[300px] lg:h-[420px] object-cover"
                                    />
                                    <div className="absolute top-3 left-3 cd-mono text-[10px] tracking-[0.3em] uppercase bg-white/85 backdrop-blur px-3 py-1.5 rounded-full text-[#0F2A43] border border-[#D9E4F5]">
                                        {car.year} Model
                                    </div>
                                </div>

                                {/* corner brackets, engineering-drawing style */}
                                <div className="cd-corner top-2 left-2 border-t-2 border-l-2 rounded-tl-md"></div>
                                <div className="cd-corner top-2 right-2 border-t-2 border-r-2 rounded-tr-md"></div>
                                <div className="cd-corner bottom-2 left-2 border-b-2 border-l-2 rounded-bl-md"></div>
                                <div className="cd-corner bottom-2 right-2 border-b-2 border-r-2 rounded-br-md"></div>
                            </div>

                            {/* Right: Spec tiles */}
                            <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[#E5ECF7] flex flex-col">
                                <div className="px-6 pt-6 pb-3">
                                    <p className="cd-mono text-[10px] tracking-[0.3em] uppercase text-[#5B7290]">
                                        Specification
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 px-6 flex-1">
                                    {specRows.map(({ label, value, Icon }) => (
                                        <div
                                            key={label}
                                            className="bg-[#F6F9FE] border border-[#E5ECF7] rounded-xl p-4"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2F6FED] to-[#4FD1E8] flex items-center justify-center mb-3">
                                                <Icon size={15} className="text-white" strokeWidth={2.2} />
                                            </div>
                                            <p className="cd-mono text-[10px] tracking-[0.2em] uppercase text-[#5B7290] mb-1">
                                                {label}
                                            </p>
                                            <p className="cd-display text-lg font-semibold text-[#0F2A43]">
                                                {value}
                                            </p>
                                        </div>
                                    ))}

                                    <div className="bg-[#F6F9FE] border border-[#E5ECF7] rounded-xl p-4">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A623] to-[#F7C948] flex items-center justify-center mb-3">
                                            <span className="text-white text-sm leading-none">★</span>
                                        </div>
                                        <p className="cd-mono text-[10px] tracking-[0.2em] uppercase text-[#5B7290] mb-1">
                                            Rating
                                        </p>
                                        <p className="cd-display text-lg font-semibold text-[#0F2A43]">
                                            {car.rating} / 5
                                        </p>
                                    </div>
                                </div>

                                {/* Book Button */}
                                <div className="px-6 pt-5 pb-6">
                                    <Link href="/Book" onClick={handleBookNow}> <button className="btn w-full py-4 rounded-xl bg-gradient-to-r from-[#2F6FED] to-[#4FD1E8] text-white cd-display text-xl font-bold tracking-wide hover:brightness-105 transition duration-200 border-none shadow-[0_10px_25px_rgba(47,111,237,0.35)]">
                                        Book Now
                                    </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6 bg-white/80 backdrop-blur border border-[#D9E4F5] rounded-2xl px-6 py-6 shadow-[0_8px_30px_rgba(15,42,67,0.06)]">
                        <p className="cd-mono text-[10px] tracking-[0.3em] uppercase text-[#5B7290] mb-3">
                            Description
                        </p>
                        <p className="text-[#3C4E64] leading-8 cd-body">
                            {car.description}
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}